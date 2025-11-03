//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
import isNullish from "../../validation/isNullish/index.ts"

const endOfMonth = (
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
		// Get the year and month
		let year: number
		let month: number

		if (date instanceof Temporal.PlainDateTime) {
			year = date.year
			month = date.month
		} else if (date instanceof Temporal.PlainDate) {
			year = date.year
			month = date.month
		} else if (date instanceof Temporal.PlainYearMonth) {
			year = date.year
			month = date.month
		} else {
			return null
		}

		// Create a PlainDate for this year and month
		const firstOfMonth = Temporal.PlainDate.from({ year, month, day: 1 })

		// Get the last day of the month using daysInMonth
		const lastDay = firstOfMonth.daysInMonth

		// Return the last day of the month
		return Temporal.PlainDate.from({ year, month, day: lastDay })
	} catch {
		return null
	}
}

export default endOfMonth
