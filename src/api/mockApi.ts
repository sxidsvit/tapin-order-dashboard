import { Order, OrderStatus } from '../types';

const INITIAL_ORDERS: Order[] = Array.from({ length: 500 }).map((_, i) => ({
  id: `order-${i + 1}`,
  guestName: `Guest ${i + 1}`,
  items: [
    { id: `item-${i}-1`, name: 'Espresso', quantity: 1, price: 450 },
    { id: `item-${i}-2`, name: 'Croissant', quantity: 2, price: 375 },
  ],
  status: (['pending', 'preparing', 'ready', 'completed', 'cancelled'] as OrderStatus[])[Math.floor(Math.random() * 5)],
  createdAt: new Date(Date.now() - Math.random() * 1000 * 60 * 60 * 24).toISOString(),
  updatedAt: new Date().toISOString(),
  total: 1200,
}));

let orders: Order[] = [...INITIAL_ORDERS];

export const mockApi = {
  fetchOrders: async (): Promise<Order[]> => {
    return new Promise((resolve) => {
      setTimeout(() => resolve([...orders]), 800);
    });
  },

  updateOrderStatus: async (orderId: string, newStatus: OrderStatus): Promise<Order> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Randomly fail to test rollback (5% chance)
        if (Math.random() < 0.05) {
          reject(new Error('Network error: Failed to update order status'));
          return;
        }

        const orderIndex = orders.findIndex((o) => o.id === orderId);
        if (orderIndex === -1) {
          reject(new Error('Order not found'));
          return;
        }

        const updatedOrder = {
          ...orders[orderIndex],
          status: newStatus,
          updatedAt: new Date().toISOString(),
        };

        orders[orderIndex] = updatedOrder;
        resolve(updatedOrder);
      }, 1000);
    });
  },
};
