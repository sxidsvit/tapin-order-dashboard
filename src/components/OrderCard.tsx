import { formatDistanceToNow } from 'date-fns';
import { CheckCircle2, ChevronRight, Clock, Coffee, Trash2, XCircle } from 'lucide-react';
import { motion } from 'motion/react';
import { cn, formatCurrency } from '../lib/utils';
import { Order, OrderStatus } from '../types';
import { ORDER_WORKFLOW, STATUS_COLORS } from '../constants';

interface OrderCardProps {
  order: Order;
  onUpdateStatus: (orderId: string, newStatus: OrderStatus) => void;
  isUpdating?: boolean;
  key?: string;
}

const item = {
  hidden: { opacity: 0, y: 15 },
  show: { opacity: 1, y: 0 }
};

const ACTION_LABELS: Partial<Record<OrderStatus, string>> = {
  pending: 'Start Preparing',
  preparing: 'Mark as Ready',
  ready: 'Complete Order',
};

export function OrderCard({ order, onUpdateStatus, isUpdating }: OrderCardProps) {
  const next = ORDER_WORKFLOW[order.status];
  const actionLabel = next ? ACTION_LABELS[order.status] : null;

  return (
    <motion.div
      layout
      variants={item}
      exit={{ opacity: 0, scale: 0.95 }}
      whileHover={{ y: -4 }}
      id={`order-card-${order.id}`}
      className="kitchen-card overflow-hidden h-full flex flex-col"
    >
      <div className="px-6 py-5 flex flex-col h-full gap-5">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-bold text-ink text-xl leading-snug mb-1">{order.guestName}</h3>
            <p className="mono-data">ID_{order.id.split('-')[1].toUpperCase()}</p>
          </div>
          <span 
            role="status"
            className={cn(
              "status-pill shadow-sm",
              STATUS_COLORS[order.status]
            )}
          >
            {order.status}
          </span>
        </div>

        {/* Items List */}
        <div className="flex-1 overflow-y-auto max-h-[180px] min-h-[100px] mb-6 pr-2 scrollbar-hide py-2">
          {order.items.map((item) => (
            <div key={item.id} className="flex justify-between text-sm py-2 border-b border-line last:border-0 hover:bg-ink/[0.02]">
              <span className="text-ink/80 flex items-center gap-2">
                <span className="font-black text-[10px] bg-ink text-white w-6 h-6 flex items-center justify-center rounded-sm">
                  {item.quantity}
                </span> 
                <span className="font-medium">{item.name}</span>
              </span>
              <span className="mono-data !opacity-100 font-black">{formatCurrency(item.price)}</span>
            </div>
          ))}
        </div>

        <div className="pt-5 border-t-2 border-line mt-auto">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center text-[10px] text-ink/80 gap-1.5 uppercase font-black tracking-[0.2em]">
              <Clock className="w-3 h-3" />
              {formatDistanceToNow(new Date(order.createdAt), { addSuffix: true })}
            </div>
            <div className="text-right">
              <p className="text-[10px] font-black uppercase tracking-widest text-ink/60 mb-1 leading-none">Total</p>
              <p className="text-2xl font-black italic tracking-tighter text-ink leading-none">{formatCurrency(order.total)}</p>
            </div>
          </div>

          <div className="flex gap-3">
            {next && actionLabel && (
              <button
                id={`advance-status-${order.id}`}
                onClick={() => onUpdateStatus(order.id, next)}
                disabled={isUpdating}
                aria-label={`Advance order to ${next}`}
                className="action-btn flex-1 bg-ink text-white hover:bg-black shadow-[4px_4px_0_rgba(20,20,20,0.1)] active:shadow-none translate-y-0 active:translate-y-1"
              >
                {order.status === 'pending' && <Coffee className="w-4 h-4" />}
                {order.status === 'preparing' && <CheckCircle2 className="w-4 h-4" />}
                {order.status === 'ready' && <CheckCircle2 className="w-4 h-4" />}
                {actionLabel}
              </button>
            )}
            
            {order.status !== 'completed' && order.status !== 'cancelled' && (
              <button
                id={`cancel-order-${order.id}`}
                onClick={() => onUpdateStatus(order.id, 'cancelled')}
                disabled={isUpdating}
                title="Cancel Order"
                aria-label="Cancel this order"
                className="action-btn aspect-square p-0 w-12 bg-canvas border-2 border-line text-ink/60 hover:text-red-600 hover:border-red-200 hover:bg-red-50"
              >
                <XCircle className="w-6 h-6" />
              </button>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
