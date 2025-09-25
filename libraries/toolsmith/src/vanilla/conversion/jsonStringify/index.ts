import type { Value } from "../../../types/index.ts"

import allPass from "../../validation/allPass/index.ts"
import gte from "../../validation/gte/index.ts"
import isInteger from "../../validation/isInteger/index.ts"
import lte from "../../validation/lte/index.ts"

//++ Curried wrapper for JSON.stringify
export default function jsonStringify(indent: number) {
	const indentSpaces: number = allPass([
			isInteger,
			lte<number>(12),
			gte<number>(0),
		])(indent)
		? indent
		: 0

	return function stringifyWithIndent(value: Value): string {
		return JSON.stringify(value, null, indentSpaces)
	}
}
