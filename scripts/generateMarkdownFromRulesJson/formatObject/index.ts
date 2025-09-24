import type { JsonObject, JsonValue } from "../types/index.ts"

import all from "../../../libraries/toolsmith/src/vanilla/array/all/index.ts"
import join from "../../../libraries/toolsmith/src/vanilla/array/join/index.ts"
import map from "../../../libraries/toolsmith/src/vanilla/array/map/index.ts"
import pipe from "../../../libraries/toolsmith/src/vanilla/combinator/pipe/index.ts"
import entries from "../../../libraries/toolsmith/src/vanilla/object/entries/index.ts"
import concat from "../../../libraries/toolsmith/src/vanilla/string/concat/index.ts"
import concatTo from "../../../libraries/toolsmith/src/vanilla/string/concatTo/index.ts"
import isEmpty from "../../../libraries/toolsmith/src/vanilla/validation/isEmpty/index.ts"
import isString from "../../../libraries/toolsmith/src/vanilla/validation/isString/index.ts"
import formatHtmlDescriptionListEntry from "./formatHtmlDescriptionListEntry/index.ts"
import formatObjectEntry from "./formatObjectEntry/index.ts"

//++ Formats a JSON object into markdown
export default function formatObject(
	formatValue: (value: JsonValue) => string,
) {
	return function formatObjectContent(obj: JsonObject): string {
		const objectEntries = entries(obj)

		if (isEmpty(objectEntries)) {
			return "_empty object_"
		}

		function isStringEntry([, value]: [string, JsonValue]): boolean {
			return isString(value)
		}

		const allStrings = all(isStringEntry)(objectEntries)

		if (allStrings) {
			// Use HTML description list for all-string objects
			const stringEntries = objectEntries as Array<[string, string]>

			return pipe([
				map(formatHtmlDescriptionListEntry),
				join("\n"),
				concat("<dl>\n"),
				concatTo("\n</dl>"),
			])(stringEntries)
		}

		// Complex object with mixed types
		const formatter = formatObjectEntry(formatValue)

		return pipe([
			map(formatter),
			join("\n\n"),
		])(objectEntries)
	}
}

//?? [EXAMPLE]
// formatObject(formatValue)({key: "value"}) // HTML description list
