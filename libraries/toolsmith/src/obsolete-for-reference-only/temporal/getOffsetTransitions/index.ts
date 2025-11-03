import isNullish from "../../validation/isNullish/index.ts"
import _checkTransitions from "./_checkTransitions/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
export default function getOffsetTransitions(timeZone: string) {
	return function getOffsetTransitionsForTimeZone(
		startDate: Temporal.PlainDate | null | undefined,
		endDate: Temporal.PlainDate | null | undefined,
	): Array<{
		date: Temporal.PlainDate
		offsetBefore: string
		offsetAfter: string
		type: "forward" | "backward"
	}> {
		if (isNullish(startDate) || isNullish(endDate)) {
			return []
		}

		if (
			!(startDate instanceof Temporal.PlainDate) ||
			!(endDate instanceof Temporal.PlainDate)
		) {
			return []
		}

		if (typeof timeZone !== "string" || timeZone.length === 0) {
			return []
		}

		// Invalid date range (end before start)
		if (Temporal.PlainDate.compare(endDate, startDate) < 0) {
			return []
		}

		try {
			const _transitions: Array<{
				date: Temporal.PlainDate
				offsetBefore: string
				offsetAfter: string
				type: "forward" | "backward"
			}> = []

			return _checkTransitions(startDate, null, [], endDate, timeZone)
		} catch {
			return []
		}
	}
}
