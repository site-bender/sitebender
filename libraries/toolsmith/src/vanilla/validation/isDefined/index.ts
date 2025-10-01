//++ Type guard that checks if a value is defined (not null or undefined)
export default function isDefined<T>(value: T | null | undefined): value is T {
	return value !== null && value !== undefined
}
