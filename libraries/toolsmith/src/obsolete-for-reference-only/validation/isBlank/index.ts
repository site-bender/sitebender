import isNullish from "../isNullish/index.ts"

//++ Checks if a string is empty or contains only whitespace
export default function isBlank(
	str: string | null | undefined,
): boolean {
	if (isNullish(str)) {
		return true
	}

	if (typeof str !== "string") {
		// Convert to string for non-string values
		str = String(str)
	}

	// Check if string is empty or contains only whitespace
	// \s matches all whitespace characters including Unicode spaces
	return str.trim().length === 0
}
