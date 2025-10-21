/*++
 + Type guard that checks if a value is a Map
 */
export default function isMap(value: unknown): value is Map<unknown, unknown> {
	return value instanceof Map
}
