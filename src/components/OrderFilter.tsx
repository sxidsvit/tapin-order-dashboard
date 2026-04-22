import { cn } from '../lib/utils';
import { OrderStatus } from '../types';

interface OrderFilterProps {
  currentStatus: OrderStatus | 'all';
  onStatusChange: (status: OrderStatus | 'all') => void;
  stats: Record<string, number>;
}

const filters: { label: string; value: OrderStatus | 'all' }[] = [
  { label: 'All Orders', value: 'all' },
  { label: 'Pending', value: 'pending' },
  { label: 'Preparing', value: 'preparing' },
  { label: 'Ready', value: 'ready' },
  { label: 'Completed', value: 'completed' },
  { label: 'Cancelled', value: 'cancelled' },
];

export function OrderFilter({ currentStatus, onStatusChange, stats }: OrderFilterProps) {
  return (
    <div className="flex flex-wrap gap-2 mb-8 overflow-x-auto pb-2 sm:pb-0">
      {filters.map((filter) => (
        <button
          key={filter.value}
          id={`filter-${filter.value}`}
          onClick={() => onStatusChange(filter.value)}
          className={cn(
            "px-4 py-2 rounded-full text-sm font-medium transition-all cursor-pointer whitespace-nowrap border",
            currentStatus === filter.value
              ? "bg-slate-900 text-white border-slate-900 shadow-sm"
              : "bg-white text-slate-600 border-slate-200 hover:border-slate-300 hover:bg-slate-50"
          )}
        >
          {filter.label}
          {stats[filter.value] !== undefined && stats[filter.value] > 0 && (
            <span className={cn(
              "ml-2 text-xs opacity-70",
              currentStatus === filter.value ? "text-white" : "text-slate-400"
            )}>
              {stats[filter.value]}
            </span>
          )}
        </button>
      ))}
    </div>
  );
}
