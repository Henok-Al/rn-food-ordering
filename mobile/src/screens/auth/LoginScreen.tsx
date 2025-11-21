import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { AuthScreenContainer, FormTextInput, PrimaryButton } from '../../components';
import { useAuthContext } from '../../context';
import { AuthStackParamList } from '../../navigation/types';
import { validateEmail, validatePassword } from '../../utils/validation';
import { COLORS, SPACING } from '../../utils/constants';

type Props = NativeStackScreenProps<AuthStackParamList, 'Login'>;

type FormErrors = {
  email?: string;
  password?: string;
};

const LoginScreen: React.FC<Props> = ({ navigation }) => {
  const { signIn, isLoading } = useAuthContext();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<FormErrors>({});
  const [formError, setFormError] = useState('');

  const handleSubmit = async () => {
    const nextErrors: FormErrors = {
      email: validateEmail(email),
      password: validatePassword(password),
    };

    setErrors(nextErrors);

    if (nextErrors.email || nextErrors.password) {
      return;
    }

    try {
      setFormError('');
      await signIn(email.trim(), password);
    } catch (error) {
      console.warn('Login failed', error);
      setFormError('Unable to log in. Please try again.');
    }
  };

  return (
    <AuthScreenContainer
      title="Welcome back"
      subtitle="Log in to explore restaurants near you."
      footer={
        <Text style={styles.footerText}>
          New here?{' '}
          <Text style={styles.link} onPress={() => navigation.navigate('Register')}>
            Create an account
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
          errorMessage={errors.email}
        />

        <FormTextInput
          label="Password"
          placeholder="••••••••"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          errorMessage={errors.password}
        />

        {formError ? <Text style={styles.formError}>{formError}</Text> : null}

        <PrimaryButton label="Continue" onPress={handleSubmit} loading={isLoading} />

        <Text style={styles.helper} onPress={() => navigation.navigate('ForgotPassword')}>
          Forgot password?
        </Text>
      </View>
    </AuthScreenContainer>
  );
};

export default LoginScreen;

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
  formError: {
    color: COLORS.danger,
    textAlign: 'center',
  },
});
