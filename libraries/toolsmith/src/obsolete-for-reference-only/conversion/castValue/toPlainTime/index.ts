import type {
	PlainTimeLike,
	TimeInput,
} from "../../../../types/temporal/index.ts"

import isEmpty from "../../../string/isEmpty/index.ts"
import trim from "../../../string/trim/index.ts"
import allPass from "../../../validation/allPass/index.ts"
import anyPass from "../../../validation/anyPass/index.ts"
import hasProperty from "../../../validation/hasProperty/index.ts"
import isDate from "../../../validation/isDate/index.ts"
import isNullish from "../../../validation/isNullish/index.ts"
import isObject from "../../../validation/isObject/index.ts"
import isPlainDateTime from "../../../validation/isPlainDateTime/index.ts"
import isPlainTime from "../../../validation/isPlainTime/index.ts"
import isString from "../../../validation/isString/index.ts"
import isZonedDateTime from "../../../validation/isZonedDateTime/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
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
