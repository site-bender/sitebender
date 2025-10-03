import gte from "../../validation/gte/index.ts"
import isInteger from "../../validation/isInteger/index.ts"
import lt from "../../validation/lt/index.ts"
import isNotEmpty from "../isNotEmpty/index.ts"
import length from "../length/index.ts"

//++ Returns the character at the given index in a string
export default function charAt(index: number) {
	if (isInteger(index) && gte(0)(index)) {
		return function charAtIndex(str: string): string | null {
			if (isNotEmpty(str) && lt(length(str))(index)) {
				return str.charAt(index)
			}

			return null
		}
	}

	return null
}
