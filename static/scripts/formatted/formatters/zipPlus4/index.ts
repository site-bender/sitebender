/**
 * @name zipPlus4
 * @description Formats a ZIP+4 postal code.
 *
 * @param {string} value - The ZIP+4 postal code to format.
 * @returns {string} The formatted ZIP+4 postal code.
 */
export default function zipPlus4(value: string): string {
  const digitsOnly = value.replace(/\D/g, "").slice(0, 9);
  if (digitsOnly.length > 5) {
    return `${digitsOnly.slice(0, 5)}-${digitsOnly.slice(5)}`;
  }
  return digitsOnly;
}
