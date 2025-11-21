import React from 'react';
import { SafeAreaView, StyleSheet, Text } from 'react-native';

import { useAuthContext } from '../../context';
import { PrimaryButton } from '../../components';
import { SPACING } from '../../utils/constants';

const ProfileScreen = () => {
  const { user, signOut, isLoading } = useAuthContext();

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Profile</Text>
      {user ? (
        <>
          <Text style={styles.meta}>{user.name}</Text>
          <Text style={styles.meta}>{user.email}</Text>
        </>
      ) : (
        <Text style={styles.meta}>Guest</Text>
      )}

      <PrimaryButton label="Sign out" onPress={signOut} loading={isLoading} style={styles.button} />
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: SPACING.xl,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: SPACING.md,
  },
  meta: {
    fontSize: 16,
    marginBottom: SPACING.sm,
  },
  button: {
    marginTop: SPACING.lg,
  },
});
