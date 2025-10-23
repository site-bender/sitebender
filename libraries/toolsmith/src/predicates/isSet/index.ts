import type { Value } from "../../types/index.ts"

/*++
 + Type guard that checks if a value is a Set
 */
export default function isSet<T extends Value = Value>(value: Value): value is Set<T> {
	return value instanceof Set
}
