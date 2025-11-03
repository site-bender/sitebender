import isNullish from "../../validation/isNullish/index.ts"
import levenshtein from "../levenshtein/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
const similarity = (
	str1: string | null | undefined,
) =>
(
	str2: string | null | undefined,
): number => {
	// Handle null/undefined cases
	if (
		isNullish(str1) || isNullish(str2) || typeof str1 !== "string" ||
		typeof str2 !== "string"
	) {
		return 0
	}

	// Handle empty strings
	if (str1.length === 0 && str2.length === 0) {
		return 100 // Both empty strings are identical
	}

	if (str1.length === 0 || str2.length === 0) {
		return 0 // One empty string means no similarity
	}

	// Calculate Levenshtein distance
	const distance = levenshtein(str1)(str2)

	// Handle the edge case where distance might be Infinity
	if (!isFinite(distance)) {
		return 0
	}

	// Calculate similarity as percentage
	// Similarity = (1 - (distance / maxLength)) * 100
	const maxLength = Math.max(str1.length, str2.length)
	const similarityRatio = 1 - (distance / maxLength)

	// Convert to percentage and ensure it's in range [0, 100]
	const percentage = Math.max(0, Math.min(100, similarityRatio * 100))

	// Round to 2 decimal places for cleaner output
	return Math.round(percentage * 100) / 100
}

export default similarity
