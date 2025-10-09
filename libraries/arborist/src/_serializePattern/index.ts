//++ Serialize a pattern node (used in function parameters, destructuring)
export default function _serializePattern(node: unknown): string {
	if (!node) {
		return ""
	}

	const nodeObj = node as Record<string, unknown>
	const nodeType = nodeObj.type as string

	switch (nodeType) {
		case "Identifier":
			return nodeObj.value as string
		case "RestElement": {
			const argument = _serializePattern(nodeObj.argument)
			return `...${argument}`
		}
		case "ArrayPattern": {
			const elements = nodeObj.elements as Array<unknown>
			const serialized = elements.map(_serializePattern).join(", ")
			return `[${serialized}]`
		}
		case "ObjectPattern": {
			const properties = nodeObj.properties as Array<Record<string, unknown>>
			const serialized = properties.map((prop) => {
				if (prop.type === "KeyValuePatternProperty") {
					const key = _serializePattern(prop.key)
					const value = _serializePattern(prop.value)
					return `${key}: ${value}`
				}
				return ""
			}).filter(Boolean).join(", ")
			return `{ ${serialized} }`
		}
		default:
			return `<${nodeType}>`
	}
}
