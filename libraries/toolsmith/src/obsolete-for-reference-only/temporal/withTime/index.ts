//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
import isNullish from "../../validation/isNullish/index.ts"

export default function withTime(
	time: Temporal.PlainTime | string | null | undefined,
) {
	return function withTimeOnDate(
		date: Temporal.PlainDate | null | undefined,
	): Temporal.PlainDateTime | null {
		if (isNullish(date)) {
			return null
		}

		// Validate date is a PlainDate
		if (!(date instanceof Temporal.PlainDate)) {
			return null
		}

		try {
			// Handle null/undefined time - default to midnight
			if (isNullish(time)) {
				return date.toPlainDateTime(Temporal.PlainTime.from("00:00:00"))
			}

			// Handle PlainTime
			if (time instanceof Temporal.PlainTime) {
				return date.toPlainDateTime(time)
			}

			// Handle string - try to parse as PlainTime
			if (typeof time === "string") {
				try {
					const plainTime = Temporal.PlainTime.from(time)
					return date.toPlainDateTime(plainTime)
				} catch {
					return null
				}
			}

			return null
		} catch {
			return null
		}
	}
}
