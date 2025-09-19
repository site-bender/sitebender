import type {
	PlainTimeLike,
	TimeInput,
} from "../../../../types/temporal/index.ts"
import trim from "../../../string/trim/index.ts"
import isString from "../../../validation/isString/index.ts"
import isObject from "../../../validation/isObject/index.ts"
import isEmpty from "../../../string/isEmpty/index.ts"
import hasProperty from "../../../validation/hasProperty/index.ts"
import isNullish from "../../../validation/isNullish/index.ts"
import isPlainTime from "../../../validation/isPlainTime/index.ts"
import isDate from "../../../validation/isDate/index.ts"
import isPlainDateTime from "../../../validation/isPlainDateTime/index.ts"
import isZonedDateTime from "../../../validation/isZonedDateTime/index.ts"
import anyPass from "../../../validation/anyPass/index.ts"
import allPass from "../../../validation/allPass/index.ts"

/**
 * Parses values into Temporal PlainTime objects
 *
 * Converts various time representations to Temporal.PlainTime.
 * Returns null for invalid inputs rather than throwing errors.
 *
 * Parsing rules:
 * - Temporal.PlainTime: returned as-is
 * - Temporal.PlainDateTime/ZonedDateTime: extracts time portion
 * - Strings: ISO 8601 time format (HH:MM:SS or variants)
 * - Date objects: extracts time in local timezone
 * - PlainTimeLike objects: accepts hour, minute, second, etc.
 * - null/undefined: null
 *
 * @param value - The value to convert to PlainTime
 * @returns The PlainTime representation or null if invalid
 * @example
 * ```typescript
 * // ISO time strings
 * toPlainTime("14:30:00")          // PlainTime 14:30:00
 * toPlainTime("14:30")             // PlainTime 14:30:00
 * toPlainTime("14:30:00.123")      // PlainTime 14:30:00.123
 *
 * // Temporal objects
 * const dateTime = Temporal.PlainDateTime.from("2024-03-15T14:30:00")
 * toPlainTime(dateTime)            // PlainTime 14:30:00
 *
 * // PlainTimeLike objects
 * toPlainTime({ hour: 14, minute: 30 })          // PlainTime 14:30:00
 * toPlainTime({ hour: 9, minute: 5, second: 30 }) // PlainTime 09:05:30
 *
 * // Invalid inputs
 * toPlainTime("25:00:00")          // null (hour 25 invalid)
 * toPlainTime(null)                // null
 * toPlainTime(123)                 // null
 *
 * // Date objects (extracts time)
 * const jsDate = new Date("2024-03-15T14:30:45.123Z")
 * toPlainTime(jsDate)              // PlainTime from local time
 * ```
 * @pure
 * @safe
 */
export default function toPlainTime(
	value: TimeInput | null | undefined,
): Temporal.PlainTime | null {
	// Handle nullish values
	if (isNullish(value)) {
		return null
	}

	// If already a PlainTime, return as-is
	if (isPlainTime(value)) {
		return value
	}

	// Handle strings (ISO format expected)
	if (isString(value)) {
		const trimmed = trim(value)
		if (isEmpty(trimmed)) {
			return null
		}

		try {
			// Temporal.PlainTime.from with strict validation
			return Temporal.PlainTime.from(trimmed)
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
			// Extract time components in local timezone
			return Temporal.PlainTime.from({
				hour: value.getHours(),
				minute: value.getMinutes(),
				second: value.getSeconds(),
				millisecond: value.getMilliseconds(),
			})
		} catch {
			return null
		}
	}

	// Handle PlainTimeLike objects
	if (
		allPass([
			isObject,
			anyPass([
				hasProperty("hour"),
				hasProperty("minute"),
				hasProperty("second"),
				hasProperty("millisecond"),
				hasProperty("microsecond"),
				hasProperty("nanosecond"),
			]),
		])(value)
	) {
		try {
			// Use strict construction; invalid times throw and return null
			return Temporal.PlainTime.from(value as PlainTimeLike)
		} catch {
			return null
		}
	}

	// Handle PlainDateTime
	if (isPlainDateTime(value)) {
		return value.toPlainTime()
	}

	// Handle ZonedDateTime
	if (isZonedDateTime(value)) {
		return value.toPlainTime()
	}

	// Exhaustive type check - should never reach here with proper types
	return null
}
