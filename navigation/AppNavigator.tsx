
import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AdminScreen from "../screens/AdminScreen";
import StudentScreen from '../screens/StudentScreen';
import OrderHistoryScreen from '../screens/OrderHistoryScreen';
import { Button, View } from 'react-native';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  const [isAdmin, setIsAdmin] = useState(true); 

  return (
    <NavigationContainer>
      <View style={{ flexDirection: 'row', justifyContent: 'center', margin: 10, padding:50 , gap:10,}}>
        <Button title="Switch to Admin" onPress={() => setIsAdmin(true)} />
        <Button title="Switch to Student" onPress={() => setIsAdmin(false)} />
      </View>
      <Stack.Navigator>
        {isAdmin ? (
          <Stack.Screen name="Admin" component={AdminScreen} />
        ) : (
          <Stack.Screen name="Student" component={StudentScreen} />
        )}
        <Stack.Screen name="OrderHistory" component={OrderHistoryScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;