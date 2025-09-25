import isNullish from "../../validation/isNullish/index.ts"

/**
 * Calculates the duration until a target date/time
 *
 * Returns a Temporal.Duration representing the time from the current date/time
 * until the target date/time. The result can be positive (target is in the future)
 * or negative (target is in the past). Supports various Temporal types and
 * automatically handles time zones when present. Returns null for invalid inputs
 * to support safe error handling.
 * @param target - The target date/time to calculate until
 * @param current - The current date/time to calculate from
 * @returns Duration until target, or null if invalid
 * @example
 * ```typescript
 * // Calculate duration between dates
 * const currentDate = Temporal.PlainDate.from("2024-03-15")
 * const targetDate = Temporal.PlainDate.from("2024-12-25")
 * until(targetDate)(currentDate)          // Duration P285D (285 days)
 *
 * const pastDate = Temporal.PlainDate.from("2024-01-01")
 * until(pastDate)(currentDate)            // Duration -P73D (negative)
 *
 * // Calculate duration between times
 * const currentDateTime = Temporal.PlainDateTime.from("2024-03-15T10:00:00")
 * const targetDateTime = Temporal.PlainDateTime.from("2024-03-15T18:30:00")
 * until(targetDateTime)(currentDateTime)  // Duration PT8H30M
 *
 * // Handle DST transitions
 * const currentZoned = Temporal.ZonedDateTime.from(
 *   "2024-03-09T22:00:00-05:00[America/New_York]"
 * )
 * const targetZoned = Temporal.ZonedDateTime.from(
 *   "2024-03-10T06:00:00-04:00[America/New_York]"  // After DST
 * )
 * until(targetZoned)(currentZoned)        // Duration PT7H (not 8H due to DST)
 *
 * // Countdown calculator
 * const countdown = (eventDate: Temporal.PlainDate) => {
 *   const today = Temporal.Now.plainDateISO()
 *   return until(eventDate)(today)
 * }
 *
 * // Batch duration calculation
 * const startDate = Temporal.PlainDate.from("2024-01-01")
 * const milestones = [
 *   Temporal.PlainDate.from("2024-03-31"),
 *   Temporal.PlainDate.from("2024-06-30")
 * ]
 * const untilMilestone = milestones.map(m => until(m))
 * untilMilestone.map(fn => fn(startDate))  // [P89D, P181D]
 *
 * // Invalid inputs return null
 * until(targetDate)(null)                 // null
 * until("2024-12-25")(currentDate)        // null (string, not Temporal)
 * ```
 * @pure
 * @immutable
 * @curried
 * @safe
 */
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
