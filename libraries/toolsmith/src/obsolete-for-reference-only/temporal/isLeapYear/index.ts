//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
import isNullish from "../../validation/isNullish/index.ts"

const isLeapYear = (
	yearOrDate:
		| number
		| Temporal.PlainDate
		| Temporal.PlainDateTime
		| Temporal.PlainYearMonth
		| Temporal.ZonedDateTime
		| null
		| undefined,
): boolean => {
	if (isNullish(yearOrDate)) {
		return false
	}

	let year: number

	if (typeof yearOrDate === "number") {
		// Direct year number
		if (!Number.isFinite(yearOrDate) || !Number.isInteger(yearOrDate)) {
			return false
		}
		year = yearOrDate
	} else if (
		yearOrDate instanceof Temporal.PlainDate ||
		yearOrDate instanceof Temporal.PlainDateTime ||
		yearOrDate instanceof Temporal.PlainYearMonth ||
		yearOrDate instanceof Temporal.ZonedDateTime
	) {
		// Temporal date object - check daysInYear property
		try {
			return yearOrDate.daysInYear === 366
		} catch {
			return false
		}
	} else {
		return false
	}

	// Calculate leap year for number input
	if (year % 400 === 0) return true
	if (year % 100 === 0) return false
	if (year % 4 === 0) return true
	return false
}

export default isLeapYear
