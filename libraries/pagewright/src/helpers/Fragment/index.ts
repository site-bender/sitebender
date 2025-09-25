export default function Fragment(
	{ children }: { children?: unknown | unknown[] },
): unknown {
	// If children is an array, flatten it completely
	if (Array.isArray(children)) {
		const flattened = children.flat(Infinity)
		return flattened.length === 1 ? flattened[0] : flattened
	}

	return children
}
