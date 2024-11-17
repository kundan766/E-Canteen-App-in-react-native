import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import AppNavigator from './navigation/AppNavigator';
import { OrderProvider } from './context/OrderContext';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function App() {
  return (
   
    <GestureHandlerRootView style={{ flex: 1 }}>
    
    <OrderProvider>
      <AppNavigator />
      
       <View style={styles.container}>
      
      <StatusBar style="auto" />
    </View>
    </OrderProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
   container: {
  
    
   },
});
