import isNullish from "../../validation/isNullish/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
const round = (
	unit:
		| "hour"
		| "minute"
		| "second"
		| "millisecond"
		| "microsecond"
		| "nanosecond"
		| "day",
) =>
(
	datetime:
		| Temporal.PlainTime
		| Temporal.PlainDateTime
		| Temporal.ZonedDateTime
		| null
		| undefined,
):
	| Temporal.PlainTime
	| Temporal.PlainDateTime
	| Temporal.ZonedDateTime
	| null => {
	if (isNullish(datetime)) {
		return null
	}

	if (
		!(datetime instanceof Temporal.PlainTime) &&
		!(datetime instanceof Temporal.PlainDateTime) &&
		!(datetime instanceof Temporal.ZonedDateTime)
	) {
		return null
	}

	try {
		// PlainTime does not support 'day' for rounding; guard it
		if (datetime instanceof Temporal.PlainTime) {
			const u: Temporal.SmallestUnit<
				| "hour"
				| "minute"
				| "second"
				| "millisecond"
				| "microsecond"
				| "nanosecond"
			> = unit === "day" ? "hour" : unit
			return datetime.round({ smallestUnit: u, roundingMode: "halfExpand" })
		}
		if (
			datetime instanceof Temporal.PlainDateTime ||
			datetime instanceof Temporal.ZonedDateTime
		) {
			const u: Temporal.SmallestUnit<
				| "day"
				| "hour"
				| "minute"
				| "second"
				| "millisecond"
				| "microsecond"
				| "nanosecond"
			> = unit
			return datetime.round({ smallestUnit: u, roundingMode: "halfExpand" })
		}
		return null
	} catch {
		return null
	}
}

export default round
