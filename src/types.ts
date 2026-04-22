/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type OrderStatus = 'pending' | 'preparing' | 'ready' | 'completed' | 'cancelled';

export interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: number; // in cents
}

export interface Order {
  id: string;
  guestName: string;
  items: OrderItem[];
  status: OrderStatus;
  createdAt: string;
  updatedAt: string;
  total: number; // in cents
}

export type OrderUpdateAction = {
  orderId: string;
  newStatus: OrderStatus;
};
