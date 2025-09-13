import type { JsonValue, JsonObject } from "../types/index.ts"

import formatArray from "../formatArray/index.ts"
import formatObject from "../formatObject/index.ts"
import isArray from "../../../libraries/toolkit/src/vanilla/validation/isArray/index.ts"
import isBoolean from "../../../libraries/toolkit/src/vanilla/validation/isBoolean/index.ts"
import isNull from "../../../libraries/toolkit/src/vanilla/validation/isNull/index.ts"
import isNumber from "../../../libraries/toolkit/src/vanilla/validation/isNumber/index.ts"
import isString from "../../../libraries/toolkit/src/vanilla/validation/isString/index.ts"

//++ Formats any JSON value into appropriate markdown
const formatJsonValue = (depth: number = 0) => (value: JsonValue): string => {
	if (isNull(value)) {
		return "_null_"
	}
	
	if (isString(value)) {
		return value
	}
	
	if (isNumber(value) || isBoolean(value)) {
		return String(value)
	}
	
	if (isArray(value)) {
		return formatArray(depth)(formatJsonValue(depth))(value)
	}
	
	return formatObject(depth)(formatJsonValue(depth))(value as JsonObject)
}

export default formatJsonValue

//?? [EXAMPLE]
// formatJsonValue(0)("string") // "string"
// formatJsonValue(0)(["a", "b"]) // "- a\n- b"
// formatJsonValue(0)({key: "value"}) // HTML description list