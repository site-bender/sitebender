import type { JsonValue } from "../../types/index.ts"

import pipe from "../../../../libraries/toolsmith/src/combinator/pipe/index.ts"
import concat from "../../../../libraries/toolsmith/src/string/concat/index.ts"
import concatTo from "../../../../libraries/toolsmith/src/string/concatTo/index.ts"
import isArray from "../../../../libraries/toolsmith/src/validation/isArray/index.ts"
import formatKey from "../../formatKey/index.ts"

//++ Formats an object entry as markdown with bold key
export default function formatObjectEntry(
	formatValue: (value: JsonValue) => string,
) {
	return function formatEntry([key, value]: [string, JsonValue]): string {
		const formattedKey = formatKey(key)
		const formattedValue = formatValue(value)

		// Arrays should start on a new line
		const separator = isArray(value) ? "**:\n" : "**: "

		return pipe([
			concat("**"),
			concatTo(separator),
			concatTo(formattedValue),
		])(formattedKey)
	}
}

//?? [EXAMPLE]
// const formatter = formatObjectEntry((v) => String(v))
// formatter(["testKey", "testValue"]) // "**Test key**: testValue"
