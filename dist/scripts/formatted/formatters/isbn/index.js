import isbn10 from "../isbn10/index.js";
import isbn13 from "../isbn13/index.js";

export default function isbn (input){
  // Remove all non-digit characters
  const cleanedDigits = input.replace(/\D/g, '');

  // Determine the format based on the rules
  if (cleanedDigits.length === 0) {
    return ''; // No input, return empty string
  }

  // Rule 2, assume ISBN-10
  if (cleanedDigits[0] !== '9') {
    return isbn10(cleanedDigits.slice(0, 10)); // Limit to 10 characters
  }

  // Rule 3, assume ISBN-10
  if (cleanedDigits.length >= 2 && cleanedDigits[1] !== '7') {
    return isbn10(cleanedDigits.slice(0, 10)); // Limit to 10 characters
  }

  // Rule 4, assume ISBN-10
  if (cleanedDigits.length >= 3 && !['8', '9'].includes(cleanedDigits[2])) {
    return isbn10(cleanedDigits.slice(0, 10)); // Limit to 10 characters
  }

  // Rule 5, assume ISBN-13
  if (cleanedDigits.length >= 3 && ['978', '979'].includes(cleanedDigits.slice(0, 3))) {
    return isbn13(cleanedDigits.slice(0, 13)); // Limit to 13 characters
  }

  // If none of the above rules apply, return the cleaned input (wait for more input)
  return cleanedDigits;
};

