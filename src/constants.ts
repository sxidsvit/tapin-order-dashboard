import { OrderStatus } from './types';

export const ORDER_WORKFLOW: Partial<Record<OrderStatus, OrderStatus>> = {
  pending: 'preparing',
  preparing: 'ready',
  ready: 'completed',
};

export const STATUS_COLORS: Record<OrderStatus, string> = {
  pending: 'bg-amber-100/40 text-amber-950 border-amber-200/50',
  preparing: 'bg-blue-100/40 text-blue-950 border-blue-200/50',
  ready: 'bg-emerald-100/40 text-emerald-950 border-emerald-200/50',
  completed: 'bg-zinc-100 text-zinc-500 border-zinc-200',
  cancelled: 'bg-orange-100/40 text-orange-950 border-orange-200/50',
};

export const FILTERS: { label: string; value: OrderStatus | 'all' }[] = [
  { label: 'All Orders', value: 'all' },
  { label: 'Pending', value: 'pending' },
  { label: 'Preparing', value: 'preparing' },
  { label: 'Ready', value: 'ready' },
  { label: 'Completed', value: 'completed' },
  { label: 'Cancelled', value: 'cancelled' },
];
