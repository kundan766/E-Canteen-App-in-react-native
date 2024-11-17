
import React, { createContext, useContext, useState } from 'react';

interface OrderItem {
  name: string;
  price: number;
  quantity: number;
}

interface Order {
  id: string;
  items: OrderItem[];
  status: string;
}

interface OrderContextType {
  orders: Order[];
  placeOrder: (items: OrderItem[]) => void;
  updateOrderStatus: (orderId: string, status: string) => void;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export const OrderProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [orders, setOrders] = useState<Order[]>([]);

  const placeOrder = (items: OrderItem[]) => {
    const newOrder = {
      id: Math.random().toString(),
      items,
      status: 'Pending',
    };
    setOrders((prevOrders) => [...prevOrders, newOrder]);
  };

  const updateOrderStatus = (orderId: string, status: string) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === orderId ? { ...order, status } : order
      )
    );
  };

  return (
    <OrderContext.Provider value={{ orders, placeOrder, updateOrderStatus }}>
      {children}
    </OrderContext.Provider>
  );
};

export const useOrderContext = () => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error('useOrderContext must be used within an OrderProvider');
  }
  return context;
};