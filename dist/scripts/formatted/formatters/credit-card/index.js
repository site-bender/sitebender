/**
 * @name creditCard
 * @description Formats a credit card number into groups of four digits separated by spaces.
 *
 * @param {string} value - The credit card number to format.
 * @returns {string} The formatted credit card number.
 */
export default function creditCard(value){
  const digitsOnly = value.replace(/\D/g, "").slice(0, 16);
  const groups = digitsOnly.match(/(\d{1,4})/g) || [];

  return groups.join(" ");
}
