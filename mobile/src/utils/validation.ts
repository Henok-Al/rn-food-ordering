export const isEmailValid = (value: string) =>
  /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value.trim());

export const validateRequired = (value: string, fieldLabel = 'This field') =>
  value.trim().length > 0 ? '' : `${fieldLabel} is required`;

export const validateEmail = (value: string, label = 'Email') => {
  if (!value.trim()) {
    return `${label} is required`;
  }

  if (!isEmailValid(value)) {
    return `Enter a valid ${label.toLowerCase()} address`;
  }

  return '';
};

export const validatePassword = (value: string, minLength = 8, label = 'Password') => {
  if (!value.trim()) {
    return `${label} is required`;
  }

  if (value.length < minLength) {
    return `${label} must be at least ${minLength} characters`;
  }

  return '';
};
