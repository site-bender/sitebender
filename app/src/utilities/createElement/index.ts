export default function createElement(
	tag: unknown,
	props?: Record<string, unknown> | null,
	...children: unknown[]
): unknown {
	if (typeof tag === "function") {
		// console.group()
		// console.log("tag:", tag.name || tag)
		// console.log("props:", JSON.stringify(props, null, 2))
		// console.groupEnd()
		// Always flatten children completely before passing to function
		const flatChildren = children.flat(Infinity)

		// Also flatten any children prop that was explicitly passed
		if (props?.children) {
			props.children = Array.isArray(props.children)
				? props.children.flat(Infinity)
				: props.children
		}

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
