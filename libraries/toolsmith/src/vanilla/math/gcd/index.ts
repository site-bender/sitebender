import isNullish from "../../validation/isNullish/index.ts"

//++ Calculates the greatest common divisor (GCD) of two integers; returns NaN on invalid input
//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
const gcd = (
	a: number | null | undefined,
) =>
(
	b: number | null | undefined,
): number => {
	if (isNullish(a) || typeof a !== "number") {
		return NaN
	}

	if (isNullish(b) || typeof b !== "number") {
		return NaN
	}

	// Check for non-integers
	if (!Number.isInteger(a) || !Number.isInteger(b)) {
		return NaN
	}

	// Use absolute values
	let x = Math.abs(a)
	let y = Math.abs(b)

	// GCD(0, 0) is undefined
	if (x === 0 && y === 0) {
		return NaN
	}

	// Euclidean algorithm
	while (y !== 0) {
		const temp = y
		y = x % y
		x = temp
	}

	return x
}

export default gcd
