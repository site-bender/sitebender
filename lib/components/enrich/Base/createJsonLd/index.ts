export default function createJsonLd(
	_type: string,
	props: Record<string, unknown>,
	subtypeProperties: Record<string, unknown> = {},
): Record<string, unknown> {
	// Merge all properties, with subtypeProperties taking precedence
	const allProps = { ...props, ...subtypeProperties }

	// Filter out component-specific properties
	const {
		disableJsonLd: _disableJsonLd,
		_type: _schema,
		subtypeProperties: _subtype,
		...schemaProps
	} = allProps

	// Create the JSON-LD object
	return {
		"@context": "https://schema.org",
		"@type": _type,
		...schemaProps,
	}
}
