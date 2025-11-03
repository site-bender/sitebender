import isNullish from "../../validation/isNullish/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
const getDay = (
	date:
		| Temporal.PlainDate
		| Temporal.PlainDateTime
		| Temporal.PlainMonthDay
		| Temporal.ZonedDateTime
		| null
		| undefined,
): number | null => {
	if (isNullish(date)) {
		return null
	}

	if (
		!(date instanceof Temporal.PlainDate) &&
		!(date instanceof Temporal.PlainDateTime) &&
		!(date instanceof Temporal.PlainMonthDay) &&
		!(date instanceof Temporal.ZonedDateTime)
	) {
		return null
	}

	try {
		return date.day
	} catch {
		return null
	}
}

export default getDay
