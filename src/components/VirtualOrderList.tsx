import { motion, useReducedMotion, AnimatePresence } from 'motion/react';
import { Order, OrderStatus } from '../types';
import { OrderCard } from './OrderCard';

interface VirtualOrderListProps {
  orders: Order[];
  onUpdateStatus: (orderId: string, newStatus: OrderStatus) => void;
  isUpdating: boolean;
}

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05
    }
  }
};

export function VirtualOrderList({ orders, onUpdateStatus, isUpdating }: VirtualOrderListProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="pb-24">
      <motion.div 
        variants={shouldReduceMotion ? {} : container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-8"
      >
        <AnimatePresence mode="popLayout" initial={false}>
          {orders.map((order) => (
            <OrderCard
              key={order.id}
              order={order}
              onUpdateStatus={onUpdateStatus}
              isUpdating={isUpdating}
            />
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
