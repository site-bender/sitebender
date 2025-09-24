import type { Value } from "../../../types/index.ts"

import isNullish from "../../validation/isNullish/index.ts"
import sortByKey from "./sortByKey/index.ts"
import map from "../../array/map/index.ts"
import join from "../../array/join/index.ts"
import isArray from "../../validation/isArray/index.ts"
import isObject from "../../validation/isObject/index.ts"
import isEmpty from "../../array/isEmpty/index.ts"
import sort from "../../array/sort/index.ts"
import toString from "../../conversion/castValue/toString/index.ts"
import entries from "../../object/entries/index.ts"

//++ Formats object entries as key: value (here to avoid circular imports)
function formatEntry([key, val]: [string, Value]): string {
	return `${key}:${stringify(val)}`
}

//++ Converts a value to a string similar to JSON.stringify
export default function stringify(value: Value): string {
	// Handle null and undefined
	if (isNullish(value)) {
		return ""
	}

	// Handle arrays
	if (isArray(value)) {
		return join(";")(map(stringify)(value))
	}

	// Handle objects
	if (isObject(value)) {
		// Get entries and sort by key
		const entryList = entries(
			value as Record<string, import("../../../types/index.ts").Value>,
		)

		if (isEmpty(entryList)) {
			return ""
		}

		const sorted = sort(sortByKey)(entryList)

		const mapped = map(formatEntry)(sorted)

		return join(";")(mapped)
	}

	// Handle primitives (string, number, boolean)
	return toString(value)
}
