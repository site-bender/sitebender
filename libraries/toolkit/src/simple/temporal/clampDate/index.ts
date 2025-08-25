/**
 * Constrains a date between minimum and maximum bounds
 *
 * Immutably clamps a Temporal date or datetime to fall within the specified
 * range. If the date is before the minimum, returns the minimum. If after
 * the maximum, returns the maximum. Otherwise returns the original date.
 * Works with PlainDate, PlainDateTime, PlainTime, and other Temporal types.
 * Returns null for invalid inputs to support safe error handling.
 *
 * @curried (min) => (max) => (date) => result
 * @param min - The minimum bound (inclusive)
 * @param max - The maximum bound (inclusive)
 * @param date - The date/time to constrain
 * @returns Date constrained to range, or null if invalid
 * @example
 * ```typescript
 * // Basic usage with PlainDate
 * const min = Temporal.PlainDate.from("2024-01-01")
 * const max = Temporal.PlainDate.from("2024-12-31")
 * const clamp2024 = clampDate(min)(max)
 *
 * clamp2024(Temporal.PlainDate.from("2024-06-15"))  // PlainDate 2024-06-15 (within range)
 * clamp2024(Temporal.PlainDate.from("2023-11-01"))  // PlainDate 2024-01-01 (clamped to min)
 * clamp2024(Temporal.PlainDate.from("2025-02-01"))  // PlainDate 2024-12-31 (clamped to max)
 *
 * // With PlainDateTime
 * const minTime = Temporal.PlainDateTime.from("2024-03-15T09:00:00")
 * const maxTime = Temporal.PlainDateTime.from("2024-03-15T17:00:00")
 * const clampBusinessHours = clampDate(minTime)(maxTime)
 *
 * clampBusinessHours(Temporal.PlainDateTime.from("2024-03-15T10:30:00"))
 * // PlainDateTime 2024-03-15T10:30:00 (within hours)
 *
 * clampBusinessHours(Temporal.PlainDateTime.from("2024-03-15T07:00:00"))
 * // PlainDateTime 2024-03-15T09:00:00 (clamped to start)
 *
 * clampBusinessHours(Temporal.PlainDateTime.from("2024-03-15T20:00:00"))
 * // PlainDateTime 2024-03-15T17:00:00 (clamped to end)
 *
 * // With PlainTime
 * const minWorkTime = Temporal.PlainTime.from("09:00:00")
 * const maxWorkTime = Temporal.PlainTime.from("17:00:00")
 * const clampWorkHours = clampDate(minWorkTime)(maxWorkTime)
 *
 * clampWorkHours(Temporal.PlainTime.from("12:00:00"))  // PlainTime 12:00:00
 * clampWorkHours(Temporal.PlainTime.from("06:00:00"))  // PlainTime 09:00:00
 * clampWorkHours(Temporal.PlainTime.from("22:00:00"))  // PlainTime 17:00:00
 *
 * // Fiscal year constraints
 * const fiscalStart = Temporal.PlainDate.from("2024-04-01")
 * const fiscalEnd = Temporal.PlainDate.from("2025-03-31")
 * const clampToFiscalYear = clampDate(fiscalStart)(fiscalEnd)
 *
 * const transactions = [
 *   Temporal.PlainDate.from("2024-03-15"),  // Before fiscal year
 *   Temporal.PlainDate.from("2024-07-15"),  // Within fiscal year
 *   Temporal.PlainDate.from("2025-04-15")   // After fiscal year
 * ].map(clampToFiscalYear)
 * // [2024-04-01, 2024-07-15, 2025-03-31]
 *
 * // Age restrictions
 * function enforceAgeLimit(
 *   birthDate: Temporal.PlainDate,
 *   minAge: number = 18,
 *   maxAge: number = 65
 * ): Temporal.PlainDate | null {
 *   const today = Temporal.Now.plainDateISO()
 *   const maxBirth = today.subtract({ years: minAge })
 *   const minBirth = today.subtract({ years: maxAge })
 *
 *   return clampDate(minBirth)(maxBirth)(birthDate)
 * }
 *
 * // Valid date range for form inputs
 * const today = Temporal.Now.plainDateISO()
 * const oneYearAgo = today.subtract({ years: 1 })
 * const oneYearAhead = today.add({ years: 1 })
 * const clampToValidRange = clampDate(oneYearAgo)(oneYearAhead)
 *
 * // Appointment scheduling constraints
 * function constrainAppointment(
 *   requested: Temporal.PlainDateTime,
 *   earliestSlot: Temporal.PlainDateTime,
 *   latestSlot: Temporal.PlainDateTime
 * ): Temporal.PlainDateTime | null {
 *   return clampDate(earliestSlot)(latestSlot)(requested)
 * }
 *
 * const requested = Temporal.PlainDateTime.from("2024-03-15T08:00:00")
 * const earliest = Temporal.PlainDateTime.from("2024-03-15T09:00:00")
 * const latest = Temporal.PlainDateTime.from("2024-03-15T16:00:00")
 * constrainAppointment(requested, earliest, latest)
 * // PlainDateTime 2024-03-15T09:00:00 (clamped to earliest)
 *
 * // Historical data bounds
 * const historicalMin = Temporal.PlainDate.from("2000-01-01")
 * const historicalMax = Temporal.Now.plainDateISO()
 * const clampToHistorical = clampDate(historicalMin)(historicalMax)
 *
 * const dates = [
 *   Temporal.PlainDate.from("1995-06-15"),
 *   Temporal.PlainDate.from("2010-03-20"),
 *   Temporal.PlainDate.from("2025-01-01")
 * ].map(clampToHistorical)
 * // [2000-01-01, 2010-03-20, today's date]
 *
 * // Booking window enforcement
 * function enforceBookingWindow(
 *   requestedDate: Temporal.PlainDate,
 *   daysAhead: number = 90
 * ): Temporal.PlainDate | null {
 *   const today = Temporal.Now.plainDateISO()
 *   const tomorrow = today.add({ days: 1 })
 *   const maxBooking = today.add({ days: daysAhead })
 *
 *   return clampDate(tomorrow)(maxBooking)(requestedDate)
 * }
 *
 * // Contract period enforcement
 * const contractStart = Temporal.PlainDate.from("2024-01-01")
 * const contractEnd = Temporal.PlainDate.from("2024-12-31")
 * const clampToContract = clampDate(contractStart)(contractEnd)
 *
 * function billableDate(
 *   serviceDate: Temporal.PlainDate
 * ): Temporal.PlainDate | null {
 *   return clampToContract(serviceDate)
 * }
 *
 * // Null handling
 * clampDate(min)(max)(null)               // null
 * clampDate(min)(max)(undefined)          // null
 * clampDate(null)(max)(date)              // null
 * clampDate(min)(null)(date)              // null
 *
 * // School year boundaries
 * const schoolYearStart = Temporal.PlainDate.from("2023-09-01")
 * const schoolYearEnd = Temporal.PlainDate.from("2024-06-30")
 * const clampToSchoolYear = clampDate(schoolYearStart)(schoolYearEnd)
 *
 * const eventDates = [
 *   Temporal.PlainDate.from("2023-08-15"),
 *   Temporal.PlainDate.from("2024-01-15"),
 *   Temporal.PlainDate.from("2024-07-15")
 * ].map(clampToSchoolYear)
 * // [2023-09-01, 2024-01-15, 2024-06-30]
 *
 * // Trading hours enforcement
 * const marketOpen = Temporal.PlainTime.from("09:30:00")
 * const marketClose = Temporal.PlainTime.from("16:00:00")
 * const clampToTradingHours = clampDate(marketOpen)(marketClose)
 *
 * function getExecutionTime(
 *   orderTime: Temporal.PlainTime
 * ): Temporal.PlainTime | null {
 *   return clampToTradingHours(orderTime)
 * }
 *
 * getExecutionTime(Temporal.PlainTime.from("08:00:00"))  // PlainTime 09:30:00
 * getExecutionTime(Temporal.PlainTime.from("14:30:00"))  // PlainTime 14:30:00
 * getExecutionTime(Temporal.PlainTime.from("18:00:00"))  // PlainTime 16:00:00
 *
 * // Partial application patterns
 * const clampToThisYear = clampDate(
 *   Temporal.PlainDate.from("2024-01-01")
 * )(
 *   Temporal.PlainDate.from("2024-12-31")
 * )
 *
 * const clampToBusinessDay = clampDate(
 *   Temporal.PlainTime.from("09:00:00")
 * )(
 *   Temporal.PlainTime.from("17:00:00")
 * )
 *
 * // Validation helper
 * function isWithinBounds<T extends {
 *   compare(other: T): number
 * }>(
 *   value: T,
 *   min: T,
 *   max: T
 * ): boolean {
 *   const clamped = clampDate(min)(max)(value)
 *   return clamped === value
 * }
 * ```
 * @property Pure - Always returns same result for same inputs
 * @property Immutable - Returns constrained value without modifying original
 * @property Safe - Returns null for invalid inputs
 * @property Generic - Works with any Temporal type that supports comparison
 */
const clampDate = <
	T extends {
		compare(other: T): number
	},
>(min: T | null | undefined) =>
(max: T | null | undefined) =>
(date: T | null | undefined): T | null => {
	if (min == null || max == null || date == null) {
		return null
	}

	// Ensure all parameters have a compare method
	if (
		typeof min.compare !== "function" ||
		typeof max.compare !== "function" ||
		typeof date.compare !== "function"
	) {
		return null
	}

	try {
		// Compare with minimum
		if (date.compare(min) < 0) {
			return min
		}

		// Compare with maximum
		if (date.compare(max) > 0) {
			return max
		}

		// Within bounds
		return date
	} catch {
		return null
	}
}

export default clampDate
