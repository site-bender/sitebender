import isNullish from "../../validation/isNullish/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
export default function until(
	target:
		| Temporal.PlainDate
		| Temporal.PlainDateTime
		| Temporal.PlainTime
		| Temporal.ZonedDateTime
		| Temporal.Instant
		| null
		| undefined,
) {
	return function calculateDurationUntil(
		current:
			| Temporal.PlainDate
			| Temporal.PlainDateTime
			| Temporal.PlainTime
			| Temporal.ZonedDateTime
			| Temporal.Instant
			| null
			| undefined,
	): Temporal.Duration | null {
		if (isNullish(target) || isNullish(current)) {
			return null
		}

		// Validate both are Temporal types
		const isValidTarget = target instanceof Temporal.PlainDate ||
			target instanceof Temporal.PlainDateTime ||
			target instanceof Temporal.PlainTime ||
			target instanceof Temporal.ZonedDateTime ||
			target instanceof Temporal.Instant

		const isValidCurrent = current instanceof Temporal.PlainDate ||
			current instanceof Temporal.PlainDateTime ||
			current instanceof Temporal.PlainTime ||
			current instanceof Temporal.ZonedDateTime ||
			current instanceof Temporal.Instant

		if (!isValidTarget || !isValidCurrent) {
			return null
		}

		try {
			// Handle PlainTime specially (assumes same day or next day if target < current)
			if (
				current instanceof Temporal.PlainTime &&
				target instanceof Temporal.PlainTime
			) {
				const currentSeconds = current.hour * 3600 + current.minute * 60 +
					current.second
				const targetSeconds = target.hour * 3600 + target.minute * 60 +
					target.second

				if (targetSeconds >= currentSeconds) {
					// Same day
					return current.until(target)
				} else {
					// Assume next day (24 hours - current + target)
					const secondsUntilMidnight = 86400 - currentSeconds
					const totalSeconds = secondsUntilMidnight + targetSeconds
					return Temporal.Duration.from({ seconds: totalSeconds })
				}
			}

			// For all other types, use the until method
			// @ts-ignore - TypeScript doesn't recognize the common until method
			return current.until(target)
		} catch {
			return null
		}
	}
}
