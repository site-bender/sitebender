import _serializePattern from "../index.ts"
import isEqual from "@sitebender/toolsmith/predicates/isEqual/index.ts"

export default function _serializeProperty(prop: unknown): string {
	const propObj = prop as Record<string, unknown>
	if (isEqual(propObj.type)("KeyValuePatternProperty")) {
		const key = _serializePattern(propObj.key)
		const value = _serializePattern(propObj.value)
		return `${key}: ${value}`
	}
	return ""
}
