//++ Serialize a pattern node (used in function parameters, destructuring)
import map from "@sitebender/toolsmith/array/map/index.ts"
import getOrElse from "@sitebender/toolsmith/monads/result/getOrElse/index.ts"
import _serializeProperty from "./_serializeProperty/index.ts"

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
			const serializedPropsResult = map(_serializeProperty)(properties)
			const serializedProps = getOrElse([] as ReadonlyArray<string>)(
				serializedPropsResult,
			)
			const serialized = serializedProps.filter(Boolean).join(", ")
			return `{ ${serialized} }`
		}
		default:
			return `<${nodeType}>`
	}
}
