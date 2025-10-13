import type { JsonValue } from "../../types/index.ts"

import concat from "../../../../libraries/toolsmith/src/string/concat/index.ts"

//++ Formats a complex array item with index numbering
export default function formatComplexItem(
	indent: string,
	formatValue: (value: JsonValue) => string,
) {
	return function formatItem(item: JsonValue, index: number): string {
		const formatted = formatValue(item)
		const number = String(index + 1)
		const dot = ". "
		const numberDot = concat(number)(dot)
		const prefix = concat(indent)(numberDot)

		return concat(prefix)(formatted)
	}
}

//?? [EXAMPLE]
// const formatter = formatComplexItem("  ", String)
// formatter({key: "value"}, 0) // "  1. {key: value}"
