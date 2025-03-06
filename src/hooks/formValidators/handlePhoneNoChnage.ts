import { phoneValidator } from "./phoneValidator";

export function handleChangePhone(
  event: React.ChangeEvent<HTMLInputElement>,
  setPhone: React.Dispatch<React.SetStateAction<string>>,
  setIsValid: React.Dispatch<React.SetStateAction<boolean>>,
  setError: React.Dispatch<React.SetStateAction<string>>,
  errorMessage?: string, // Optional custom error message
  isOptional: boolean = false // New parameter to allow empty values
) {
  const inputPhone = event.target.value.trim(); // Trim spaces
  setPhone(inputPhone);

  if (isOptional && inputPhone === "") {
    // ✅ Allow empty values when isOptional = true
    setIsValid(true);
    setError(""); // Clear error
    return;
  }

  if (phoneValidator(inputPhone)) {
    setIsValid(true);
    setError(""); // Clear error if valid
  } else {
    setIsValid(false);
    setError(errorMessage || "Invalid phone number format."); // Use custom or default error message
  }
}
