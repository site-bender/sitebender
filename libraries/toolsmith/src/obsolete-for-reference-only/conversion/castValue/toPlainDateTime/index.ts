import type {
	DateTimeInput,
	PlainDateTimeLike,
} from "../../../../types/temporal/index.ts"

import isEmpty from "../../../string/isEmpty/index.ts"
import trim from "../../../string/trim/index.ts"
import allPass from "../../../validation/allPass/index.ts"
import hasMethod from "../../../validation/hasMethod/index.ts"
import hasProperty from "../../../validation/hasProperty/index.ts"
import isDate from "../../../validation/isDate/index.ts"
import isNullish from "../../../validation/isNullish/index.ts"
import isObject from "../../../validation/isObject/index.ts"
import isPlainDateTime from "../../../validation/isPlainDateTime/index.ts"
import isString from "../../../validation/isString/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
export default function toPlainDateTime(
	value: DateTimeInput | null | undefined,
): Temporal.PlainDateTime | null {
	// Handle nullish values
	if (isNullish(value)) {
		return null
	}

	// If already a PlainDateTime, return as-is
	if (isPlainDateTime(value)) {
		return value
	}

	// Handle strings (ISO format expected)
	if (isString(value)) {
		const trimmed = trim(value)
		if (isEmpty(trimmed)) {
			return null
		}

		try {
			// Accept canonical ISO; allow date-only strings
			if (!/^\d{4}-\d{2}-\d{2}(?:[T\s].+)?$/.test(trimmed)) return null
			return Temporal.PlainDateTime.from(trimmed)
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
			// Convert to PlainDateTime in local timezone
			return Temporal.PlainDateTime.from({
				year: value.getFullYear(),
				month: value.getMonth() + 1, // JS months are 0-based
				day: value.getDate(),
				hour: value.getHours(),
				minute: value.getMinutes(),
				second: value.getSeconds(),
				millisecond: value.getMilliseconds(),
			})
		} catch {
			return null
		}
	}

	// Handle PlainDate (becomes midnight of that date)
	if (hasMethod("toPlainDateTime")(value)) {
		const result =
			(value as { toPlainDateTime: (...args: Array<unknown>) => unknown })
				.toPlainDateTime()
		if (
			hasMethod("toString")(result)
		) {
			try {
				const iso = (result as { toString: () => string }).toString()
				return Temporal.PlainDateTime.from(iso)
			} catch (_err) {
				return null
			}
		}
		return null
	}

	// Handle PlainTime (becomes that time on 1970-01-01)
	if (
		allPass([
			isObject,
			hasProperty("hour"),
			hasProperty("minute"),
		])(value)
	) {
		// Treat as PlainTime-like
		try {
			// Build PlainDateTime from epoch date + provided time fields we know
			const t = value as {
				hour?: number
				minute?: number
				second?: number
				millisecond?: number
				microsecond?: number
				nanosecond?: number
			}
			return Temporal.PlainDateTime.from({
				year: 1970,
				month: 1,
				day: 1,
				hour: t.hour ?? 0,
				minute: t.minute ?? 0,
				second: t.second ?? 0,
				millisecond: t.millisecond ?? 0,
				microsecond: t.microsecond ?? 0,
				nanosecond: t.nanosecond ?? 0,
			})
		} catch {
			return null
		}
	}

	// Handle ZonedDateTime
	if (hasMethod("toPlainDateTime")(value)) {
		const result = (value as { toPlainDateTime: () => unknown })
			.toPlainDateTime()
		if (
			hasMethod("toString")(result)
		) {
			try {
				return Temporal.PlainDateTime.from(
					(result as { toString: () => string }).toString(),
				)
			} catch (_err) {
				return null
			}
		}
		return null
	}

	// Handle PlainDateTimeLike objects
	if (
		allPass([
			isObject,
			hasProperty("year"),
			hasProperty("month"),
			hasProperty("day"),
		])(value)
	) {
		try {
			const v = value as PlainDateTimeLike
			return Temporal.PlainDateTime.from({
				year: v.year,
				month: v.month,
				day: v.day,
				hour: v.hour ?? 0,
				minute: v.minute ?? 0,
				second: v.second ?? 0,
				millisecond: v.millisecond ?? 0,
				microsecond: v.microsecond ?? 0,
				nanosecond: v.nanosecond ?? 0,
			})
		} catch {
			return null
		}
	}

	// Exhaustive type check - should never reach here with proper types
	return null
}
