import type { JsonValue } from "../types/index.ts"

import every from "../../../libraries/toolkit/src/vanilla/array/all/index.ts"
import join from "../../../libraries/toolkit/src/vanilla/array/join/index.ts"
import map from "../../../libraries/toolkit/src/vanilla/array/map/index.ts"
import concat from "../../../libraries/toolkit/src/vanilla/string/concat/index.ts"
import repeat from "../../../libraries/toolkit/src/vanilla/string/repeat/index.ts"
import isEmpty from "../../../libraries/toolkit/src/vanilla/validation/isEmpty/index.ts"
import isString from "../../../libraries/toolkit/src/vanilla/validation/isString/index.ts"

//++ Formats a JSON array into markdown
const formatArray = (depth: number) => (formatValue: (value: JsonValue) => string) => (items: Array<JsonValue>): string => {
	if (isEmpty(items)) {
		return "_empty list_"
	}
	
	const allStrings = every(isString)(items)
	const indent = repeat("  ")(depth)
	
	if (allStrings) {
		const formatted = map((item: JsonValue) => 
			concat(indent)(concat("- ")(String(item)))
		)(items)
		
		return join("\n")(formatted)
	}
	
	// Complex items - numbered list
	const formattedItems = map((item: JsonValue, index: number) => {
		const formatted = formatValue(item)
		const prefix = concat(indent)(concat(String(index + 1))(". "))
		
		return concat(prefix)(formatted)
	})(items)
	
	return join("\n\n")(formattedItems)
}

export default formatArray

//?? [EXAMPLE]
// formatArray(0)(formatValue)(["item1", "item2"]) // "- item1\n- item2"