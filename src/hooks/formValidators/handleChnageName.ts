import { nameValidator } from "./nameValidator";

export function handleChangeName(
  event: React.ChangeEvent<HTMLInputElement>,
  setName: React.Dispatch<React.SetStateAction<string>>,
  setIsValid: React.Dispatch<React.SetStateAction<boolean>>,
  setError: React.Dispatch<React.SetStateAction<string>>,
  errorMessage: string = "Name must contain only letters and be at least 2 characters long.",
  isOptional: boolean = false // Allow empty values if true
) {
  const inputName = event.target.value.trim(); // Trim spaces
  setName(inputName);

  if (isOptional && inputName === "") {
    // ✅ Allow empty values when isOptional = true
    setIsValid(true);
    setError(""); // Clear error
    return;
  }

  if (nameValidator(inputName)) {
    setIsValid(true);
    setError(""); // Clear error if valid
  } else {
    setIsValid(false);
    setError(errorMessage); // Use custom or default error message
  }
}
