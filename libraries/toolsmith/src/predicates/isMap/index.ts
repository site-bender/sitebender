/*++
 + Type guard that checks if a value is a Map
 */
export default function isMap<
	K extends unknown = unknown,
	V extends unknown = unknown,
>(
	value: unknown,
): value is Map<K, V> {
	//++ [EXCEPTION] instanceof permitted in Toolsmith for performance - provides type predicate wrapper
	return value instanceof Map
}
