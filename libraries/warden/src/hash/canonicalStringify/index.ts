//++ Generate deterministic JSON string from any data structure
//++
//++ Ensures consistent serialization by:
//++ - Sorting object keys alphabetically (recursively)
//++ - Using consistent spacing (2-space indentation)
//++ - Handling nested structures deterministically
//++
//++ This enables cryptographic hashing of data structures where
//++ key order should not affect the hash value.
//++
//++ Examples:
//++   canonicalStringify({ b: 2, a: 1 }) === canonicalStringify({ a: 1, b: 2 })
//++   // Both produce: '{\n  "a": 1,\n  "b": 2\n}'
//++
//++ Pure function with no side effects - same input always produces same output

export default function canonicalStringify(data: unknown): string {
	return JSON.stringify(canonicalizeData(data), null, 2)
}

function canonicalizeData(data: unknown): unknown {
	if (data === null || data === undefined) {
		return data
	}

	if (typeof data !== "object") {
		return data
	}

	if (Array.isArray(data)) {
		return data.map(function canonicalizeArrayItem(item: unknown) {
			return canonicalizeData(item)
		})
	}

	const keys = Object.keys(data).sort()
	return keys.reduce(
		function buildSortedObject(
			acc: Record<string, unknown>,
			key: string,
		): Record<string, unknown> {
			return {
				...acc,
				[key]: canonicalizeData((data as Record<string, unknown>)[key]),
			}
		},
		{} as Record<string, unknown>,
	)
}
