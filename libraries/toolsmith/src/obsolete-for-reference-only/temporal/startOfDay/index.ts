import isNullish from "../../validation/isNullish/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
const startOfDay = (
	date:
		| Temporal.PlainDate
		| Temporal.PlainDateTime
		| Temporal.ZonedDateTime
		| null
		| undefined,
): Temporal.PlainDateTime | Temporal.ZonedDateTime | null => {
	if (isNullish(date)) {
		return null
	}

	if (
		!(date instanceof Temporal.PlainDate) &&
		!(date instanceof Temporal.PlainDateTime) &&
		!(date instanceof Temporal.ZonedDateTime)
	) {
		return null
	}

	try {
		// Handle PlainDate by converting to PlainDateTime
		if (date instanceof Temporal.PlainDate) {
			return date.toPlainDateTime(Temporal.PlainTime.from("00:00:00"))
		}

		// For PlainDateTime and ZonedDateTime, set time to midnight
		return date.with({
			hour: 0,
			minute: 0,
			second: 0,
			millisecond: 0,
			microsecond: 0,
			nanosecond: 0,
		})
	} catch {
		return null
	}
}

export default startOfDay
