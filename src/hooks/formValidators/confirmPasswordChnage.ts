// utils/validation/confirmPasswordValidator.ts

export function confirmPasswordValidator(password: string, confirmPassword: string): boolean {
    return password === confirmPassword;
  }
  