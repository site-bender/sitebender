import type { JsonValue, JsonObject } from "../types/index.ts"

import every from "../../../libraries/toolkit/src/vanilla/array/all/index.ts"
import join from "../../../libraries/toolkit/src/vanilla/array/join/index.ts"
import map from "../../../libraries/toolkit/src/vanilla/array/map/index.ts"
import entries from "../../../libraries/toolkit/src/vanilla/object/entries/index.ts"
import concat from "../../../libraries/toolkit/src/vanilla/string/concat/index.ts"
import isEmpty from "../../../libraries/toolkit/src/vanilla/validation/isEmpty/index.ts"
import isString from "../../../libraries/toolkit/src/vanilla/validation/isString/index.ts"
import formatKey from "../formatKey/index.ts"

//++ Formats a JSON object into markdown
const formatObject = (depth: number) => (formatValue: (value: JsonValue) => string) => (obj: JsonObject): string => {
	const objectEntries = entries(obj)
	
	if (isEmpty(objectEntries)) {
		return "_empty object_"
	}
	
	const isStringEntry = ([, value]: [string, JsonValue]): boolean => isString(value)
	const allStrings = every(isStringEntry)(objectEntries)
	
	if (allStrings) {
		// Use HTML description list
		const formatEntry = ([key, value]: [string, JsonValue]) => {
			const formattedKey = formatKey(key)
			
			return concat("<div>\n")(
				concat("<dt><strong>")(
					concat(formattedKey)(
						concat("</strong></dt>\n")(
							concat("<dd>")(
								concat(String(value))("</dd>\n</div>")
							)
						)
					)
				)
			)
		}
		
		const items = map(formatEntry)(objectEntries)
		const joined = join("\n")(items)
		
		return concat("<dl>\n")(concat(joined)("\n</dl>"))
	}
	
	// Complex object
	const formatEntry = ([key, value]: [string, JsonValue]) => {
		const formattedKey = formatKey(key)
		const formattedValue = formatValue(value)
		
		return concat("**")(concat(formattedKey)(concat("**: ")(formattedValue)))
	}
	
	const formatted = map(formatEntry)(objectEntries)
	
	return join("\n\n")(formatted)
}

export default formatObject

//?? [EXAMPLE]
// formatObject(0)(formatValue)({key: "value"}) // HTML description list