import isNullish from "../../validation/isNullish/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
export default function withCalendar(calendar: string) {
	return function changeCalendarForTemporal(
		temporal:
			| Temporal.PlainDate
			| Temporal.PlainDateTime
			| Temporal.PlainYearMonth
			| Temporal.PlainMonthDay
			| null
			| undefined,
	):
		| Temporal.PlainDate
		| Temporal.PlainDateTime
		| Temporal.PlainYearMonth
		| Temporal.PlainMonthDay
		| null {
		if (isNullish(temporal)) {
			return null
		}

		// Validate temporal is a type that supports calendar
		const isValidTemporal = temporal instanceof Temporal.PlainDate ||
			temporal instanceof Temporal.PlainDateTime ||
			temporal instanceof Temporal.PlainYearMonth ||
			temporal instanceof Temporal.PlainMonthDay

		if (!isValidTemporal) {
			return null
		}

		try {
			// Validate calendar by attempting to create a test date
			Temporal.PlainDate.from({ year: 2000, month: 1, day: 1, calendar })

			// Use withCalendar method to change the calendar system
			// @ts-ignore - TypeScript doesn't recognize the common withCalendar method
			return temporal.withCalendar(calendar)
		} catch {
			return null
		}
	}
}
