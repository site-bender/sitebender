import type { Value } from "../../types/index.ts"

/*++
 + Type guard that checks if a value is a Map
 */
export default function isMap<K extends Value = Value, V extends Value = Value>(
	value: Value,
): value is Map<K, V> {
	return value instanceof Map
}
