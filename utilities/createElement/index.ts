export default function createElement(
	tag: unknown,
	props?: Record<string, unknown> | null,
	...children: unknown[]
): unknown {
	// DEBUG: Log all createElement calls for components
	// if (typeof tag === "function" && tag.name) {
	// 	console.log(`DEBUG createElement - ${tag.name}:`, {
	// 		props: props || {},
	// 		children: children,
	// 		childrenLength: children.length,
	// 	})
	// }

	if (typeof tag === "function") {
		// Always flatten children completely before passing to function
		const flatChildren = children.flat(Infinity)

		// Also flatten any children prop that was explicitly passed
		if (props?.children) {
			props.children = Array.isArray(props.children)
				? props.children.flat(Infinity)
				: props.children
		}

		// console.log(`DEBUG createElement - ${tag.name} DOUBLE flattened:`, {
		// 	originalChildren: children,
		// 	flatChildren,
		// 	propsChildren: props?.children,
		// })

		return tag({ ...props, children: flatChildren })
	}

	if (typeof tag === "string") {
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
