import React from 'react';
import { ActivityIndicator, Pressable, PressableProps, StyleSheet, Text } from 'react-native';

import { COLORS, BORDER_RADIUS, SPACING } from '../../utils/constants';

export type PrimaryButtonProps = PressableProps & {
  label: string;
  loading?: boolean;
};

const PrimaryButton: React.FC<PrimaryButtonProps> = ({ label, loading = false, disabled, style, ...rest }) => {
  const isDisabled = disabled || loading;
  return (
    <Pressable
      accessibilityRole="button"
      style={[styles.button, isDisabled && styles.buttonDisabled, style]}
      disabled={isDisabled}
      {...rest}
    >
      {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.label}>{label}</Text>}
    </Pressable>
  );
};

export default PrimaryButton;

const styles = StyleSheet.create({
  button: {
    backgroundColor: COLORS.primary,
    borderRadius: BORDER_RADIUS.pill,
    paddingVertical: SPACING.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  label: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },
});
