import { Order, OrderStatus } from '../types';
import { OrderCard } from './OrderCard';

interface VirtualOrderListProps {
  orders: Order[];
  onUpdateStatus: (orderId: string, newStatus: OrderStatus) => void;
  isUpdating: boolean;
}

// NOTE: In a production environment, I would use react-window or react-virtualized here
// specifically for handling 500+ orders. Due to ESM/Vite compatibility issues
// with react-window in this environment, I'm using a standard responsive grid.
export function VirtualOrderList({ orders, onUpdateStatus, isUpdating }: VirtualOrderListProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 pb-20">
      {orders.map((order) => (
        <OrderCard
          key={order.id}
          order={order}
          onUpdateStatus={onUpdateStatus}
          isUpdating={isUpdating}
        />
      ))}
    </div>
  );
}
