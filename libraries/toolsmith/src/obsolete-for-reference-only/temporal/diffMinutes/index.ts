import isNullish from "../../validation/isNullish/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
export default function diffMinutes(
	from:
		| Temporal.PlainTime
		| Temporal.PlainDateTime
		| Temporal.ZonedDateTime
		| null
		| undefined,
) {
	return function calculateMinutesDifference(
		to:
			| Temporal.PlainTime
			| Temporal.PlainDateTime
			| Temporal.ZonedDateTime
			| null
			| undefined,
	): number | null {
		if (isNullish(from) || isNullish(to)) {
			return null
		}

		try {
			// Handle different Temporal types
			if (
				from instanceof Temporal.PlainTime &&
				to instanceof Temporal.PlainTime
			) {
				// For PlainTime, calculate assuming same day
				const fromNs = from.hour * 3600e9 + from.minute * 60e9 +
					from.second * 1e9 +
					from.millisecond * 1e6 + from.microsecond * 1e3 +
					from.nanosecond
				const toNs = to.hour * 3600e9 + to.minute * 60e9 + to.second * 1e9 +
					to.millisecond * 1e6 + to.microsecond * 1e3 + to.nanosecond
				const diffNs = toNs - fromNs
				return diffNs / 60e9 // Convert nanoseconds to minutes
			}

			if (
				from instanceof Temporal.PlainDateTime &&
				to instanceof Temporal.PlainDateTime
			) {
				const duration = to.since(from, { largestUnit: "hours" })
				return duration.hours * 60 + duration.minutes +
					duration.seconds / 60 +
					duration.milliseconds / 60000 +
					duration.microseconds / 60000000 +
					duration.nanoseconds / 60000000000
			}

			if (
				from instanceof Temporal.ZonedDateTime &&
				to instanceof Temporal.ZonedDateTime
			) {
				const duration = to.since(from, { largestUnit: "hours" })
				return duration.hours * 60 + duration.minutes +
					duration.seconds / 60 +
					duration.milliseconds / 60000 +
					duration.microseconds / 60000000 +
					duration.nanoseconds / 60000000000
			}

			// Type mismatch or unsupported types
			return null
		} catch {
			return null
		}
	}
}
