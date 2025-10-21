import isNotEmpty from "@sitebender/toolsmith/map/isNotEmpty/index.ts"

/*++
 + Example: Using Map isNotEmpty instead of .size checks
 + Demonstrates consistent API across all collection types
 */
export default function hasCacheEntries<K, V>(
	cache: ReadonlyMap<K, V>,
): boolean {
	/*++
	 + Using `isNotEmpty` for Map
	 + Reads as: "is not empty cache"
	 + Compare to: cache.size > 0 - implementation detail
	 */
	return isNotEmpty(cache)
}
