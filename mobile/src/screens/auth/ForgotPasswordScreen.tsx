import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { AuthScreenContainer, FormTextInput, PrimaryButton } from '../../components';
import { useAuthContext } from '../../context';
import { AuthStackParamList } from '../../navigation/types';
import { validateEmail } from '../../utils/validation';
import { COLORS, SPACING } from '../../utils/constants';

type Props = NativeStackScreenProps<AuthStackParamList, 'ForgotPassword'>;

const ForgotPasswordScreen: React.FC<Props> = ({ navigation }) => {
  const { requestPasswordReset, isLoading } = useAuthContext();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [statusMessage, setStatusMessage] = useState('');

  const handleSubmit = async () => {
    const emailError = validateEmail(email);
    setError(emailError);

    if (emailError) {
      return;
    }

    try {
      setStatusMessage('');
      const success = await requestPasswordReset(email.trim());
      if (success) {
        setStatusMessage('Check your inbox for the reset link.');
      } else {
        setStatusMessage('Something went wrong. Please try again.');
      }
    } catch (err) {
      console.warn('Password reset failed', err);
      setStatusMessage('Unable to send reset instructions.');
    }
  };

  return (
    <AuthScreenContainer
      title="Reset password"
      subtitle="We’ll send a secure link to your email."
      footer={
        <Text style={styles.footerText}>
          Remembered it?{' '}
          <Text style={styles.link} onPress={() => navigation.navigate('Login')}>
            Back to login
          </Text>
        </Text>
      }
    >
      <View style={styles.form}>
        <FormTextInput
          label="Email"
          placeholder="you@example.com"
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          value={email}
          onChangeText={setEmail}
          errorMessage={error}
        />

        {statusMessage ? <Text style={styles.status}>{statusMessage}</Text> : null}

        <PrimaryButton label="Send reset link" onPress={handleSubmit} loading={isLoading} />

        <Text style={styles.helper} onPress={() => navigation.navigate('VerifyCode')}>
          Have a code already?
        </Text>
      </View>
    </AuthScreenContainer>
  );
};

export default ForgotPasswordScreen;

const styles = StyleSheet.create({
  form: {
    gap: SPACING.md,
  },
  helper: {
    marginTop: SPACING.sm,
    textAlign: 'center',
    color: COLORS.primary,
    fontWeight: '600',
  },
  footerText: {
    color: COLORS.muted,
  },
  link: {
    color: COLORS.primary,
    fontWeight: '700',
  },
  status: {
    textAlign: 'center',
    color: COLORS.muted,
  },
});
