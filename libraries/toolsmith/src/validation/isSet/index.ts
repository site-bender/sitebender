/*++
 + Type guard that checks if a value is a Set
 */
export default function isSet(value: unknown): value is Set<unknown> {
	return value instanceof Set
}
