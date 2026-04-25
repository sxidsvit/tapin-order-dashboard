// src/api/ordersApi.ts
import { Order, OrderStatus } from '../types/order';
import { mockOrders } from './mockData';

const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

export const fetchOrders = async (): Promise<Order[]> => {
  await delay(800); // Simulate network
  return [...mockOrders]; 
};

export const updateOrderStatus = async (id: string, status: OrderStatus): Promise<Order> => {
  await delay(500);
  const order = mockOrders.find(o => o.id === id);
  if (!order) throw new Error("Order not found");
  return { ...order, status };
};