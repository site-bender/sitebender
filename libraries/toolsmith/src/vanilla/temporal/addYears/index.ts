//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
import isNullish from "../../validation/isNullish/index.ts"

export default function addYears(years: number) {
	return function addYearsToDate(
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
			return date.add({ years })
		} catch {
			return null
		}
	}
}
