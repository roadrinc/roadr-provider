/**
 * International phone number formatting utilities
 * Supports various international formats with country codes
 */

export const formatPhoneNumber = (value: string): string => {
  // Remove all non-digits and non-plus signs
  const cleaned = value.replace(/[^\d+]/g, '');
  
  // If it starts with +, it's an international number
  if (cleaned.startsWith('+')) {
    // Keep the + and format the rest
    const digits = cleaned.substring(1);
    
    // Common international formats
    if (digits.length <= 3) {
      return `+${digits}`;
    } else if (digits.length <= 6) {
      return `+${digits.substring(0, 3)} ${digits.substring(3)}`;
    } else if (digits.length <= 10) {
      return `+${digits.substring(0, 3)} ${digits.substring(3, 6)} ${digits.substring(6)}`;
    } else {
      // For longer numbers, group in 3s after country code
      const countryCode = digits.substring(0, 3);
      const remaining = digits.substring(3);
      const groups = remaining.match(/.{1,3}/g) || [];
      return `+${countryCode} ${groups.join(' ')}`;
    }
  } else {
    // No country code - could be domestic number
    // Allow flexible formatting without forcing US format
    if (cleaned.length <= 3) {
      return cleaned;
    } else if (cleaned.length <= 6) {
      return `${cleaned.substring(0, 3)} ${cleaned.substring(3)}`;
    } else if (cleaned.length <= 10) {
      return `${cleaned.substring(0, 3)} ${cleaned.substring(3, 6)} ${cleaned.substring(6)}`;
    } else {
      // Group longer numbers in 3s
      const groups = cleaned.match(/.{1,3}/g) || [];
      return groups.join(' ');
    }
  }
};

export const cleanPhoneNumber = (value: string): string => {
  // Remove all non-digits and preserve + for international numbers
  return value.replace(/[^\d+]/g, '');
};

export const isValidPhoneNumber = (value: string): boolean => {
  const cleaned = cleanPhoneNumber(value);
  
  // International number with country code
  if (cleaned.startsWith('+')) {
    const digits = cleaned.substring(1);
    // International numbers typically 7-15 digits after country code
    return digits.length >= 7 && digits.length <= 15;
  } else {
    // Domestic number - allow 7-15 digits
    return cleaned.length >= 7 && cleaned.length <= 15;
  }
};

export const handlePhoneInput = (
  e: React.ChangeEvent<HTMLInputElement>,
  setState: (value: string) => void
) => {
  const formatted = formatPhoneNumber(e.target.value);
  setState(formatted);
};

export const handlePhoneKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
  // Allow backspace, delete, tab, escape, enter
  if ([8, 9, 27, 13, 46].indexOf(e.keyCode) !== -1 ||
      // Allow Ctrl+A, Ctrl+C, Ctrl+V, Ctrl+X
      (e.keyCode === 65 && e.ctrlKey === true) ||
      (e.keyCode === 67 && e.ctrlKey === true) ||
      (e.keyCode === 86 && e.ctrlKey === true) ||
      (e.keyCode === 88 && e.ctrlKey === true) ||
      // Allow home, end, left, right
      (e.keyCode >= 35 && e.keyCode <= 39)) {
    return;
  }
  
  // Allow + at the beginning
  if (e.key === '+' && e.currentTarget.selectionStart === 0) {
    return;
  }
  
  // Ensure that it is a number and stop the keypress
  if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
    e.preventDefault();
  }
};

export const formatExistingPhoneNumber = (phone: string): string => {
  // If phone is already formatted nicely, return it
  if (!phone) return '';
  
  // Format using our international formatter
  return formatPhoneNumber(phone);
};

export const getPhoneNumberPlaceholder = (): string => {
  return '+1 555 123 4567';
};

export const getPhoneNumberExample = (): string => {
  return 'e.g., +1 555 123 4567, +44 20 7946 0958, or 555 123 4567';
};