//++ Type guard that checks if a value is a string primitive (not String object)
export default function isString(value: unknown): value is string {
	return typeof value === "string"
}
