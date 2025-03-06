// utils/validation/phoneValidator.ts

export function phoneValidator(phone: string): boolean {
  // Ensure the phone number consists of exactly 11 digits, allowing an optional leading '+'
  const phoneRegex = /^\+?\d{11}$/;
  return phoneRegex.test(phone);
}
