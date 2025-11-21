import React from 'react';
import { StyleSheet, Text, TextInput, TextInputProps, View } from 'react-native';

import { COLORS, SPACING, BORDER_RADIUS } from '../../utils/constants';

export type FormTextInputProps = TextInputProps & {
  label: string;
  errorMessage?: string;
};

const FormTextInput: React.FC<FormTextInputProps> = ({ label, errorMessage, style, ...rest }) => (
  <View style={styles.container}>
    <Text style={styles.label}>{label}</Text>
    <TextInput
      style={[styles.input, errorMessage ? styles.inputError : null, style]}
      placeholderTextColor={COLORS.muted}
      {...rest}
    />
    {!!errorMessage && <Text style={styles.error}>{errorMessage}</Text>}
  </View>
);

export default FormTextInput;

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  label: {
    fontWeight: '600',
    marginBottom: SPACING.xs,
    color: COLORS.primary,
  },
  input: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: BORDER_RADIUS.md,
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.sm,
    fontSize: 16,
    color: COLORS.primary,
    backgroundColor: COLORS.surface,
  },
  inputError: {
    borderColor: COLORS.danger,
  },
  error: {
    marginTop: SPACING.xs,
    color: COLORS.danger,
    fontSize: 13,
  },
});
