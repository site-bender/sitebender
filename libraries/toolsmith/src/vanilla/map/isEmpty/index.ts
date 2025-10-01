//++ Checks if a Map is empty (has no key-value pairs)
export default function isEmpty<K, V>(map: Map<K, V>): boolean {
	return map.size === 0
}
