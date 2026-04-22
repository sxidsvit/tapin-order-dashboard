/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { OrderDashboard } from './components/OrderDashboard';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60, // 1 minute
    },
  },
});

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <OrderDashboard />
    </QueryClientProvider>
  );
}

