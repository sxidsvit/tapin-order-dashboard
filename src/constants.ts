import { OrderStatus } from './types';

export const ORDER_WORKFLOW: Partial<Record<OrderStatus, OrderStatus>> = {
  pending: 'preparing',
  preparing: 'ready',
  ready: 'completed',
};

export const STATUS_COLORS: Record<OrderStatus, string> = {
  pending: 'bg-amber-100 text-amber-800 border-amber-200',
  preparing: 'bg-blue-100 text-blue-800 border-blue-200',
  ready: 'bg-green-100 text-green-800 border-green-200',
  completed: 'bg-slate-100 text-slate-600 border-slate-200',
  cancelled: 'bg-red-100 text-red-800 border-red-200',
};

export const FILTERS: { label: string; value: OrderStatus | 'all' }[] = [
  { label: 'All Orders', value: 'all' },
  { label: 'Pending', value: 'pending' },
  { label: 'Preparing', value: 'preparing' },
  { label: 'Ready', value: 'ready' },
  { label: 'Completed', value: 'completed' },
  { label: 'Cancelled', value: 'cancelled' },
];
