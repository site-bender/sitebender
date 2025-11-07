import type { PrintableCharacter } from "../../types/index.ts"

import betweenInclusive from "../../validation/betweenInclusive/index.ts"
import charCodeAt from "../../string/charCodeAt/index.ts"
import isString from "../isString/index.ts"

import {
	PRINTABLE_CHARACTER_MAX_CODE as MAX,
	PRINTABLE_CHARACTER_MIN_CODE as MIN,
} from "../../constants/index.ts"

//++ Type guard that checks if a value is a single ASCII printable character
export default function isPrintableCharacter(
	value: unknown,
): value is PrintableCharacter {
	if (isString(value)) {
		/*++
		 + [EXCEPTION] Uses .length property to check for single character
		 + No Toolsmith function exists for this check
		 */
		if (value.length !== 1) {
			return false
		}

		const charCode = charCodeAt(0)(value)

		//++ ASCII printable characters
		return betweenInclusive(MIN)(MAX)(charCode)
	}

	return false
}
