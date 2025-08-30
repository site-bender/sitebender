/**
 * Finds next occurrence of a recurring event
 *
 * Calculates the next occurrence of a recurring event based on a reference
 * date and recurrence pattern. Supports daily, weekly, monthly, and yearly
 * recurrence with optional intervals (e.g., every 2 weeks). Returns null
 * for invalid inputs to support safe error handling. Uses Temporal API
 * for precise date calculations across calendar boundaries.
 *
 * @curried (pattern) => (referenceDate) => result
 * @param pattern - Recurrence pattern configuration
 * @param referenceDate - Starting date to calculate next occurrence from
 * @returns Next occurrence date, or null if invalid
 * @example
 * ```typescript
 * // Daily recurrence
 * const dailyPattern = { unit: "days", interval: 1 }
 * const today = Temporal.PlainDate.from("2024-03-15")
 * getNextOccurrence(dailyPattern)(today)
 * // PlainDate 2024-03-16
 *
 * // Weekly recurrence
 * const weeklyPattern = { unit: "weeks", interval: 1 }
 * getNextOccurrence(weeklyPattern)(today)
 * // PlainDate 2024-03-22
 *
 * // Monthly recurrence
 * const monthlyPattern = { unit: "months", interval: 1 }
 * getNextOccurrence(monthlyPattern)(today)
 * // PlainDate 2024-04-15
 *
 * // Quarterly (every 3 months)
 * const quarterlyPattern = { unit: "months", interval: 3 }
 * getNextOccurrence(quarterlyPattern)(today)
 * // PlainDate 2024-06-15
 *
 * // Yearly recurrence
 * const yearlyPattern = { unit: "years", interval: 1 }
 * getNextOccurrence(yearlyPattern)(today)
 * // PlainDate 2025-03-15
 *
 * // Edge cases - month boundaries
 * const monthEnd = Temporal.PlainDate.from("2024-01-31")
 * const monthlyFromEnd = { unit: "months", interval: 1 }
 * getNextOccurrence(monthlyFromEnd)(monthEnd)
 * // PlainDate 2024-02-29 (leap year, closest valid date)
 *
 * // Schedule generation (functional)
 * const generateSchedule = (
 *   pattern: { unit: string; interval: number },
 *   startDate: Temporal.PlainDate,
 *   occurrences: number
 * ): Array<Temporal.PlainDate> => {
 *   const generateDates = (
 *     current: Temporal.PlainDate,
 *     remaining: number,
 *     acc: Array<Temporal.PlainDate>
 *   ): Array<Temporal.PlainDate> => {
 *     if (remaining <= 0) return acc
 *     const next = getNextOccurrence(pattern)(current)
 *     return next
 *       ? generateDates(next, remaining - 1, [...acc, next])
 *       : acc
 *   }
 *   return [startDate, ...generateDates(startDate, occurrences - 1, [])]
 * }
 *
 * // Partial application for specific patterns
 * const nextDaily = getNextOccurrence({ unit: "days", interval: 1 })
 * const nextWeekly = getNextOccurrence({ unit: "weeks", interval: 1 })
 * const nextMonthly = getNextOccurrence({ unit: "months", interval: 1 })
 *
 * const baseDate = Temporal.PlainDate.from("2024-03-15")
 * nextDaily(baseDate)    // 2024-03-16
 * nextWeekly(baseDate)   // 2024-03-22
 * nextMonthly(baseDate)  // 2024-04-15
 *
 * // Null handling
 * getNextOccurrence({ unit: "days", interval: 1 })(null)  // null
 * getNextOccurrence({ unit: "days", interval: 0 })(today) // null
 * ```
 * @pure
 * @safe Returns null for invalid inputs
 * @curried Easily composable for partial application
 * @precise Uses Temporal API for accurate calendar calculations
 * @flexible Supports various recurrence patterns and intervals
 */
import { isNullish } from "../../../validation/isNullish"

const getNextOccurrence = (pattern: {
	unit: string
	interval: number
}) =>
(
	referenceDate: Temporal.PlainDate | null | undefined,
): Temporal.PlainDate | null => {
	if (isNullish(referenceDate)) {
		return null
	}

	if (!(referenceDate instanceof Temporal.PlainDate)) {
		return null
	}

	// Validate pattern
	if (
		!pattern || typeof pattern.unit !== "string" ||
		typeof pattern.interval !== "number"
	) {
		return null
	}

	if (pattern.interval <= 0) {
		return null
	}

	try {
		// Build duration object based on unit and interval
		switch (pattern.unit) {
			case "days":
				return referenceDate.add({ days: pattern.interval })

			case "weeks":
				return referenceDate.add({ weeks: pattern.interval })

			case "months":
				return referenceDate.add({ months: pattern.interval })

			case "years":
				return referenceDate.add({ years: pattern.interval })

			default:
				return null
		}
	} catch {
		return null
	}
}

export default getNextOccurrence
