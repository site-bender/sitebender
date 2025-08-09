/**
 * Converts a value to a string representation
 * Handles various types including functions, objects, arrays, and primitives
 */
const stringify = (value: any, spaceLength = 2): string => {
	if (value === null) return "null"
	if (value === undefined) return "undefined"
	if (typeof value === "function") return value.toString()
	if (typeof value === "object") {
		try {
			return JSON.stringify(value, null, spaceLength)
		} catch {
			return String(value)
		}
	}
	return String(value)
}

export default stringify
