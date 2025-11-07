import type {
	DateInput,
	PlainDateLike,
} from "../../../../types/temporal/index.ts"

import and from "../../../logic/and/index.ts"
import isEmpty from "../../../string/isEmpty/index.ts"
import trim from "../../../string/trim/index.ts"
import allPass from "../../../validation/allPass/index.ts"
import hasMethod from "../../../validation/hasMethod/index.ts"
import hasProperty from "../../../validation/hasProperty/index.ts"
import isDate from "../../../validation/isDate/index.ts"
import isFunction from "../../../validation/isFunction/index.ts"
import isNullish from "../../../validation/isNullish/index.ts"
import isObject from "../../../validation/isObject/index.ts"
import isPlainDate from "../../../validation/isPlainDate/index.ts"
import isString from "../../../validation/isString/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
export default function toPlainDate(
	value: DateInput | null | undefined,
): Temporal.PlainDate | null {
	// Handle nullish values
	if (isNullish(value)) {
		return null
	}

	// If already a PlainDate, return as-is
	if (isPlainDate(value)) {
		return value
	}

	// Handle strings (ISO format expected)
	if (isString(value)) {
		const trimmed = trim(value)
		if (isEmpty(trimmed)) {
			return null
		}

		try {
			// Accept only canonical ISO YYYY-MM-DD to avoid ambiguous parses
			if (!/^\d{4}-\d{2}-\d{2}$/.test(trimmed)) return null
			return Temporal.PlainDate.from(trimmed)
		} catch {
			return null
		}
	}

	// Handle JavaScript Date objects
	if (isDate(value)) {
		if (isNaN(value.getTime())) {
			return null
		}

		try {
			// Convert to ISO string and parse date part only
			const isoString = value.toISOString()
			const dateOnly = isoString.split("T")[0]
			return Temporal.PlainDate.from(dateOnly)
		} catch {
			return null
		}
	}

	// Handle PlainDateLike objects
	if (
		allPass([
			isObject,
			hasProperty("year"),
			hasProperty("month"),
			hasProperty("day"),
		])(value)
	) {
		try {
			// Construct from y/m/d only
			const v = value as PlainDateLike
			return Temporal.PlainDate.from({
				year: v.year,
				month: v.month,
				day: v.day,
			})
		} catch {
			return null
		}
	}

	// Handle objects that provide a toPlainDate() method (PlainDateTime/ZonedDateTime)
	if (hasMethod("toPlainDate")(value)) {
		const result = (value as { toPlainDate: () => unknown }).toPlainDate()
		// Best-effort: if result looks like a Temporal.PlainDate, return it
		if (
			and(result)(isFunction((result as { toString: () => string }).toString))
		) {
			try {
				// Reconstruct via ISO to ensure a proper PlainDate instance
				const iso = (result as { toString: () => string }).toString()
				if (/^\d{4}-\d{2}-\d{2}$/.test(iso)) {
					return Temporal.PlainDate.from(iso)
				}
			} catch (_err) {
				// Swallow and fall through to null below
			}
		}
		return null
	}

	// Exhaustive type check - should never reach here with proper types
	return null
}
