import isNullish from "../../validation/isNullish/index.ts"

//++ True mathematical modulo; adjusts remainder sign; returns NaN on invalid input
//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
const modulo = (
	divisor: number | null | undefined,
) =>
(
	dividend: number | null | undefined,
): number => {
	if (isNullish(divisor) || typeof divisor !== "number") {
		return NaN
	}

	if (isNullish(dividend) || typeof dividend !== "number") {
		return NaN
	}

	// Check for NaN inputs
	if (isNaN(divisor) || isNaN(dividend)) {
		return NaN
	}

	// Division by zero
	if (divisor === 0) {
		return NaN
	}

	// Handle special cases
	if (!isFinite(dividend)) {
		return NaN
	}

	// deno-coverage-ignore-start The else branch is unreachable: NaN already handled on line 269
	if (!isFinite(divisor)) {
		if (divisor === Infinity || divisor === -Infinity) {
			return dividend
		}
		return NaN
	}
	// deno-coverage-ignore-stop

	// True mathematical modulo (always returns non-negative for positive divisor)
	// This differs from JavaScript's % operator which returns remainder
	const remainder = dividend % divisor

	// If remainder and divisor have different signs, adjust the result
	if ((remainder < 0 && divisor > 0) || (remainder > 0 && divisor < 0)) {
		return remainder + divisor
	}

	return remainder
}

export default modulo

//?? [EXAMPLE] modulo(3)(-10) // 2
//?? [EXAMPLE] modulo(0)(10) // NaN
