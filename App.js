import React from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignupScreen from './screens/SignupScreen';
import LoginScreen from './screens/LoginScreen';
import ProductScreen from './screens/ProductScreen';
import ProductDetails from './screens/ProductDetails';
import UserDetails from './screens/UserDetails';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" options={{ title: "Login" }} component={LoginScreen} />
        <Stack.Screen name="Signup" options={{ title: "Signup" }} component={SignupScreen} />
        <Stack.Screen name="Product" options={{ title: "Product" }} component={ProductScreen} />
        <Stack.Screen name="ProductDetails" options={{ title: "ProductDetails" }} component={ProductDetails} />
        <Stack.Screen name="UserDetails" options={{ title: "UserDetails" }} component={UserDetails} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;