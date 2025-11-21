import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';

export type OrderStatus = 'pending' | 'preparing' | 'on-the-way' | 'delivered';

export type Order = {
  id: string;
  total: number;
  status: OrderStatus;
  placedAt: string;
};

export type OrderContextValue = {
  orders: Order[];
  placeOrder: (order: Omit<Order, 'id' | 'status'>) => Order;
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;
};

const OrderContext = createContext<OrderContextValue | undefined>(undefined);

export const OrderProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [orders, setOrders] = useState<Order[]>([]);

  const placeOrder = useCallback((order: Omit<Order, 'id' | 'status'>): Order => {
    const newOrder: Order = {
      id: `order-${Date.now()}`,
      status: 'pending',
      ...order,
    };
    setOrders((prev) => [newOrder, ...prev]);
    return newOrder;
  }, []);

  const updateOrderStatus = useCallback((orderId: string, status: OrderStatus) => {
    setOrders((prev) => prev.map((orderItem) => (orderItem.id === orderId ? { ...orderItem, status } : orderItem)));
  }, []);

  const value = useMemo(() => ({ orders, placeOrder, updateOrderStatus }), [orders, placeOrder, updateOrderStatus]);

  return <OrderContext.Provider value={value}>{children}</OrderContext.Provider>;
};

export const useOrderContext = () => {
  const context = useContext(OrderContext);

  if (!context) {
    throw new Error('useOrderContext must be used within an OrderProvider');
  }

  return context;
};
