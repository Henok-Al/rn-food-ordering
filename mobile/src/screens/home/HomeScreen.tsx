import React from 'react';
import { SafeAreaView, StyleSheet, Text } from 'react-native';

const HomeScreen = () => (
  <SafeAreaView style={styles.container}>
    <Text style={styles.text}>Home feed coming soon.</Text>
  </SafeAreaView>
);

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 18,
    fontWeight: '600',
  },
});
