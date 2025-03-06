import { emailValidator } from "./emailValidator";

export function handleChangeEmail(
  event: React.ChangeEvent<HTMLInputElement>,
  setEmail: React.Dispatch<React.SetStateAction<string>>,
  setIsValid: React.Dispatch<React.SetStateAction<boolean>>,
  setError: React.Dispatch<React.SetStateAction<string>>,
  errorMessage?: string, // Optional custom error message
  isOptional: boolean = false // New parameter to allow empty values
) {
  const inputEmail = event.target.value.trim(); // Trim spaces
  setEmail(inputEmail);

  if (isOptional && inputEmail === "") {
    // ✅ Allow empty values when isOptional = true
    setIsValid(true);
    setError(""); // Clear error
    return;
  }

  if (emailValidator(inputEmail)) {
    setIsValid(true);
    setError(""); // Clear error if valid
  } else {
    setIsValid(false);
    setError(errorMessage || "Invalid email format."); // Use custom or default error message
  }
}
