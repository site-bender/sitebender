import type { WeekNumberingSystem } from "../../../../types/temporal/index.ts"

import getISOWeekNumber from "../getISOWeekNumber/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
export default function getWeekNumber(
	date: Date,
	system: WeekNumberingSystem = "ISO",
): number {
	switch (system) {
		case "ISO":
			return getISOWeekNumber(date)

		case "US": {
			// US week: Sunday start, week 1 contains Jan 1
			const startOfYear = new Date(date.getFullYear(), 0, 1)
			const dayOfYear = Math.floor(
				(date.getTime() - startOfYear.getTime()) /
					(24 * 60 * 60 * 1000),
			) + 1
			const dayOfWeek = startOfYear.getDay()
			return Math.ceil((dayOfYear + dayOfWeek) / 7)
		}

		case "Islamic":
		case "Hebrew":
			// For now, use ISO week numbering
			// Could be extended for calendar-specific week systems
			return getISOWeekNumber(date)

		default:
			return getISOWeekNumber(date)
	}
}
