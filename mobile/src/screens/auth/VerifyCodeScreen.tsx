import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { AuthScreenContainer, FormTextInput, PrimaryButton } from '../../components';
import { useAuthContext } from '../../context';
import { AuthStackParamList } from '../../navigation/types';
import { validateRequired } from '../../utils/validation';
import { COLORS, SPACING } from '../../utils/constants';

type Props = NativeStackScreenProps<AuthStackParamList, 'VerifyCode'>;

type FormErrors = {
  code?: string;
};

const VerifyCodeScreen: React.FC<Props> = ({ navigation }) => {
  const { verifyCode, isLoading } = useAuthContext();
  const [code, setCode] = useState('');
  const [errors, setErrors] = useState<FormErrors>({});
  const [statusMessage, setStatusMessage] = useState('');

  const handleSubmit = async () => {
    const nextErrors: FormErrors = { code: validateRequired(code, 'Verification code') };
    setErrors(nextErrors);

    if (nextErrors.code) {
      return;
    }

    try {
      setStatusMessage('');
      const success = await verifyCode(code.trim());
      setStatusMessage(success ? 'Code verified. You can now log in.' : 'Invalid code, please try again.');
      if (success) {
        navigation.navigate('Login');
      }
    } catch (err) {
      console.warn('Verify code error', err);
      setStatusMessage('Unable to verify code.');
    }
  };

  return (
    <AuthScreenContainer title="Enter verification code" subtitle="Check your SMS or email for the 6-digit code.">
      <View style={styles.form}>
        <FormTextInput
          label="Code"
          placeholder="123456"
          keyboardType="number-pad"
          value={code}
          onChangeText={setCode}
          maxLength={6}
          errorMessage={errors.code}
        />

        {statusMessage ? <Text style={styles.status}>{statusMessage}</Text> : null}

        <PrimaryButton label="Verify" onPress={handleSubmit} loading={isLoading} />

        <Text style={styles.helper} onPress={() => navigation.navigate('ForgotPassword')}>
          Didn’t get a code? Resend
        </Text>
      </View>
    </AuthScreenContainer>
  );
};

export default VerifyCodeScreen;

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
  status: {
    textAlign: 'center',
    color: COLORS.muted,
  },
});
