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

//?? [EXAMPLE] isBlank("") // true
//?? [EXAMPLE] isBlank("   ") // true
//?? [EXAMPLE] isBlank("\t\t") // true
//?? [EXAMPLE] isBlank("hello") // false
//?? [EXAMPLE] isBlank("  hello  ") // false
//?? [EXAMPLE] isBlank(null) // true
//?? [EXAMPLE] isBlank(undefined) // true
/*??
 | [EXAMPLE]
 | // Form validation
 | const validateInput = (input: string) => {
 |   if (isBlank(input)) {
 |     return "Field is required"
 |   }
 |   return null
 | }
 | validateInput("   ")     // "Field is required"
 | validateInput("John")    // null
 |
 | // Filter blank lines
 | const lines = ["hello", "", "  ", "world", "\t", "!"]
 | const meaningful = lines.filter(line => !isBlank(line))
 | // ["hello", "world", "!"]
 |
 | [GOTCHA] Converts non-strings to strings before checking
 | [GOTCHA] Uses trim() so any whitespace-only string is blank
 | [PRO] Handles Unicode whitespace characters
 |
*/
