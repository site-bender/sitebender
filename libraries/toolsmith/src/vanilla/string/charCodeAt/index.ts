import gte from "../../validation/gte/index.ts"
import isInteger from "../../validation/isInteger/index.ts"
import isNotEmpty from "../isNotEmpty/index.ts"
import length from "../length/index.ts"
import lt from "../../validation/lt/index.ts"

//++ Returns the Unicode code point at the given index in a string
export default function charCodeAt(index: number) {
	if (isInteger(index) && gte(0)(index)) {
		return function charCodeAtIndex(str: string): number | null {
			if (isNotEmpty(str) && lt(length(str))(index)) {
				return str.charCodeAt(index)
			}

			return null
		}
	}

	return null
}
