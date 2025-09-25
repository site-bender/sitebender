//++ Checks if a Map is empty (has no key-value pairs)
export default function isEmpty<K, V>(map: Map<K, V>): boolean {
	return map.size === 0
}

//?? [EXAMPLE] isEmpty(new Map()) // true
//?? [EXAMPLE] isEmpty(new Map([["a", 1]])) // false
//?? [EXAMPLE] isEmpty(new Map([["x", 10], ["y", 20]])) // false

//?? [GOTCHA] Only works with Map objects, not plain objects
