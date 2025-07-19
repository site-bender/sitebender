export default function extractPropsFromComponent(
	component: any,
): Record<string, unknown> {
	if (Array.isArray(component)) {
		const jsonLdScript = component.find(
			(el: any) =>
				el.type === "script" &&
				el.props?.type === "application/ld+json",
		)

		if (jsonLdScript && jsonLdScript.props?.children) {
			try {
				const jsonData = JSON.parse(jsonLdScript.props.children)
				const { "@context": context, "@type": type, ...actualProps } = jsonData
				return actualProps
			} catch (e) {
				console.warn("Failed to parse JSON-LD:", e)
				return {}
			}
		}
	}

	return component.props || {}
}
