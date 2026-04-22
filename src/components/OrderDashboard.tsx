import { useState } from 'react';
import { useOrders } from '../hooks/useOrders';
import { OrderStatus } from '../types';
import { OrderFilter } from './OrderFilter';
import { VirtualOrderList } from './VirtualOrderList';
import { LayoutDashboard, Loader2, RefreshCw } from 'lucide-react';

export function OrderDashboard() {
  const [filter, setFilter] = useState<OrderStatus | 'all'>('all');
  const { orders, isLoading, stats, updateStatus, isUpdating } = useOrders(filter);

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <LayoutDashboard className="w-6 h-6 text-slate-900" />
              <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Tapin Kitchen</h1>
            </div>
            <p className="text-slate-500 font-medium">Real-time order management dashboard</p>
          </div>

          <div className="flex items-center gap-3 bg-white p-1 rounded-xl border border-slate-200">
            <div className="px-4 py-2 bg-slate-50 rounded-lg border border-slate-100 flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-xs font-semibold text-slate-600 uppercase tracking-wider">Live</span>
            </div>
            {isUpdating && (
              <div className="flex items-center gap-2 px-3 py-1 text-slate-400 text-xs font-medium animate-pulse">
                <RefreshCw className="w-3 h-3 animate-spin" />
                Syncing...
              </div>
            )}
          </div>
        </header>

        <OrderFilter 
          currentStatus={filter} 
          onStatusChange={setFilter} 
          stats={stats} 
        />

        {isLoading ? (
          <div className="flex flex-col items-center justify-center h-96 gap-4">
            <Loader2 className="w-10 h-10 text-slate-300 animate-spin" />
            <p className="text-slate-400 font-medium italic">Warming up the stove...</p>
          </div>
        ) : orders.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-96 bg-white border-2 border-dashed border-slate-200 rounded-2xl p-8">
            <p className="text-slate-400 font-medium text-center">No orders found for this status.</p>
          </div>
        ) : (
          <VirtualOrderList 
            orders={orders} 
            onUpdateStatus={(id, status) => updateStatus({ orderId: id, newStatus: status })}
            isUpdating={false} // mutation handling is via optimistic state in hook
          />
        )}
      </div>
    </div>
  );
}
