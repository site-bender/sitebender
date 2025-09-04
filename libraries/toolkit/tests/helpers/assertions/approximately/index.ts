/**
 * Tests approximate equality for floating-point numbers
 *
 * Handles special cases like NaN, Infinity, and null/undefined.
 * Uses a small epsilon value to account for floating-point precision errors.
 *
 * @param a - First number to compare
 * @param b - Second number to compare
 * @param epsilon - Maximum allowed difference (default 1e-10)
 * @returns true if numbers are approximately equal
 */
import isNullish from "@sitebender/toolkit/simple/validation/isNullish/index.ts"

const approximately = (
	a: number | null | undefined,
	b: number | null | undefined,
	epsilon = 1e-10,
): boolean => {
	// Handle null/undefined cases
	if (isNullish(a) || isNullish(b)) {
		return a === b
	}

	// Both NaN should be considered equal
	if (Number.isNaN(a) && Number.isNaN(b)) {
		return true
	}

	// Handle infinite values
	if (!Number.isFinite(a) || !Number.isFinite(b)) {
		return a === b
	}

	// Check if difference is within epsilon
	return Math.abs(a - b) < epsilon
}

export default approximately
