import isNullish from "../../validation/isNullish/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
export default function startOfWeek(weekStartDay: number = 1) {
	return function getStartOfWeekForDate(
		date:
			| Temporal.PlainDate
			| Temporal.PlainDateTime
			| Temporal.ZonedDateTime
			| null
			| undefined,
	): Temporal.PlainDateTime | Temporal.ZonedDateTime | null {
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

		// Validate weekStartDay is in valid range (1-7)
		if (
			weekStartDay < 1 || weekStartDay > 7 || !Number.isInteger(weekStartDay)
		) {
			return null
		}

		try {
			// Get the current day of week (1=Monday, 7=Sunday)
			const currentDayOfWeek = date.dayOfWeek

			// Calculate days to subtract to get to week start
			const daysToSubtract = (currentDayOfWeek - weekStartDay + 7) % 7

			// Create the start of week date
			let startDate: Temporal.PlainDate

			if (date instanceof Temporal.PlainDate) {
				startDate = date.subtract({ days: daysToSubtract })
				return startDate.toPlainDateTime(
					Temporal.PlainTime.from("00:00:00"),
				)
			} else {
				// For PlainDateTime and ZonedDateTime
				const result = date.subtract({ days: daysToSubtract })
				return result.with({
					hour: 0,
					minute: 0,
					second: 0,
					millisecond: 0,
					microsecond: 0,
					nanosecond: 0,
				})
			}
		} catch {
			return null
		}
	}
}
