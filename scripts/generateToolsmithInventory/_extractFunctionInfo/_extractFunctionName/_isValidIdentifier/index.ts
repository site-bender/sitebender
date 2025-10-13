import test from "@sitebender/toolsmith/string/test/index.ts"

/**
 * Check if a string is a valid JavaScript identifier (not a number literal)
 */
export default function _isValidIdentifier(value: string): boolean {
	// Valid identifiers must start with a letter, underscore, or dollar sign
	// This regex checks if the first character is NOT a digit
	return test(/^[a-zA-Z_$]/)(value)
}
