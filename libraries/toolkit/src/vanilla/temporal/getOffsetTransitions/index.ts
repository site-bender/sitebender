import isNull from "../../validation/isNull/index.ts"
import isNullish from "../../validation/isNullish/index.ts"

/**
 * Gets timezone offset transition points
 *
 * Retrieves all timezone offset transitions (e.g., DST changes) for a given
 * timezone within a specified date range. Returns an array of transition
 * objects containing the transition date and the offset change information.
 * Useful for timezone-aware applications that need to handle DST boundaries
 * and historical timezone changes. Returns empty array for invalid inputs.
 *
 * @curried (timeZone) => (startDate, endDate) => result
 * @param timeZone - The timezone identifier (e.g., "America/New_York")
 * @param startDate - Start date for transition search
 * @param endDate - End date for transition search
 * @returns Array of transition objects, or empty array if invalid
 * @example
 * ```typescript
 * // Get DST transitions for 2024 in New York
 * const nyTimeZone = "America/New_York"
 * const start2024 = Temporal.PlainDate.from("2024-01-01")
 * const end2024 = Temporal.PlainDate.from("2024-12-31")
 * getOffsetTransitions(nyTimeZone)(start2024, end2024)
 * // Returns array of transition objects with date, offset info, and type
 *
 * // Get transitions for London (BST)
 * const londonTimeZone = "Europe/London"
 * getOffsetTransitions(londonTimeZone)(start2024, end2024)
 * // Returns BST transition dates
 *
 * // No transitions for UTC
 * const utcTimeZone = "UTC"
 * getOffsetTransitions(utcTimeZone)(start2024, end2024)
 * // [] (UTC has no offset transitions)
 *
 * // Check if timezone observes DST
 * const observesDST = (timeZone: string, year: number): boolean => {
 *   const start = Temporal.PlainDate.from(`${year}-01-01`)
 *   const end = Temporal.PlainDate.from(`${year}-12-31`)
 *   const transitions = getOffsetTransitions(timeZone)(start, end)
 *   return transitions.length > 0
 * }
 *
 * observesDST("America/New_York", 2024)  // true
 * observesDST("America/Phoenix", 2024)   // false
 *
 * // Multi-timezone transition calendar (functional)
 * const getGlobalTransitions = (
 *   timeZones: Array<string>,
 *   year: number
 * ): Array<{ timeZone: string; date: Temporal.PlainDate; type: string }> => {
 *   const start = Temporal.PlainDate.from(`${year}-01-01`)
 *   const end = Temporal.PlainDate.from(`${year}-12-31`)
 *
 *   return timeZones.flatMap(timeZone =>
 *     getOffsetTransitions(timeZone)(start, end).map(t => ({
 *       timeZone,
 *       date: t.date,
 *       type: t.type
 *     }))
 *   ).sort((a, b) => Temporal.PlainDate.compare(a.date, b.date))
 * }
 *
 * // Timezone transition analytics (functional)
 * const analyzeTransitionPattern = (
 *   timeZone: string,
 *   startYear: number,
 *   endYear: number
 * ): {
 *   totalTransitions: number
 *   forwardTransitions: number
 *   backwardTransitions: number
 *   avgTransitionsPerYear: number
 * } => {
 *   const allTransitions = Array.from(
 *     { length: endYear - startYear + 1 },
 *     (_, i) => {
 *       const year = startYear + i
 *       const yearStart = Temporal.PlainDate.from(`${year}-01-01`)
 *       const yearEnd = Temporal.PlainDate.from(`${year}-12-31`)
 *       return getOffsetTransitions(timeZone)(yearStart, yearEnd)
 *     }
 *   ).flat()
 *
 *   const totalTransitions = allTransitions.length
 *   const forwardTransitions = allTransitions.filter(t => t.type === "forward").length
 *   const backwardTransitions = allTransitions.filter(t => t.type === "backward").length
 *   const years = endYear - startYear + 1
 *
 *   return {
 *     totalTransitions,
 *     forwardTransitions,
 *     backwardTransitions,
 *     avgTransitionsPerYear: totalTransitions / years
 *   }
 * }
 *
 * // Null handling
 * getOffsetTransitions("America/New_York")(null, end2024)  // []
 * getOffsetTransitions("Invalid/TimeZone")(start2024, end2024)  // []
 * ```
 * @pure
 * @safe Returns empty array for invalid inputs
 * @curried Easily composable for partial application
 * @comprehensive Includes transition type and offset information
 * @historical Works with historical timezone rule changes
 */
const getOffsetTransitions = (timeZone: string) =>
(
	startDate: Temporal.PlainDate | null | undefined,
	endDate: Temporal.PlainDate | null | undefined,
): Array<{
	date: Temporal.PlainDate
	offsetBefore: string
	offsetAfter: string
	type: "forward" | "backward"
}> => {
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

		// Check each day in the range for offset transitions (recursive)
		const checkTransitions = (
			current: Temporal.PlainDate,
			prevOffset: string | null,
			acc: Array<{
				date: Temporal.PlainDate
				offsetBefore: string
				offsetAfter: string
				type: "forward" | "backward"
			}>,
		): Array<{
			date: Temporal.PlainDate
			offsetBefore: string
			offsetAfter: string
			type: "forward" | "backward"
		}> => {
			if (Temporal.PlainDate.compare(current, endDate) > 0) {
				return acc
			}

			try {
				// Get the offset at noon on this date to avoid DST transition edge cases
				const dateTime = current.toPlainDateTime({ hour: 12 })
				const zonedDateTime = dateTime.toZonedDateTime(timeZone)
				const currentOffset = zonedDateTime.offset

				const newTransitions =
					!isNull(prevOffset) && prevOffset !== currentOffset
						? [...acc, {
							date: current,
							offsetBefore: prevOffset,
							offsetAfter: currentOffset,
							type: (prevOffset < currentOffset ? "forward" : "backward") as
								| "forward"
								| "backward",
						}]
						: acc

				return checkTransitions(
					current.add({ days: 1 }),
					currentOffset,
					newTransitions,
				)
			} catch {
				// Invalid timezone or date, skip this date
				return checkTransitions(
					current.add({ days: 1 }),
					prevOffset,
					acc,
				)
			}
		}

		return checkTransitions(startDate, null, [])
	} catch {
		return []
	}
}

export default getOffsetTransitions
