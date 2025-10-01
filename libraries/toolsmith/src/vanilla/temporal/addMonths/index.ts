import isNullish from "../../validation/isNullish/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
export default function addMonths(months: number) {
	return function addMonthsToDate(
		date:
			| Temporal.PlainDate
			| Temporal.PlainDateTime
			| Temporal.PlainYearMonth
			| null
			| undefined,
	):
		| Temporal.PlainDate
		| Temporal.PlainDateTime
		| Temporal.PlainYearMonth
		| null {
		if (isNullish(date)) {
			return null
		}

		if (
			!(date instanceof Temporal.PlainDate) &&
			!(date instanceof Temporal.PlainDateTime) &&
			!(date instanceof Temporal.PlainYearMonth)
		) {
			return null
		}

		try {
			return date.add({ months })
		} catch {
			return null
		}
	}
}
