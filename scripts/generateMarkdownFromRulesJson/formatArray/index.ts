import type { JsonValue } from "../types/index.ts"

import all from "../../../libraries/toolsmith/src/vanilla/array/all/index.ts"
import join from "../../../libraries/toolsmith/src/vanilla/array/join/index.ts"
import map from "../../../libraries/toolsmith/src/vanilla/array/map/index.ts"
import concat from "../../../libraries/toolsmith/src/vanilla/string/concat/index.ts"
import repeat from "../../../libraries/toolsmith/src/vanilla/string/repeat/index.ts"
import isEmpty from "../../../libraries/toolsmith/src/vanilla/validation/isEmpty/index.ts"
import isString from "../../../libraries/toolsmith/src/vanilla/validation/isString/index.ts"
import formatComplexItem from "./formatComplexItem/index.ts"

//++ Formats a JSON array into markdown
export default function formatArray(depth: number) {
	return function withFormatter(formatValue: (value: JsonValue) => string) {
		return function formatItems(items: Array<JsonValue>): string {
			if (isEmpty(items)) {
				return "_empty list_"
			}

			const allStrings = all(isString)(items)
			const indent = repeat("  ")(depth)

			if (allStrings) {
				const formatStringItem = (item: JsonValue) => {
					const dash = "- "
					const indentedDash = concat(indent)(dash)

					return concat(indentedDash)(String(item))
				}

				const formatted = map(formatStringItem)(items)

				return join("\n")(formatted)
			}

			// Complex items - numbered list
			const formatter = formatComplexItem(indent, formatValue)
			const formattedItems = map(formatter)(items)

			return join("\n\n")(formattedItems)
		}
	}
}

//?? [EXAMPLE]
// formatArray(0)(formatValue)(["item1", "item2"]) // "- item1\n- item2"
