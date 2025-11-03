import isNullish from "../../validation/isNullish/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
const endOfYear = (
	date:
		| Temporal.PlainDate
		| Temporal.PlainDateTime
		| Temporal.PlainYearMonth
		| null
		| undefined,
): Temporal.PlainDate | null => {
	if (isNullish(date)) {
		return null
	}

	try {
		// Get the year
		let year: number

		if (date instanceof Temporal.PlainDateTime) {
			year = date.year
		} else if (date instanceof Temporal.PlainDate) {
			year = date.year
		} else if (date instanceof Temporal.PlainYearMonth) {
			year = date.year
		} else {
			return null
		}

		// Return December 31st of that year
		return Temporal.PlainDate.from({ year, month: 12, day: 31 })
	} catch {
		return null
	}
}

export default endOfYear
