import React from 'react';
import { ImageBackground, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { PrimaryButton } from '../../components';
import { COLORS, SPACING } from '../../utils/constants';
import { AuthStackParamList } from '../../navigation/types';

const heroImage = {
  uri: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1200&q=80',
};

type Props = NativeStackScreenProps<AuthStackParamList, 'Welcome'>;

const WelcomeScreen: React.FC<Props> = ({ navigation }) => (
  <SafeAreaView style={styles.safeArea}>
    <ImageBackground source={heroImage} style={styles.hero} imageStyle={styles.heroImage}>
      <View style={styles.overlay}>
        <Text style={styles.title}>Harvest Eats</Text>
        <Text style={styles.subtitle}>Farm-to-table favorites delivered fast.</Text>
      </View>
    </ImageBackground>

    <View style={styles.content}>
      <PrimaryButton label="Log in" onPress={() => navigation.navigate('Login')} />
      <PrimaryButton
        label="Create account"
        onPress={() => navigation.navigate('Register')}
        style={styles.secondaryButton}
      />
      <Text style={styles.helperText}>Track orders, save favorites, and reorder in seconds.</Text>
    </View>
  </SafeAreaView>
);

export default WelcomeScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  hero: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  heroImage: {
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
  },
  overlay: {
    backgroundColor: 'rgba(0,0,0,0.45)',
    padding: SPACING.xl,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
  },
  title: {
    color: '#fff',
    fontSize: 36,
    fontWeight: '800',
  },
  subtitle: {
    color: '#e2e8f0',
    fontSize: 18,
    marginTop: SPACING.sm,
  },
  content: {
    padding: SPACING.xl,
    gap: SPACING.md,
  },
  secondaryButton: {
    backgroundColor: '#2f2f2f',
  },
  helperText: {
    textAlign: 'center',
    color: COLORS.muted,
  },
});
