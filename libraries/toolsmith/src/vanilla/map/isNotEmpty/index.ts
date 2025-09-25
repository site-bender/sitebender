//++ Checks if a Map is not empty (has at least one key-value pair)
export default function isNotEmpty<K, V>(map: Map<K, V>): boolean {
	return map instanceof Map && map.size > 0
}

//?? [EXAMPLE] isNotEmpty(new Map()) // false
//?? [EXAMPLE] isNotEmpty(new Map([["key", "value"]])) // true
//?? [EXAMPLE] isNotEmpty(new Map([[1, undefined]])) // true (has one entry)
