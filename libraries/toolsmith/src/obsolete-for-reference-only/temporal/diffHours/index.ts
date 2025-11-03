import isNullish from "../../validation/isNullish/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
const diffHours = (
	from:
		| Temporal.PlainTime
		| Temporal.PlainDateTime
		| Temporal.ZonedDateTime
		| null
		| undefined,
) =>
(
	to:
		| Temporal.PlainTime
		| Temporal.PlainDateTime
		| Temporal.ZonedDateTime
		| null
		| undefined,
): number | null => {
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
			// This will give negative values if 'to' appears earlier (assuming next day)
			const fromNs = from.hour * 3600e9 + from.minute * 60e9 +
				from.second * 1e9 +
				from.millisecond * 1e6 + from.microsecond * 1e3 +
				from.nanosecond
			const toNs = to.hour * 3600e9 + to.minute * 60e9 + to.second * 1e9 +
				to.millisecond * 1e6 + to.microsecond * 1e3 + to.nanosecond
			const diffNs = toNs - fromNs
			return diffNs / 3600e9 // Convert nanoseconds to hours
		}

		if (
			from instanceof Temporal.PlainDateTime &&
			to instanceof Temporal.PlainDateTime
		) {
			const duration = to.since(from, { largestUnit: "hours" })
			return duration.hours + duration.minutes / 60 +
				duration.seconds / 3600 +
				duration.milliseconds / 3600000 +
				duration.microseconds / 3600000000 +
				duration.nanoseconds / 3600000000000
		}

		if (
			from instanceof Temporal.ZonedDateTime &&
			to instanceof Temporal.ZonedDateTime
		) {
			const duration = to.since(from, { largestUnit: "hours" })
			return duration.hours + duration.minutes / 60 +
				duration.seconds / 3600 +
				duration.milliseconds / 3600000 +
				duration.microseconds / 3600000000 +
				duration.nanoseconds / 3600000000000
		}

		// Type mismatch or unsupported types
		return null
	} catch {
		return null
	}
}

export default diffHours
