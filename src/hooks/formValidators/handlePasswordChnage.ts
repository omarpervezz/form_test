import { passwordValidator } from "./passwordValidator";

export function handleChangePassword(
  event: React.ChangeEvent<HTMLInputElement>,
  setPassword: React.Dispatch<React.SetStateAction<string>>,
  setIsValid: React.Dispatch<React.SetStateAction<boolean>>,
  setError: React.Dispatch<React.SetStateAction<string>>,
  errorMessage?: string // Optional custom error message
) {
  const inputPassword = event.target.value;
  setPassword(inputPassword);

  if (passwordValidator(inputPassword)) {
    setIsValid(true);
    setError(""); // Clear error if valid
  } else {
    setIsValid(false);
    setError(
      errorMessage ||
        "Password must contain at least 8 characters, one uppercase, one lowercase, one number, and one special character."
    ); // Default or custom error message
  }
}
