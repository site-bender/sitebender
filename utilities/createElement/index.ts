export default function createElement(
	tag: unknown,
	props?: Record<string, unknown> | null,
	...children: unknown[]
): unknown {
	// DEBUG: Log all createElement calls for components
	if (typeof tag === "function" && tag.name) {
		console.log(`DEBUG createElement - ${tag.name}:`, {
			props: props || {},
			children: children,
			childrenLength: children.length,
		})
	}

	if (typeof tag === "function") {
		// Flatten children to ANY depth using built-in method
		const flatChildren = children.flat(Infinity)

		console.log(`DEBUG createElement - ${tag.name} flattened children:`, {
			original: children,
			flattened: flatChildren,
			flattenedLength: flatChildren.length,
		})

		return tag({ ...props, children: flatChildren })
	}

	if (typeof tag === "string") {
		// Also flatten children for string elements (HTML tags)
		const flatChildren = children.flat(Infinity)

		return {
			type: tag,
			props: {
				...props,
				children: flatChildren.length === 1 ? flatChildren[0] : flatChildren,
			},
		}
	}

	return tag
}
