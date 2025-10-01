import isNullish from "../../validation/isNullish/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
export default function endOfWeek(weekStartDay: number = 1) {
	return function getEndOfWeekForDate(
		date: Temporal.PlainDate | Temporal.PlainDateTime | null | undefined,
	): Temporal.PlainDate | null {
		if (isNullish(date)) {
			return null
		}

		try {
			// Convert to PlainDate if needed
			let plainDate: Temporal.PlainDate

			if (date instanceof Temporal.PlainDateTime) {
				plainDate = date.toPlainDate()
			} else if (date instanceof Temporal.PlainDate) {
				plainDate = date
			} else {
				return null
			}

			// Validate weekStartDay (1-7)
			const startDay = weekStartDay >= 1 && weekStartDay <= 7 ? weekStartDay : 1

			// Calculate days until end of week
			// dayOfWeek: 1=Monday, 7=Sunday
			const currentDay = plainDate.dayOfWeek ?? 1

			// Calculate end day (day before start day)
			const endDay = startDay === 1 ? 7 : startDay - 1

			// Calculate days to add
			let daysToAdd: number
			if (currentDay <= endDay) {
				daysToAdd = endDay - currentDay
			} else {
				daysToAdd = 7 - currentDay + endDay
			}

			// Return the end of week
			return plainDate.add({ days: daysToAdd })
		} catch {
			return null
		}
	}
}
