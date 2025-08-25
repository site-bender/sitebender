export default function createElement(
	tag: unknown,
	props?: Record<string, unknown> | null,
	...children: unknown[]
): unknown {
	if (typeof tag === "function") {
		const flatChildren = children.flat(Infinity)
		return tag({ ...(props ?? {}), children: flatChildren })
	}

	if (typeof tag === "string") {
		const flatChildren = children.flat(Infinity)
		return {
			type: tag,
			props: {
				...(props ?? {}),
				children: flatChildren.length === 1
					? flatChildren[0]
					: flatChildren,
			},
		}
	}

	return tag
}
