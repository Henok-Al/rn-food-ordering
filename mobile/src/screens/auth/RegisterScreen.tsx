import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { AuthScreenContainer, FormTextInput, PrimaryButton } from '../../components';
import { useAuthContext } from '../../context';
import { AuthStackParamList } from '../../navigation/types';
import { validateEmail, validatePassword, validateRequired } from '../../utils/validation';
import { COLORS, SPACING } from '../../utils/constants';

type Props = NativeStackScreenProps<AuthStackParamList, 'Register'>;

type FormErrors = {
  name?: string;
  email?: string;
  password?: string;
};

const RegisterScreen: React.FC<Props> = ({ navigation }) => {
  const { register, isLoading } = useAuthContext();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<FormErrors>({});
  const [formError, setFormError] = useState('');

  const handleSubmit = async () => {
    const nextErrors: FormErrors = {
      name: validateRequired(name, 'Full name'),
      email: validateEmail(email),
      password: validatePassword(password),
    };

    setErrors(nextErrors);

    if (nextErrors.name || nextErrors.email || nextErrors.password) {
      return;
    }

    try {
      setFormError('');
      await register(name.trim(), email.trim(), password);
    } catch (error) {
      console.warn('Register failed', error);
      setFormError('Unable to create account. Please try again.');
    }
  };

  return (
    <AuthScreenContainer
      title="Create account"
      subtitle="Save your favorites and track every delivery."
      footer={
        <Text style={styles.footerText}>
          Already have an account?{' '}
          <Text style={styles.link} onPress={() => navigation.navigate('Login')}>
            Log in
          </Text>
        </Text>
      }
    >
      <View style={styles.form}>
        <FormTextInput
          label="Full name"
          placeholder="Jane Doe"
          value={name}
          onChangeText={setName}
          autoCapitalize="words"
          errorMessage={errors.name}
        />

        <FormTextInput
          label="Email"
          placeholder="you@example.com"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          errorMessage={errors.email}
        />

        <FormTextInput
          label="Password"
          placeholder="Minimum 8 characters"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          errorMessage={errors.password}
        />

        {formError ? <Text style={styles.formError}>{formError}</Text> : null}

        <PrimaryButton label="Create account" onPress={handleSubmit} loading={isLoading} />
      </View>
    </AuthScreenContainer>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  form: {
    gap: SPACING.md,
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
