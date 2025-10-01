//++ Type guard that checks if a value is a non-null object (includes arrays, functions, dates, etc.)
export default function isObject(value: unknown): value is object {
	return value !== null &&
		(typeof value === "object" || typeof value === "function")
}
