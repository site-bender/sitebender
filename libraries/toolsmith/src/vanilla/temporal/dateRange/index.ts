import isNullish from "../../validation/isNullish/index.ts"

/**
 * Generates an array of dates between start and end dates
 *
 * Creates an inclusive range of dates from start to end, with customizable
 * step size. The step can be specified as a Temporal.Duration for complex
 * intervals. Returns an empty array if start is after end. Handles month
 * and year boundaries correctly. Returns null for invalid inputs.
 *
 * @param start - The starting date (inclusive)
 * @param end - The ending date (inclusive)
 * @param step - Optional duration between dates (defaults to 1 day)
 * @returns Array of dates in the range, or null if invalid
 * @example
 * ```typescript
 * // Basic daily range
 * const start = Temporal.PlainDate.from("2024-03-01")
 * const end = Temporal.PlainDate.from("2024-03-05")
 * dateRange(start)(end)()
 * // [2024-03-01, 2024-03-02, 2024-03-03, 2024-03-04, 2024-03-05]
 *
 * // With custom step
 * const step2Days = Temporal.Duration.from({ days: 2 })
 * dateRange(start)(end)(step2Days)
 * // [2024-03-01, 2024-03-03, 2024-03-05]
 *
 * // Weekly intervals
 * const weekly = Temporal.Duration.from({ weeks: 1 })
 * dateRange(start)(end)(weekly)
 * // Weekly dates within range
 *
 * // Business days filter
 * const allDays = dateRange(start)(end)()
 * const businessDays = allDays?.filter(date =>
 *   date.dayOfWeek >= 1 && date.dayOfWeek <= 5
 * )
 *
 * // Calendar month
 * const firstDay = Temporal.PlainDate.from({ year: 2024, month: 2, day: 1 })
 * const lastDay = firstDay.with({ day: firstDay.daysInMonth })
 * dateRange(firstDay)(lastDay)()
 * // All days in February 2024
 *
 * // Backwards range returns empty
 * dateRange(
 *   Temporal.PlainDate.from("2024-03-10")
 * )(
 *   Temporal.PlainDate.from("2024-03-01")
 * )()  // []
 *
 * // Null handling
 * dateRange(null)(end)()                  // null
 * dateRange(start)(null)()                // null
 * ```
 * @pure
 * @immutable
 * @safe - Returns null for invalid inputs
 * @curried
 */
const dateRange =
	(start: Temporal.PlainDate | null | undefined) =>
	(end: Temporal.PlainDate | null | undefined) =>
	(
		step: Temporal.Duration | null | undefined = Temporal.Duration.from({
			days: 1,
		}),
	): Array<Temporal.PlainDate> | null => {
		if (isNullish(start) || isNullish(end)) {
			return null
		}

		if (
			!(start instanceof Temporal.PlainDate) ||
			!(end instanceof Temporal.PlainDate)
		) {
			return null
		}

		// Default to 1 day if step is nullish
		const duration = step ?? Temporal.Duration.from({ days: 1 })

		if (!(duration instanceof Temporal.Duration)) {
			return null
		}

		try {
			const dates: Array<Temporal.PlainDate> = []

			// Return empty array if start is after end
			if (Temporal.PlainDate.compare(start, end) > 0) {
				return dates
			}

			// Generate dates from start to end using recursion
			const generate = (
				current: Temporal.PlainDate,
			): Array<Temporal.PlainDate> => {
				if (Temporal.PlainDate.compare(current, end) > 0) {
					return []
				}
				return [current, ...generate(current.add(duration))]
			}
			dates.push(...generate(start))

			return dates
		} catch {
			return null
		}
	}

export default dateRange
