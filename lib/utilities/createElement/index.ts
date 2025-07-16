export default function createElement(
	tag: unknown,
	props?: Record<string, unknown> | null,
	...children: unknown[]
): unknown {
	if (typeof tag === "function") {
		return tag({ ...props, children })
	}

	if (typeof tag === "string") {
		// Always create virtual elements for renderToString compatibility
		// This works for both server-side rendering and client-side when we just need HTML
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
