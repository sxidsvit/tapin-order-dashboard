import { formatDistanceToNow } from 'date-fns';
import { CheckCircle2, ChevronRight, Clock, Coffee, Trash2, XCircle } from 'lucide-react';
import { motion } from 'motion/react';
import { cn, formatCurrency } from '../lib/utils';
import { Order, OrderStatus } from '../types';

interface OrderCardProps {
  order: Order;
  onUpdateStatus: (orderId: string, newStatus: OrderStatus) => void;
  isUpdating?: boolean;
}

const statusColors: Record<OrderStatus, string> = {
  pending: 'bg-amber-100 text-amber-800 border-amber-200',
  preparing: 'bg-blue-100 text-blue-800 border-blue-200',
  ready: 'bg-green-100 text-green-800 border-green-200',
  completed: 'bg-slate-100 text-slate-600 border-slate-200',
  cancelled: 'bg-red-100 text-red-800 border-red-200',
};

const nextStatus: Partial<Record<OrderStatus, OrderStatus>> = {
  pending: 'preparing',
  preparing: 'ready',
  ready: 'completed',
};

export function OrderCard({ order, onUpdateStatus, isUpdating }: OrderCardProps) {
  const next = nextStatus[order.status];

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      whileHover={{ y: -2 }}
      id={`order-card-${order.id}`}
      className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all h-full flex flex-col"
    >
      <div className="p-4 flex flex-col h-full gap-3">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-semibold text-slate-900 text-lg">{order.guestName}</h3>
            <p className="text-xs text-slate-500 font-mono">#{order.id.split('-')[1]}</p>
          </div>
          <span className={cn(
            "px-2.5 py-0.5 rounded-full text-xs font-medium border capitalize",
            statusColors[order.status]
          )}>
            {order.status}
          </span>
        </div>

        <div className="space-y-1.5 flex-1">
          {order.items.map((item) => (
            <div key={item.id} className="flex justify-between text-sm">
              <span className="text-slate-600">
                <span className="font-medium text-slate-900">{item.quantity}x</span> {item.name}
              </span>
              <span className="text-slate-400 font-mono text-xs">{formatCurrency(item.price)}</span>
            </div>
          ))}
        </div>

        <div className="pt-3 border-t border-slate-100 mt-auto">
          <div className="flex justify-between items-center mb-3">
            <div className="flex items-center text-xs text-slate-400 gap-1">
              <Clock className="w-3 h-3" />
              {formatDistanceToNow(new Date(order.createdAt), { addSuffix: true })}
            </div>
            <div className="font-bold text-slate-900">
              {formatCurrency(order.total)}
            </div>
          </div>

          <div className="flex gap-2">
            {next && (
              <button
                id={`advance-status-${order.id}`}
                onClick={() => onUpdateStatus(order.id, next)}
                disabled={isUpdating}
                className="flex-1 bg-slate-900 text-white rounded-lg py-2 text-sm font-medium flex items-center justify-center gap-1 hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer transition-colors"
              >
                {order.status === 'pending' && <Coffee className="w-4 h-4" />}
                {order.status === 'preparing' && <CheckCircle2 className="w-4 h-4" />}
                {order.status === 'ready' && <ChevronRight className="w-4 h-4" />}
                Advance to {next}
              </button>
            )}
            
            {order.status !== 'completed' && order.status !== 'cancelled' && (
              <button
                id={`cancel-order-${order.id}`}
                onClick={() => onUpdateStatus(order.id, 'cancelled')}
                disabled={isUpdating}
                title="Cancel Order"
                className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
              >
                <XCircle className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
