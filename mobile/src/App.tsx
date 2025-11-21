import React from 'react';
import { StatusBar } from 'expo-status-bar';

import { AppNavigator } from './navigation';
import { AuthProvider, CartProvider, OrderProvider } from './context';

const App = () => (
  <AuthProvider>
    <CartProvider>
      <OrderProvider>
        <StatusBar style="dark" />
        <AppNavigator />
      </OrderProvider>
    </CartProvider>
  </AuthProvider>
);

export default App;
