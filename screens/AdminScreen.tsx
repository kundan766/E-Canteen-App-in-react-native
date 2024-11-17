
import React, { useState } from 'react';
import { View, Text, Button, FlatList, TextInput, StyleSheet, Alert } from 'react-native';
import { useOrderContext } from '../context/OrderContext';

const AdminScreen = () => {
  const { orders, updateOrderStatus } = useOrderContext();
  const [menuItems, setMenuItems] = useState([{ id: '1', name: 'Pizza' }, { id: '2', name: 'Burger' }]);
  const [newItem, setNewItem] = useState('');
  const [editItemId, setEditItemId] = useState<string | null>(null);

  const addOrEditMenuItem = () => {
    if (editItemId) {
      // Edit existing item
      setMenuItems(menuItems.map(item => item.id === editItemId ? { ...item, name: newItem } : item));
      setEditItemId(null);
    } else {
      // Add new item
      const newId = Math.random().toString();
      setMenuItems([...menuItems, { id: newId, name: newItem }]);
    }
    setNewItem('');
  };

  const deleteMenuItem = (id: string) => {
    Alert.alert(
      "Delete Menu Item",
      "Are you sure you want to delete this item?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "OK", onPress: () => setMenuItems(menuItems.filter(item => item.id !== id)) }
      ]
    );
  };

  const startEdit = (item: { id: string; name: string }) => {
    setNewItem(item.name);
    setEditItemId(item.id);
  };

  const handleUpdateOrderStatus = (orderId: string, status: string) => {
    updateOrderStatus(orderId, status);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Admin Menu Management</Text>
      <TextInput
        style={styles.input}
        placeholder="Add/Edit Menu Item"
        value={newItem}
        onChangeText={setNewItem}
      />
      <Button title={editItemId ? "Edit Item" : "Add Item"} onPress={addOrEditMenuItem} color="#007BFF"  />
      <Text style={styles.subtitle}>Menu Items:</Text>
      <FlatList
        data={menuItems}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.menuItem}>
            <Text style={styles.menuItemText}>{item.name}</Text>
            <View style={styles.buttonContainer}>
              <Button title="Edit" onPress={() => startEdit(item)} color="#28A745" />
              <Button title="Delete" onPress={() => deleteMenuItem(item.id)} color="#DC3545" />
            </View>
          </View>
        )}
   
      />
      <Text style={styles.subtitle}>Orders:</Text>
      <FlatList
        data={orders}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.orderItem}>
            <Text style={styles.orderText}>{item.studentName} - {item.menuItem} - {item.status}</Text>
            <View style={styles.buttonContainer}>
              <Button title="Received" onPress={() => handleUpdateOrderStatus(item.id, 'Received')} color="#007BFF" />
              <Button title="Picked" onPress={() => handleUpdateOrderStatus(item.id, 'Picked')} color="#FFC107" />
              <Button title="Prepared" onPress={() => handleUpdateOrderStatus(item.id, 'Prepared')} color="#28A745" />
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex:1,
    
    backgroundColor: '#F8F9FA',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 22,
    fontWeight: '600',
    marginVertical: 12,
  },
  input: {
    marginLeft:20,
    width:300,
    height: 50,
    borderColor: '#CED4DA',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 16,
    paddingHorizontal: 10,
    fontSize: 16,
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    
    backgroundColor: '#FFFFFF',
    borderRadius: 5,
    marginBottom:10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.5,
    
  },
  menuItemText: {
    fontSize: 18,
    
  },
  orderItem: {
    
    padding: 10,
    backgroundColor: '#FFFFFF',
    borderRadius: 5,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.5,
    elevation: 2,
  },
  orderText: {
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '60%',
  },
  
});

export default AdminScreen;

