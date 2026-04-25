import { Order, OrderStatus } from '../types';

const NAMES = ['Alex Morgan', 'Jordan Smith', 'Cassie Reed', 'Marcus Vane', 'Elena Fisher', 'Sam Drake', 'Chloe Frazer', 'Victor Sullivan', 'Nate Gray', 'Lara Croft', 'Leon Kennedy', 'Ada Wong', 'Jill Valentine', 'Chris Redfield', 'Claire Redfield'];
const MENU_ITEMS = [
  { name: 'Double Espresso', price: 450 },
  { name: 'Oat Milk Latte', price: 550 },
  { name: 'Flat White', price: 480 },
  { name: 'Cold Brew', price: 500 },
  { name: 'Almond Croissant', price: 425 },
  { name: 'Pain au Chocolat', price: 395 },
  { name: 'Avocado Toast', price: 1250 },
  { name: 'Blueberry Muffin', price: 350 },
  { name: 'Lemon Cake', price: 375 },
  { name: 'Smoked Salmon Bagel', price: 1150 },
  { name: 'Greek Yogurt Bowl', price: 850 },
  { name: 'Matcha Latte', price: 575 },
];

const INITIAL_ORDERS: Order[] = Array.from({ length: 200 }).map((_, i) => {
  const itemCount = Math.floor(Math.random() * 3) + 1;
  const items = Array.from({ length: itemCount }).map((__, j) => {
    const menuItem = MENU_ITEMS[Math.floor(Math.random() * MENU_ITEMS.length)];
    const quantity = Math.floor(Math.random() * 2) + 1;
    return {
      id: `item-${i}-${j}`,
      name: menuItem.name,
      quantity,
      price: menuItem.price,
    };
  });

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return {
    id: `order-${(i + 1).toString().padStart(4, '0')}`,
    guestName: NAMES[Math.floor(Math.random() * NAMES.length)],
    items,
    status: (['pending', 'preparing', 'ready', 'completed', 'cancelled'] as OrderStatus[])[Math.floor(Math.random() * 5)],
    createdAt: new Date(Date.now() - Math.random() * 1000 * 60 * 60 * 2).toISOString(), // Within last 2 hours for more relevance
    updatedAt: new Date().toISOString(),
    total,
  };
});

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
