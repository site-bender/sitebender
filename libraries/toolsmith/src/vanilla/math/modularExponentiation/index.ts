import isNullish from "../../validation/isNullish/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
const modularExponentiation = (
	base: number | null | undefined,
) =>
(
	exponent: number | null | undefined,
) =>
(
	modulus: number | null | undefined,
): number => {
	if (isNullish(base) || typeof base !== "number") {
		return NaN
	}

	if (isNullish(exponent) || typeof exponent !== "number") {
		return NaN
	}

	if (isNullish(modulus) || typeof modulus !== "number") {
		return NaN
	}

	// Check for non-integers
	if (
		!Number.isInteger(base) || !Number.isInteger(exponent) ||
		!Number.isInteger(modulus)
	) {
		return NaN
	}

	// Check for negative exponent
	if (exponent < 0) {
		return NaN
	}

	// Check for non-positive modulus
	if (modulus <= 0) {
		return NaN
	}

	// Handle edge cases
	if (modulus === 1) {
		return 0
	}

	if (exponent === 0) {
		return 1
	}

	// Normalize base to be positive within modulus range
	const normalizedBase = base % modulus < 0
		? (base % modulus) + modulus
		: base % modulus

	// Binary exponentiation algorithm (recursive functional approach)
	const binaryPower = (
		result: number,
		currentBase: number,
		currentExp: number,
	): number => {
		if (currentExp === 0) {
			return result
		}

		const newResult = currentExp % 2 === 1
			? (result * currentBase) % modulus
			: result

		return binaryPower(
			newResult,
			(currentBase * currentBase) % modulus,
			Math.floor(currentExp / 2),
		)
	}

	return binaryPower(1, normalizedBase, exponent)
}

export default modularExponentiation
