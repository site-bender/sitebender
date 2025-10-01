import isNullish from "../../validation/isNullish/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
const since = (
	reference:
		| Temporal.PlainDate
		| Temporal.PlainDateTime
		| Temporal.PlainTime
		| Temporal.ZonedDateTime
		| Temporal.Instant
		| null
		| undefined,
) =>
(
	current:
		| Temporal.PlainDate
		| Temporal.PlainDateTime
		| Temporal.PlainTime
		| Temporal.ZonedDateTime
		| Temporal.Instant
		| null
		| undefined,
): Temporal.Duration | null => {
	if (isNullish(reference) || isNullish(current)) {
		return null
	}

	// Validate both are Temporal types
	const isValidReference = reference instanceof Temporal.PlainDate ||
		reference instanceof Temporal.PlainDateTime ||
		reference instanceof Temporal.PlainTime ||
		reference instanceof Temporal.ZonedDateTime ||
		reference instanceof Temporal.Instant

	const isValidCurrent = current instanceof Temporal.PlainDate ||
		current instanceof Temporal.PlainDateTime ||
		current instanceof Temporal.PlainTime ||
		current instanceof Temporal.ZonedDateTime ||
		current instanceof Temporal.Instant

	if (!isValidReference || !isValidCurrent) {
		return null
	}

	try {
		// Handle PlainTime specially (assumes same day or next day if current < reference)
		if (
			reference instanceof Temporal.PlainTime &&
			current instanceof Temporal.PlainTime
		) {
			const refSeconds = reference.hour * 3600 + reference.minute * 60 +
				reference.second
			const curSeconds = current.hour * 3600 + current.minute * 60 +
				current.second

			if (curSeconds >= refSeconds) {
				// Same day
				return reference.until(current)
			} else {
				// Assume next day (24 hours - reference + current)
				const secondsUntilMidnight = 86400 - refSeconds
				const totalSeconds = secondsUntilMidnight + curSeconds
				return Temporal.Duration.from({ seconds: totalSeconds })
			}
		}

		// For all other types, use the until method
		// @ts-ignore - TypeScript doesn't recognize the common until method
		const duration = reference.until(current)

		// If duration is negative (reference is in the future), return empty duration
		if (duration.sign < 0) {
			return Temporal.Duration.from({ seconds: 0 })
		}

		return duration
	} catch {
		return null
	}
}

export default since
