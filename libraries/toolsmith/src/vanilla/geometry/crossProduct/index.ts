//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
import isNullish from "../../validation/isNullish/index.ts"

const crossProduct = (
	a: number[] | null | undefined,
) =>
(
	b: number[] | null | undefined,
): number[] => {
	if (isNullish(a) || !Array.isArray(a)) {
		return [NaN, NaN, NaN]
	}

	if (isNullish(b) || !Array.isArray(b)) {
		return [NaN, NaN, NaN]
	}

	// Must be 3D vectors
	if (a.length !== 3 || b.length !== 3) {
		return [NaN, NaN, NaN]
	}

	// Check for non-numeric values
	const isValidVector = (v: number[]) =>
		v.every((comp) => !isNullish(comp) && typeof comp === "number")

	if (!isValidVector(a) || !isValidVector(b)) {
		return [NaN, NaN, NaN]
	}

	// Calculate cross product: a × b
	// [a₁, a₂, a₃] × [b₁, b₂, b₃] =
	// [a₂b₃ - a₃b₂, a₃b₁ - a₁b₃, a₁b₂ - a₂b₁]
	return [
		a[1] * b[2] - a[2] * b[1],
		a[2] * b[0] - a[0] * b[2],
		a[0] * b[1] - a[1] * b[0],
	]
}

export default crossProduct
