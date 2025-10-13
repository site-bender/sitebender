import type { JsonObject, JsonValue } from "../types/index.ts"

import isArray from "../../../libraries/toolsmith/src/validation/isArray/index.ts"
import isBoolean from "../../../libraries/toolsmith/src/validation/isBoolean/index.ts"
import isNull from "../../../libraries/toolsmith/src/validation/isNull/index.ts"
import isNumber from "../../../libraries/toolsmith/src/validation/isNumber/index.ts"
import isString from "../../../libraries/toolsmith/src/validation/isString/index.ts"
import formatArray from "../formatArray/index.ts"
import formatObject from "../formatObject/index.ts"

//++ Formats any JSON value into appropriate markdown
export default function formatJsonValue(depth: number = 0) {
	return function formatValue(value: JsonValue): string {
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

		return formatObject(formatJsonValue(depth))(value as JsonObject)
	}
}

//?? [EXAMPLE]
// formatJsonValue(0)("string") // "string"
// formatJsonValue(0)(["a", "b"]) // "- a\n- b"
// formatJsonValue(0)({key: "value"}) // HTML description list
