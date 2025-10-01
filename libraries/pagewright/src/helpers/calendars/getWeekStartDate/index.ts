import type { WeekNumberingSystem } from "../../../../types/temporal/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
export default function getWeekStartDate(
	date: Date,
	system: WeekNumberingSystem = "ISO",
): Date {
	const result = new Date(date)
	const day = result.getDay()

	let diff: number
	switch (system) {
		case "US":
		case "Hebrew":
			// Sunday start
			diff = day
			break

		case "Islamic":
			// Saturday start
			diff = (day + 1) % 7
			break

		case "ISO":
		default:
			// Monday start
			diff = day === 0 ? 6 : day - 1
			break
	}

	result.setDate(result.getDate() - diff)
	result.setHours(0, 0, 0, 0)
	return result
}
