export default function createElement(
	tag: unknown,
	props?: Record<string, unknown> | null,
	...children: unknown[]
): unknown {
	// DEBUG: Log all createElement calls
	if (typeof tag === "function" && tag.name) {
		console.log(`DEBUG createElement - ${tag.name}:`, {
			props: props || {},
			children: children,
			childrenLength: children.length,
		})
	}

	if (typeof tag === "function") {
		return tag({ ...props, children })
	}

	if (typeof tag === "string") {
		return {
			type: tag,
			props: {
				...props,
				children: children.length === 1 ? children[0] : children,
			},
		}
	}

	return tag
}
