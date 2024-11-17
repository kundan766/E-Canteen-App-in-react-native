// app/screens/OrderHistoryScreen.tsx
import React from 'react';
import { View, Text, FlatList } from 'react-native';
import { useOrderContext } from '../context/OrderContext';

const OrderHistoryScreen = () => {
  const { orders } = useOrderContext();

  return (
    <View>
      <Text>Order History</Text>
      <FlatList
        data={orders}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <Text>{item.name} - {item.status}</Text>}
      />
    </View>
  );
};

export default OrderHistoryScreen;