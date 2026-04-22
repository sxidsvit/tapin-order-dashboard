import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { useOrders } from '../useOrders';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { mockApi } from '../../api/mockApi';
import React from 'react';

// OPTION B: Testing
// Mocks for requirements
vi.mock('../../api/mockApi', () => ({
  mockApi: {
    fetchOrders: vi.fn(),
    updateOrderStatus: vi.fn(),
  },
}));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { retry: false },
  },
});

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

describe('useOrders Hook', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    queryClient.clear();
  });

  it('performs optimistic update on successful mutation', async () => {
    const initialOrders = [{ id: '1', status: 'pending', guestName: 'Test', items: [], total: 0, createdAt: '', updatedAt: '' }];
    (mockApi.fetchOrders as any).mockResolvedValue(initialOrders);
    (mockApi.updateOrderStatus as any).mockResolvedValue({ id: '1', status: 'preparing' });

    const { result } = renderHook(() => useOrders('all'), { wrapper });

    // Wait for initial fetch
    await waitFor(() => expect(result.current.orders).toHaveLength(1));

    // Trigger update
    result.current.updateStatus({ orderId: '1', newStatus: 'preparing' });

    // Check optimistic state
    expect(result.current.orders[0].status).toBe('preparing');
    
    // Verify API called
    expect(mockApi.updateOrderStatus).toHaveBeenCalledWith('1', 'preparing');
  });

  it('rolls back state on mutation error', async () => {
    const initialOrders = [{ id: '1', status: 'pending', guestName: 'Test', items: [], total: 0, createdAt: '', updatedAt: '' }];
    (mockApi.fetchOrders as any).mockResolvedValue(initialOrders);
    (mockApi.updateOrderStatus as any).mockRejectedValue(new Error('API Malfunction'));

    const { result } = renderHook(() => useOrders('all'), { wrapper });

    await waitFor(() => expect(result.current.orders).toHaveLength(1));

    // Trigger update
    result.current.updateStatus({ orderId: '1', newStatus: 'preparing' });

    // Check optimistic state (should be 'preparing' temporarily)
    expect(result.current.orders[0].status).toBe('preparing');

    // Wait for rollback after error
    await waitFor(() => expect(result.current.orders[0].status).toBe('pending'));
  });
});
