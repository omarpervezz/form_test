import { useEffect, useState } from "react";

interface UsePasswordValidationResult {
  passwordError: string | undefined;
  confirmPasswordError: string | undefined;
  isFormValid: boolean;
}

const usePasswordValidation = (
  password: string,
  confirmPassword: string
): UsePasswordValidationResult => {
  const [passwordError, setPasswordError] = useState<string | undefined>(
    undefined
  );
  const [confirmPasswordError, setConfirmPasswordError] = useState<
    string | undefined
  >(undefined);
  const [isFormValid, setIsFormValid] = useState<boolean>(false);

  useEffect(() => {
    const errors: string[] = [];

    // Check for uppercase letter
    if (!/[A-Z]/.test(password)) {
      errors.push("Password must contain at least one uppercase letter.");
    }

    // Check for special character
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      errors.push("Password must contain at least one special character.");
    }
    // Check password length
    if (password.length < 8) {
      errors.push("Password must be at least 8 characters.");
    }

    // Set password error (if any)
    setPasswordError(errors.length > 0 ? errors.join("\n") : undefined);

    // Confirm password validation
    if (confirmPassword && confirmPassword !== password) {
      setConfirmPasswordError("Passwords do not match.");
    } else {
      setConfirmPasswordError(undefined);
    }

    // Form is valid if no password errors and passwords match
    setIsFormValid(errors.length === 0 && confirmPassword === password);
  }, [password, confirmPassword]);

  return { passwordError, confirmPasswordError, isFormValid };
};

export default usePasswordValidation;
