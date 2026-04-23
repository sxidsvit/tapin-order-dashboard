import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { mockApi } from '../api/mockApi';
import { Order, OrderStatus } from '../types';
import { logger } from '../lib/logger';

export function useOrders(filterStatus: OrderStatus | 'all') {
  const queryClient = useQueryClient();
  const [realtimeOrders, setRealtimeOrders] = useState<Order[] | null>(null);

  const { data: orders = [], isLoading, error } = useQuery({
    queryKey: ['orders'],
    queryFn: mockApi.fetchOrders,
  });

  // OPTION A: SSE/WebSocket Strategy Sketch
  // In a real app, this would use a library like socket.io-client or native WebSocket
  useEffect(() => {
    logger.info('🔌 Connecting to Order Real-time Feed...');
    
    // Simulating incoming events
    const simulateEvent = () => {
      // Logic for merging server events with local state
      // This is just a conceptual implementation as requested by Option A
    };

    return () => {
      logger.info('🔌 Disconnecting from Order Real-time Feed');
    };
  }, [queryClient]);

  const updateStatusMutation = useMutation({
    mutationFn: ({ orderId, newStatus }: { orderId: string; newStatus: OrderStatus }) =>
      mockApi.updateOrderStatus(orderId, newStatus),
    
    // Optimistic Update logic
    onMutate: async ({ orderId, newStatus }) => {
      // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
      await queryClient.cancelQueries({ queryKey: ['orders'] });

      // Snapshot the previous value
      const previousOrders = queryClient.getQueryData<Order[]>(['orders']);

      // Optimistically update to the new value
      queryClient.setQueryData<Order[]>(['orders'], (old) => {
        if (!old) return [];
        return old.map((order) =>
          order.id === orderId
            ? { ...order, status: newStatus, updatedAt: new Date().toISOString() }
            : order
        );
      });

      // Return a context object with the snapshotted value
      return { previousOrders };
    },

    // If the mutation fails, use the context returned from onMutate to roll back
    onError: (err, variables, context) => {
      if (context?.previousOrders) {
        queryClient.setQueryData(['orders'], context.previousOrders);
      }
      logger.error('Mutation failed, rolled back', err);
    },

    // Always refetch after error or success to keep server and client in sync
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
    },
  });

  const filteredOrders = orders.filter((o) => 
    filterStatus === 'all' ? true : o.status === filterStatus
  );

  const stats = {
    total: orders.length,
    pending: orders.filter(o => o.status === 'pending').length,
    preparing: orders.filter(o => o.status === 'preparing').length,
    ready: orders.filter(o => o.status === 'ready').length,
  };

  return {
    orders: filteredOrders,
    isLoading,
    error,
    stats,
    updateStatus: updateStatusMutation.mutate,
    isUpdating: updateStatusMutation.isPending,
  };
}
