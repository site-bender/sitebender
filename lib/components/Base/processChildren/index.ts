export default function processChildren(
	children?: unknown[],
): Record<string, unknown> {
	if (!children || !Array.isArray(children)) return {}

	return children.reduce((acc, child) => {
		// If this is an unrendered JSX element, render it first
		if (
			child && typeof child === "object" && "type" in child && "props" in child
		) {
			const { type, props } = child as {
				type: Function
				props: Record<string, unknown>
			}

			if (typeof type === "function") {
				// Render the component to get its actual props
				const renderedChild = type(props)
				// The rendered result should be a Base component with the actual props
				if (
					renderedChild && typeof renderedChild === "object" &&
					"props" in renderedChild
				) {
					const childProps = (renderedChild as any).props.props as Record<
						string,
						unknown
					>
					const property = childProps.property as string

					if (property) {
						const { property: _, schemaType, element, format, ...schemaData } =
							childProps
						return {
							...acc,
							[property]: schemaData,
						}
					}
				}
			}
		}

		return acc
	}, {})
}
