// utils/handlers/validateForm.ts

export function validateFormError(errors: Record<string, string>): boolean {
  // Check if any error message exists in the errors object
  const hasError = Object.values(errors).some((error) => error !== "");

  return !hasError; // Returns true if no errors, false if there are errors
}
