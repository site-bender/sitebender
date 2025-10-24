import isString from "../../../predicates/isString/index.ts"

//++ Private helper that trims whitespace from string, or returns input unchanged if not a string
export default function _trimString(input: string): string {
	// Happy path: input is valid string, trim it
	if (isString(input)) {
		/*++
		 + [EXCEPTION] .trim is permitted here for performance reasons
		 + This is the ONLY place .trim should be used
		 + Everywhere else, use the `trim` function instead
		 */
		return input.trim()
	}

	// Fallback: return input unchanged
	return input
}
