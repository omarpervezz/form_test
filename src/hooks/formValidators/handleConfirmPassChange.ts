import { confirmPasswordValidator } from "./confirmPasswordChnage";

export function handleConfirmPassChange(
  event: React.ChangeEvent<HTMLInputElement>,
  password: string,
  setConfirmPassword: React.Dispatch<React.SetStateAction<string>>,
  setIsMatch: React.Dispatch<React.SetStateAction<boolean>>,
  setError: React.Dispatch<React.SetStateAction<string>>,
  errorMessage?: string // Optional custom error message
) {
  const inputConfirmPassword = event.target.value;
  setConfirmPassword(inputConfirmPassword);

  if (confirmPasswordValidator(password, inputConfirmPassword)) {
    setIsMatch(true);
    setError(""); // Clear error if passwords match
  } else {
    setIsMatch(false);
    setError(errorMessage || "Passwords do not match."); // Use custom or default error message
  }
}
