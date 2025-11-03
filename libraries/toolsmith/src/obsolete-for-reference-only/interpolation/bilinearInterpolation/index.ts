import isNullish from "../../validation/isNullish/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
const bilinearInterpolation = (
	q00: number | null | undefined,
) =>
(
	q10: number | null | undefined,
) =>
(
	q01: number | null | undefined,
) =>
(
	q11: number | null | undefined,
) =>
(
	x: number | null | undefined,
) =>
(
	y: number | null | undefined,
): number => {
	// Validate corner values
	if (isNullish(q00) || typeof q00 !== "number") {
		return NaN
	}

	if (isNullish(q10) || typeof q10 !== "number") {
		return NaN
	}

	if (isNullish(q01) || typeof q01 !== "number") {
		return NaN
	}

	if (isNullish(q11) || typeof q11 !== "number") {
		return NaN
	}

	// Validate coordinates
	if (isNullish(x) || typeof x !== "number") {
		return NaN
	}

	if (isNullish(y) || typeof y !== "number") {
		return NaN
	}

	// Check bounds [0, 1]
	if (x < 0 || x > 1) {
		return NaN
	}

	if (y < 0 || y > 1) {
		return NaN
	}

	// Bilinear interpolation formula:
	// f(x,y) = (1-x)(1-y)q00 + x(1-y)q10 + (1-x)y*q01 + xy*q11

	// First interpolate in x-direction
	const fx0 = q00 * (1 - x) + q10 * x // Bottom edge
	const fx1 = q01 * (1 - x) + q11 * x // Top edge

	// Then interpolate in y-direction
	return fx0 * (1 - y) + fx1 * y
}

export default bilinearInterpolation
