//++ Type guard that checks if a value is defined (not undefined)
export default function isDefined<T extends unknown = unknown>(
	value?: T | null,
): value is T {
	return value !== undefined
}
