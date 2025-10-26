/*++
 + Type guard that checks if a value is a Set
 */
export default function isSet<T>(value: unknown): value is Set<T> {
	return value instanceof Set
}
