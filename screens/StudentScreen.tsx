
import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, Alert } from 'react-native';
import { Button, Card } from 'react-native-paper';
import { useOrderContext } from '../context/OrderContext';
import { ScrollView } from 'react-native-gesture-handler';

const menuItemsData = [
  { id: '1', name: 'Pizza', price: 10 },
  { id: '2', name: 'Burger', price: 50 },
  { id: '3', name: 'Pasta', price: 80 },
  { id: '4', name: 'Salad', price: 60 },
   {id:'5', name:'sandwich',price:200}
];

const StudentScreen = () => {
  const { orders, placeOrder } = useOrderContext();
  const [cart, setCart] = useState<{ id: string; name: string; price: number; quantity: number }[]>([]);

  const addToCart = (item: { id: string; name: string; price: number }) => {
    const existingItem = cart.find(cartItem => cartItem.id === item.id);
    if (existingItem) {
      setCart(cart.map(cartItem => 
        cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
      ));
    } else {
      setCart([...cart, { ...item, quantity: 1 }]);
    }
  };

  const placeOrderHandler = () => {
    if (cart.length === 0) {
      Alert.alert('Cart is empty', 'Please add items to your cart before placing an order.');
      return;
    }
    placeOrder(cart); 
    setCart([]);
    Alert.alert('Success', 'Your order has been placed!');
  };

  const renderMenuItem = ({ item }: { item: { id: string; name: string; price: number } }) => (
    <Card style={styles.menuItem}>
      <Card.Content>
        <Text style={styles.menuItemText}>{item.name} - ${item.price}</Text>
        <Button mode="outlined" onPress={() => addToCart(item)} style={styles.addButton}>
          Add to Cart
        </Button>
      </Card.Content>
    </Card>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Place Your order !</Text>
      <FlatList
        data ={menuItemsData}
        keyExtractor={item => item.id}
        renderItem={renderMenuItem}
        style={styles.flatList} 
      />
      <Text style={styles.subtitle}>Your Cart:</Text>
      <FlatList
        data={cart}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.cartItem}>
            <Text style={styles.cartItemText}>{item.name} x {item.quantity} - ${item.price * item.quantity}</Text>
          </View>
        )}
        ListEmptyComponent={<Text style={styles.emptyText}>Your cart is empty.</Text>}
      />
      <Button mode="contained" onPress={placeOrderHandler} style={styles.placeOrderButton}>
        Place Order
      </Button>
      <Text style={styles.subtitle}>Current Orders:</Text>
      <FlatList
        data={orders}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.orderItem}>
            <Text style={styles.orderText}>Order ID: {item.id} - Status: {item.status}</Text>
            {item.items.map((orderItem, index) => (
              <Text key={index}>{orderItem.name} x {orderItem.quantity} - ${orderItem.price * orderItem.quantity}</Text>
            ))}
          </View>
        )}
        ListEmptyComponent={<Text style={styles.emptyText}>No current orders.</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
   
    flex:10,
   
    backgroundColor: '#F5F5F5',
  },
  title: {
       color:"red",
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 16,
        textAlign: 'center',
      },
  menuList: {
    marginBottom: 20,
   
  },
 
  flatList: {
    flex:10, 
   
  },



  menuItem: {
    
     padding:10,
    flexDirection:"row",
    justifyContent: 'space-between',
    alignItems: 'center',
   marginBottom: 12,
    borderRadius: 8,
    elevation: 2,
    backgroundColor: '#FFFFFF',
  },
  menuItemText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  menuItemPrice: {
    fontSize: 16,
    color: '#888888',
  },
  addButton: {
    marginTop: 8,
  },
  subtitle: {
    fontSize: 24,
    fontWeight: '500',
    marginVertical: 12,
  },
  cartItem: {
    
    padding:10,
   
    minHeight: 70,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    marginBottom: 8,
    elevation:5
  },
  cartItemText: {
    fontSize: 16,
  },
  emptyText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#6c757d',
  },
  orderItem: {
    width: '100%', 
    padding: 12,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    marginBottom: 8,
    elevation: 1,
  },
  orderText: {
    fontSize: 16,
    fontWeight: 'bold',
    
  },
  placeOrderButton: {
    marginTop: 16,
    width:250,
     
    marginLeft:30,
    backgroundColor: '#017BFF',
  },
 
  
});

export default StudentScreen;