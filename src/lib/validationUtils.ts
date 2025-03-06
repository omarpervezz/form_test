export interface ValidationConfig {
  minValue: number;
  maxValue: number;
  maxDecimals: number;
  maxDigits: number;
}

export const defaultValidationConfig: ValidationConfig = {
  minValue: 1,
  maxValue: 9999999.99,
  maxDecimals: 2,
  maxDigits: 9,
};

/**
 * Validates a number input based on the given configuration.
 * @param value - The input value to validate.
 * @param config - The validation configuration (default values provided).
 * @returns Error message if invalid, otherwise an empty string.
 */
export const validateNumber = (
  value: string | number,
  config: ValidationConfig = defaultValidationConfig
): string => {
  console.log(value);
  const strValue = String(value).trim();

  // Check for empty or null values
  if (!strValue || value === null || value === undefined) {
    return "Value is required.";
  }

  // Regex for valid number format: Allow decimals with specified decimal places
  const decimalRegex = new RegExp(
    `^\\d{1,${config.maxDigits}}(\\.\\d{1,${config.maxDecimals}})?$`
  );

  if (!decimalRegex.test(strValue)) {
    return `Value must be a valid number with up to ${config.maxDecimals} decimal places.`;
  }

  const numValue = parseFloat(strValue);

  // Prevent leading zeros for numbers >= 1 (e.g., "001", "01" should be invalid, but "0.5" is valid)
  if (/^0\d+/.test(strValue) && !strValue.includes(".")) {
    return "Value cannot have leading zeros when greater than or equal to 1.";
  }

  // Minimum value validation
  if (numValue < config.minValue) {
    return `Value must be greater than ${config.minValue}.`;
  }

  // Maximum value validation
  if (numValue > config.maxValue) {
    return `Value cannot exceed ${config.maxValue}.`;
  }

  // Total digits check (excluding decimal point)
  const digitsOnly = strValue.replace(".", ""); // Remove decimal for digit count
  if (digitsOnly.length > config.maxDigits) {
    return `Value cannot exceed ${config.maxDigits} digits.`;
  }

  // If validation passes, return empty string
  return "";
};
