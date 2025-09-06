/**
 * Converts a value to its string representation for test code
 * @param value Value to convert to string
 * @returns String representation of the value
 */
export default function valueToString(value: unknown): string {
	if (value === null) return "null"
	if (value === undefined) return "undefined"
	if (typeof value === "string") return `"${value}"`
	if (typeof value === "number") return String(value)
	if (typeof value === "boolean") return String(value)
	if (typeof value === "function") {
		// Handle common function patterns
		if (value.toString().includes("=> x")) {
			return "(x: unknown) => x" // Identity function
		}
		return value.toString()
	}
	if (Array.isArray(value)) {
		return `[${value.map((v) => valueToString(v)).join(", ")}]`
	}
	if (typeof value === "object") {
		const entries = Object.entries(value).map(
			([k, v]) => `${k}: ${valueToString(v)}`,
		)
		return `{ ${entries.join(", ")} }`
	}
	return String(value)
}
