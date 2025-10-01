import isNullish from "../../validation/isNullish/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
const levenshtein = (
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
		return Infinity
	}

	// Handle empty strings
	if (str1.length === 0) return str2.length
	if (str2.length === 0) return str1.length

	// Create matrix for dynamic programming
	// We only need two rows at a time, so optimize space
	const prevRow = new Array(str2.length + 1)
	const currRow = new Array(str2.length + 1)

	// Initialize first row (transforming empty string to str2)
	for (let j = 0; j <= str2.length; j++) {
		prevRow[j] = j
	}

	// Fill the matrix
	for (let i = 1; i <= str1.length; i++) {
		// First column (transforming empty string to str1[0..i])
		currRow[0] = i

		for (let j = 1; j <= str2.length; j++) {
			// Cost of substitution (0 if characters match, 1 if different)
			const cost = str1[i - 1] === str2[j - 1] ? 0 : 1

			// Take minimum of:
			// - Deletion: prevRow[j] + 1
			// - Insertion: currRow[j - 1] + 1
			// - Substitution: prevRow[j - 1] + cost
			currRow[j] = Math.min(
				prevRow[j] + 1, // deletion
				currRow[j - 1] + 1, // insertion
				prevRow[j - 1] + cost, // substitution
			)
		}

		// Swap rows for next iteration
		for (let j = 0; j <= str2.length; j++) {
			prevRow[j] = currRow[j]
		}
	}

	// The final answer is in the last cell
	return currRow[str2.length]
}

export default levenshtein
