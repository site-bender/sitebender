//++ Type guard that checks if a value is a boolean primitive (true or false)
export default function isBoolean(value: unknown): value is boolean {
	return typeof value === "boolean"
}
