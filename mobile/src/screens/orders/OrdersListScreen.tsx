import React from 'react';
import { SafeAreaView, StyleSheet, Text } from 'react-native';

const OrdersListScreen = () => (
  <SafeAreaView style={styles.container}>
    <Text style={styles.text}>Your recent orders will appear here.</Text>
  </SafeAreaView>
);

export default OrdersListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 24,
  },
  text: {
    textAlign: 'center',
    fontSize: 16,
  },
});
