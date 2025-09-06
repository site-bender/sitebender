export default function createElement(
	tag: unknown,
	props?: Record<string, unknown> | null,
	...children: unknown[]
): unknown {
	if (typeof tag === "function") {
		const flatChildren = children.flat(Infinity)

		// Call the function to see if it has _type (is a metadata component)
		const result = tag({ ...props, children: flatChildren })

		// If this is a metadata component (has _type), process JSX props
		if (result && typeof result === "object" && "_type" in result) {
			const processedProps: Record<string, unknown> = props
				? Object.fromEntries(
					Object.entries(props).map(([key, value]) => (
						key !== "children" && isJSXElement(value)
							? [key, convertJSXToData(value)]
							: [key, value]
					)),
				)
				: {}

			// Re-call with processed props
			return tag({ ...processedProps, children: flatChildren })
		}

		return result
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

function isJSXElement(obj: unknown): obj is { type: unknown; props: unknown } {
	return (
		obj !== undefined &&
		obj !== null &&
		typeof obj === "object" &&
		"type" in obj &&
		"props" in obj
	)
}

function convertJSXToData(
	jsxElement: { type: unknown; props: unknown },
): unknown {
	const { type, props } = jsxElement

	if (typeof type === "function" && isRecord(props)) {
		// Omit specific keys without creating unused bindings
		const omitted = new Set([
			"children",
			"format",
			"element",
			"property",
			"subtypeProperties",
		])
		const entries = Object.entries(props).filter(([k]) => !omitted.has(k))
		const dataProps = Object.fromEntries(entries)
		const subtype = props["subtypeProperties"]
		return {
			...dataProps,
			...(isRecord(subtype) ? subtype : {}),
		}
	}

	return props
}

function isRecord(value: unknown): value is Record<string, unknown> {
	return value !== null && typeof value === "object"
}
