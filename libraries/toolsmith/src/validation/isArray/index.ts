//++ Type guard that checks if a value is an Array using Array.isArray
export default function isArray(value: unknown): value is Array<unknown> {
	return Array.isArray(value)
}
