/**
 * Type guard that checks if a value is not null or undefined
 * 
 * @param value - The value to check
 * @returns True if the value is neither null nor undefined
 * @example
 * ```typescript
 * isNotNullish("hello") // true
 * isNotNullish(0) // true
 * isNotNullish(null) // false
 * isNotNullish(undefined) // false
 * ```
 */
export default function isNotNullish<T>(
	value: T | null | undefined,
): value is T {
	return value !== null && value !== undefined
}
