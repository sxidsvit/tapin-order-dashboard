import { useState } from 'react';
import { useOrders } from '../hooks/useOrders';
import { OrderStatus } from '../types';
import { OrderFilter } from './OrderFilter';
import { VirtualOrderList } from './VirtualOrderList';
import { LayoutDashboard, Loader2, RefreshCw } from 'lucide-react';
import { cn } from '../lib/utils';

export function OrderDashboard() {
  const [filter, setFilter] = useState<OrderStatus | 'all'>('all');
  const { orders, isLoading, stats, updateStatus, isUpdating } = useOrders(filter);

  return (
    <div className="min-h-screen p-4 md:p-12">
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-ink focus:text-white focus:rounded-lg"
      >
        Skip to main content
      </a>
      <div className="max-w-7xl mx-auto">
        <header className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12">
          {/* header content */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="bg-ink p-2 rounded-xl">
                <LayoutDashboard className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-5xl font-bold italic leading-none tracking-tighter">KITCHEN DASH</h1>
            </div>
            <div className="flex items-center gap-4 text-ink/70 font-mono text-[11px] font-bold tracking-widest">
              <span className="flex items-center gap-1.5 border border-line px-2.5 py-1 rounded-lg bg-white">
                <RefreshCw className={cn("w-3 h-3", isUpdating && "animate-spin")} />
                {isUpdating ? "SYNC_ACTIVE" : "SYS_READY"}
              </span>
              <span className="opacity-20">/</span>
              <span>QUEUE_EST: 12M</span>
              <span className="opacity-20">/</span>
              <span>STAFF: 04</span>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-white px-4 py-3 rounded-2xl border-2 border-line shadow-[4px_4px_0_rgba(20,20,20,0.05)]">
            <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse shadow-[0_0_12px_rgba(34,197,94,0.8)]" />
            <span className="text-xs font-bold uppercase tracking-widest text-ink/80">Active Service Mode</span>
          </div>
        </header>

        <main id="main-content">
          <div className="sr-only" aria-live="polite">
            {filter === 'all' ? 'Showing all orders' : `Showing ${filter} orders`}. {orders.length} items found.
          </div>
          <OrderFilter 
            currentStatus={filter} 
            onStatusChange={setFilter} 
            stats={stats} 
          />

          {isLoading ? (
            <div className="flex flex-col items-center justify-center h-[50vh] gap-4">
              <Loader2 className="w-8 h-8 text-ink/50 animate-spin" />
              <p className="mono-data">Acquiring manifests...</p>
            </div>
          ) : orders.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-[50vh] kitchen-card border-dashed">
              <p className="text-ink/70 font-medium italic">KITCHEN_STANDBY: ALL_ORDERS_PROCESSED</p>
            </div>
          ) : (
            <VirtualOrderList 
              orders={orders} 
              onUpdateStatus={(id, status) => updateStatus({ orderId: id, newStatus: status })}
              isUpdating={false}
            />
          )}
        </main>
      </div>
    </div>
  );
}
