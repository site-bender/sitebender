import _serializeExpression from "../index.ts"
import isEqual from "@sitebender/toolsmith/predicates/isEqual/index.ts"

export default function _serializeObjectProperty(prop: unknown): string {
	const propObj = prop as Record<string, unknown>
	const propType = propObj.type as string
	if (isEqual(propType)("KeyValueProperty")) {
		const key = _serializeExpression(propObj.key)
		const value = _serializeExpression(propObj.value)
		return `${key}: ${value}`
	}
	return ""
}
