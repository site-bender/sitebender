import isNullish from "../../validation/isNullish/index.ts"
import gcd from "../gcd/index.ts"

//++ Calculates the least common multiple (LCM) of two integers; returns NaN on invalid input
//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
const lcm = (
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

	// LCM is undefined for zero
	if (a === 0 || b === 0) {
		return NaN
	}

	// Calculate LCM using GCD
	const divisor = gcd(a)(b)
	// deno-coverage-ignore-start - Defensive check: gcd handles all edge cases, won't return NaN or 0 for valid integer inputs
	if (isNaN(divisor) || divisor === 0) {
		return NaN
	}
	// deno-coverage-ignore-stop

	// LCM(a,b) = |a × b| / GCD(a,b)
	return Math.abs(a * b) / divisor
}

export default lcm

//?? [EXAMPLE] lcm(4)(6) // 12
//?? [EXAMPLE] lcm(5)(20) // 20
//?? [EXAMPLE] lcm(0)(5) // NaN
