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
			let processedProps = props ? { ...props } : {}

			// Convert JSX elements in props to their data objects
			if (props) {
				for (const [key, value] of Object.entries(props)) {
					if (key !== "children" && isJSXElement(value)) {
						// Convert JSX element to data object
						processedProps[key] = convertJSXToData(value)
					}
				}
			}

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

	if (typeof type === "function" && props && typeof props === "object") {
		const {
			children,
			format,
			element,
			property,
			subtypeProperties,
			...dataProps
		} = props as any

		// Spread subtypeProperties into the main props
		return {
			...dataProps,
			...(subtypeProperties || {}),
		}
	}

	return props
}
