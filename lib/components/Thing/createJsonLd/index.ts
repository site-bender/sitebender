export default function createJsonLd(
	schemaType: string,
	props: Record<string, unknown>,
	subtypeProperties: Record<string, unknown> = {},
): Record<string, unknown> {
	// Merge all properties, with subtypeProperties taking precedence
	const allProps = { ...props, ...subtypeProperties }

	// Filter out component-specific properties
	const {
		disableJsonLd: _disableJsonLd,
		schemaType: _schema,
		subtypeProperties: _subtype,
		...schemaProps
	} = allProps

	// Create the JSON-LD object
	return {
		"@context": "https://schema.org",
		"@type": schemaType,
		...schemaProps,
	}
}
