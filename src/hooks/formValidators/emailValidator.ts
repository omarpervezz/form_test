// utils/validation/emailValidator.ts

export function emailValidator(email: string): boolean {
  // Simple regex to check email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}
