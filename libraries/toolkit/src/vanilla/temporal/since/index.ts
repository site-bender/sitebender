import isNullish from "../../validation/isNullish/index.ts"

/**
 * Calculates the duration since a reference date/time
 *
 * Returns a Temporal.Duration representing the time elapsed from the reference
 * date/time to the current date/time. The result is always positive - if the
 * reference is in the future, an empty duration is returned. Supports various
 * Temporal types and automatically handles time zones when present. This is a
 * curried function for easy composition. Returns null for invalid inputs to
 * support safe error handling.
 *
 * @curried
 * @param reference - The reference date/time to calculate from
 * @param current - The current date/time to calculate to
 * @returns Duration since reference, or null if invalid
 * @example
 * ```typescript
 * // Basic usage with PlainDate
 * const startDate = Temporal.PlainDate.from("2024-01-01")
 * const currentDate = Temporal.PlainDate.from("2024-03-15")
 * since(startDate)(currentDate)           // Duration P73D (73 days)
 *
 * const laterDate = Temporal.PlainDate.from("2024-12-31")
 * since(startDate)(laterDate)             // Duration P364D (364 days in 2024)
 *
 * // With PlainDateTime
 * const startDateTime = Temporal.PlainDateTime.from("2024-01-01T09:00:00")
 * const currentDateTime = Temporal.PlainDateTime.from("2024-01-01T17:30:45")
 * since(startDateTime)(currentDateTime)   // Duration PT8H30M45S
 *
 * // Across days
 * const morning = Temporal.PlainDateTime.from("2024-03-14T09:00:00")
 * const nextEvening = Temporal.PlainDateTime.from("2024-03-15T18:30:00")
 * since(morning)(nextEvening)             // Duration P1DT9H30M
 *
 * // With PlainTime (within same day)
 * const startTime = Temporal.PlainTime.from("09:00:00")
 * const endTime = Temporal.PlainTime.from("17:30:00")
 * since(startTime)(endTime)               // Duration PT8H30M
 *
 * // Time wrapping (crosses midnight)
 * const evening = Temporal.PlainTime.from("22:00:00")
 * const earlyMorning = Temporal.PlainTime.from("02:00:00")
 * since(evening)(earlyMorning)            // Duration PT4H (assumes next day)
 *
 * // With ZonedDateTime (handles DST)
 * const zonedStart = Temporal.ZonedDateTime.from(
 *   "2024-03-09T22:00:00-05:00[America/New_York]"
 * )
 * const zonedEnd = Temporal.ZonedDateTime.from(
 *   "2024-03-10T06:00:00-04:00[America/New_York]"  // After DST transition
 * )
 * since(zonedStart)(zonedEnd)             // Duration PT7H (not 8H due to DST)
 *
 * // Future reference (returns empty duration)
 * const futureDate = Temporal.PlainDate.from("2025-01-01")
 * const todayDate = Temporal.PlainDate.from("2024-01-01")
 * since(futureDate)(todayDate)            // Duration PT0S (empty)
 *
 * // With Instant
 * const instantStart = Temporal.Instant.from("2024-01-01T00:00:00Z")
 * const instantEnd = Temporal.Instant.from("2024-01-02T12:30:45Z")
 * since(instantStart)(instantEnd)         // Duration P1DT12H30M45S
 *
 * // Partial application
 * const sinceNewYear = since(Temporal.PlainDate.from("2024-01-01"))
 * sinceNewYear(Temporal.PlainDate.from("2024-03-15"))  // Duration P73D
 * sinceNewYear(Temporal.PlainDate.from("2024-07-04"))  // Duration P185D
 * sinceNewYear(Temporal.PlainDate.from("2024-12-31"))  // Duration P364D
 *
 * // Batch processing
 * const projectStart = Temporal.PlainDate.from("2024-01-01")
 * const milestones = [
 *   Temporal.PlainDate.from("2024-02-01"),
 *   Temporal.PlainDate.from("2024-03-15"),
 *   Temporal.PlainDate.from("2024-06-30")
 * ]
 * const sinceStart = since(projectStart)
 * milestones.map(sinceStart)
 * // [P31D, P73D, P181D]
 *
 * // Null handling
 * since(null)(currentDate)                // null
 * since(startDate)(null)                  // null
 * since(null)(null)                       // null
 * since(startDate)(undefined)             // null
 *
 * // Future reference returns empty duration
 * const futureDate = Temporal.PlainDate.from("2025-01-01")
 * const pastDate = Temporal.PlainDate.from("2024-01-01")
 * since(futureDate)(pastDate)             // Duration PT0S (empty)
 * ```
 * @pure
 * @safe
 * @curried
 */
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
