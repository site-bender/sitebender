import isMap from "../../predicates/isMap/index.ts"

/*++
 + Checks if a map is empty
 + Returns false if non-map value is passed
 */
export default function isEmpty<K, V>(map: ReadonlyMap<K, V>): boolean {
	/*++
	 + [EXCEPTION] Direct .size access is permitted here because:
	 + - TypeScript guarantees map is ReadonlyMap<K, V>
	 + - Predicates are internal utilities, not user-facing
	 + - No validation needed (type system enforces correctness)
	 + - Runtime isMap check provides defensive safety
	 */
	return isMap(map) && map.size === 0
}
