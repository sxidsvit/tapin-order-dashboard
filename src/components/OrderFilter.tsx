import { cn } from '../lib/utils';
import { OrderStatus } from '../types';
import { FILTERS } from '../constants';

interface OrderFilterProps {
  currentStatus: OrderStatus | 'all';
  onStatusChange: (status: OrderStatus | 'all') => void;
  stats: Record<string, number>;
}

export function OrderFilter({ currentStatus, onStatusChange, stats }: OrderFilterProps) {
  return (
    <div className="flex flex-wrap gap-4 mb-10 overflow-x-auto pb-4 scrollbar-hide">
      {FILTERS.map((filter) => (
        <button
          key={filter.value}
          id={`filter-${filter.value}`}
          onClick={() => onStatusChange(filter.value)}
          aria-pressed={currentStatus === filter.value}
          className={cn(
            "px-6 py-4 rounded-xl text-[12px] font-bold uppercase tracking-widest transition-all cursor-pointer border-2 min-w-[120px] flex items-center justify-between gap-3 focus-ring",
            currentStatus === filter.value
              ? "bg-ink text-white border-ink shadow-[6px_6px_0_rgba(20,20,20,0.15)] -translate-y-0.5"
              : "bg-white text-ink/70 border-line hover:border-ink/20 hover:text-ink/80"
          )}
        >
          <span>{filter.label}</span>
          <span className={cn(
            "px-2 py-0.5 rounded text-[10px] font-mono",
            currentStatus === filter.value ? "bg-white/20 text-white" : "bg-ink/10 text-ink/80"
          )}>
            {(stats[filter.value] || 0).toString().padStart(2, '0')}
          </span>
        </button>
      ))}
    </div>
  );
}
