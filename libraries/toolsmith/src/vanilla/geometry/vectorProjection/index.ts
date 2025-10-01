import isNullish from "../../validation/isNullish/index.ts"
import dotProduct from "../dotProduct/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
const vectorProjection = (
	vectorA: Array<number> | null | undefined,
) =>
(
	vectorB: Array<number> | null | undefined,
): Array<number> => {
	if (isNullish(vectorA) || !Array.isArray(vectorA)) {
		return isNullish(vectorB) || !Array.isArray(vectorB)
			? []
			: new Array(vectorB.length).fill(NaN)
	}

	if (isNullish(vectorB) || !Array.isArray(vectorB)) {
		return new Array(vectorA.length).fill(NaN)
	}

	// Check for dimension mismatch
	if (vectorA.length !== vectorB.length) {
		return new Array(Math.max(vectorA.length, vectorB.length)).fill(NaN)
	}

	// Check for empty vectors
	if (vectorA.length === 0) {
		return []
	}

	// Validate all elements are numbers
	if (!vectorA.every((x) => typeof x === "number" && isFinite(x))) {
		return new Array(vectorA.length).fill(NaN)
	}

	if (!vectorB.every((x) => typeof x === "number" && isFinite(x))) {
		return new Array(vectorB.length).fill(NaN)
	}

	// Calculate dot products
	const aDotB = dotProduct(vectorA)(vectorB)
	const bDotB = dotProduct(vectorB)(vectorB)

	// Cannot project onto zero vector
	if (bDotB === 0) {
		return new Array(vectorB.length).fill(NaN)
	}

	// Calculate scalar projection coefficient
	const scalar = aDotB / bDotB

	// Multiply vectorB by scalar to get projection
	return vectorB.map((component) => scalar * component)
}

export default vectorProjection
