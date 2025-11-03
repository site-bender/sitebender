//++ Type guard that checks if a value is an Error object (including subclasses)
export default function isError(value: unknown): value is Error {
	return value instanceof Error
}
