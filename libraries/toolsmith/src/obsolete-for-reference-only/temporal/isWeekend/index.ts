//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
import isNullish from "../../validation/isNullish/index.ts"

const isWeekend = (
	date:
		| Temporal.PlainDate
		| Temporal.PlainDateTime
		| Temporal.ZonedDateTime
		| null
		| undefined,
): boolean => {
	if (isNullish(date)) {
		return false
	}

	if (
		!(date instanceof Temporal.PlainDate) &&
		!(date instanceof Temporal.PlainDateTime) &&
		!(date instanceof Temporal.ZonedDateTime)
	) {
		return false
	}

	try {
		const dayOfWeek = date.dayOfWeek
		return dayOfWeek === 6 || dayOfWeek === 7
	} catch {
		return false
	}
}

export default isWeekend
