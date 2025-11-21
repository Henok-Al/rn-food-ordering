import React from 'react';
import { SafeAreaView, StyleSheet, Text } from 'react-native';

const RestaurantDetailScreen = () => (
  <SafeAreaView style={styles.container}>
    <Text style={styles.text}>Restaurant detail screen scaffold</Text>
  </SafeAreaView>
);

export default RestaurantDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 18,
  },
});
