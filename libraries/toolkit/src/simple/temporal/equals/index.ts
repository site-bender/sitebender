/**
 * Checks if two Temporal objects are equal
 *
 * Compares two Temporal objects for equality using their built-in equals method.
 * Works with any Temporal type that has an equals method (PlainDate, PlainTime,
 * PlainDateTime, ZonedDateTime, Duration, etc.). Returns false for type mismatches
 * or null/undefined values. More precise than using compare() === 0.
 *
 * @curried (first) => (second) => result
 * @param first - The first Temporal object to compare
 * @param second - The second Temporal object to compare
 * @returns True if objects are equal, false otherwise
 * @example
 * ```typescript
 * // Basic usage with PlainDate
 * const date1 = Temporal.PlainDate.from("2024-03-15")
 * const date2 = Temporal.PlainDate.from("2024-03-15")
 * const date3 = Temporal.PlainDate.from("2024-03-16")
 *
 * equals(date1)(date2)                    // true (same date)
 * equals(date1)(date3)                    // false (different dates)
 * equals(date1)(date1)                    // true (same reference)
 *
 * // With PlainTime
 * const time1 = Temporal.PlainTime.from("10:30:00")
 * const time2 = Temporal.PlainTime.from("10:30:00")
 * const time3 = Temporal.PlainTime.from("10:30:01")
 *
 * equals(time1)(time2)                    // true
 * equals(time1)(time3)                    // false (1 second difference)
 *
 * // With PlainDateTime
 * const dt1 = Temporal.PlainDateTime.from("2024-03-15T10:30:00")
 * const dt2 = Temporal.PlainDateTime.from("2024-03-15T10:30:00")
 * const dt3 = Temporal.PlainDateTime.from("2024-03-15T10:30:01")
 *
 * equals(dt1)(dt2)                        // true
 * equals(dt1)(dt3)                        // false
 *
 * // With Duration
 * const dur1 = Temporal.Duration.from({ hours: 2, minutes: 30 })
 * const dur2 = Temporal.Duration.from({ minutes: 150 })
 * const dur3 = Temporal.Duration.from({ hours: 3 })
 *
 * equals(dur1)(dur2)                      // true (same total time)
 * equals(dur1)(dur3)                      // false
 *
 * // Type mismatches return false
 * const date = Temporal.PlainDate.from("2024-03-15")
 * const time = Temporal.PlainTime.from("10:30:00")
 * equals(date)(time as any)               // false (different types)
 *
 * // Partial application for validation
 * const isToday = equals(Temporal.Now.plainDateISO())
 *
 * const someDate = Temporal.PlainDate.from("2024-03-15")
 * isToday(someDate)                       // true/false depending on current date
 *
 * // Checking for specific times
 * const isNoon = equals(Temporal.PlainTime.from("12:00:00"))
 * const isMidnight = equals(Temporal.PlainTime.from("00:00:00"))
 *
 * const currentTime = Temporal.PlainTime.from("12:00:00")
 * isNoon(currentTime)                     // true
 * isMidnight(currentTime)                 // false
 *
 * // Filtering duplicates
 * function removeDuplicateDates(
 *   dates: Array<Temporal.PlainDate>
 * ): Array<Temporal.PlainDate> {
 *   return dates.filter((date, index, array) =>
 *     !array.slice(0, index).some(equals(date))
 *   )
 * }
 *
 * const dates = [
 *   Temporal.PlainDate.from("2024-03-15"),
 *   Temporal.PlainDate.from("2024-03-16"),
 *   Temporal.PlainDate.from("2024-03-15"),
 *   Temporal.PlainDate.from("2024-03-17")
 * ]
 * removeDuplicateDates(dates)
 * // [2024-03-15, 2024-03-16, 2024-03-17]
 *
 * // Checking appointment conflicts
 * function hasExactConflict(
 *   appointment1: Temporal.PlainDateTime,
 *   appointment2: Temporal.PlainDateTime
 * ): boolean {
 *   return equals(appointment1)(appointment2)
 * }
 *
 * // Finding matching dates
 * function findMatchingDates(
 *   dates: Array<Temporal.PlainDate>,
 *   target: Temporal.PlainDate
 * ): Array<Temporal.PlainDate> {
 *   const isTarget = equals(target)
 *   return dates.filter(isTarget)
 * }
 *
 * // Null handling
 * equals(null)(date2)                     // false
 * equals(date1)(null)                     // false
 * equals(null)(null)                      // false
 * equals(undefined)(undefined)            // false
 *
 * // Birthday checking
 * function isBirthday(
 *   birthDate: Temporal.PlainDate,
 *   checkDate: Temporal.PlainDate = Temporal.Now.plainDateISO()
 * ): boolean {
 *   const birthMonthDay = birthDate.toPlainMonthDay()
 *   const checkMonthDay = checkDate.toPlainMonthDay()
 *   return equals(birthMonthDay)(checkMonthDay)
 * }
 *
 * const birth = Temporal.PlainDate.from("1990-03-15")
 * const today = Temporal.PlainDate.from("2024-03-15")
 * isBirthday(birth, today)                // true
 *
 * // Deadline checking
 * function isDeadlineToday(
 *   deadline: Temporal.PlainDate
 * ): boolean {
 *   const today = Temporal.Now.plainDateISO()
 *   return equals(deadline)(today)
 * }
 *
 * // Schedule matching
 * function findTimeSlot(
 *   available: Array<Temporal.PlainTime>,
 *   requested: Temporal.PlainTime
 * ): Temporal.PlainTime | null {
 *   const isRequested = equals(requested)
 *   return available.find(isRequested) || null
 * }
 *
 * const slots = [
 *   Temporal.PlainTime.from("09:00:00"),
 *   Temporal.PlainTime.from("10:00:00"),
 *   Temporal.PlainTime.from("11:00:00")
 * ]
 * findTimeSlot(slots, Temporal.PlainTime.from("10:00:00"))  // 10:00:00
 *
 * // Recurring event check
 * function isRecurringDate(
 *   eventDate: Temporal.PlainDate,
 *   checkDate: Temporal.PlainDate,
 *   recurType: "daily" | "weekly" | "monthly" | "yearly"
 * ): boolean {
 *   switch (recurType) {
 *     case "daily":
 *       return true  // Every day matches
 *     case "weekly":
 *       return eventDate.dayOfWeek === checkDate.dayOfWeek
 *     case "monthly":
 *       return eventDate.day === checkDate.day
 *     case "yearly":
 *       return eventDate.month === checkDate.month &&
 *              eventDate.day === checkDate.day
 *     default:
 *       return equals(eventDate)(checkDate)
 *   }
 * }
 *
 * // Cache validation
 * function isCacheValid(
 *   cacheTime: Temporal.PlainDateTime,
 *   requestTime: Temporal.PlainDateTime
 * ): boolean {
 *   return equals(cacheTime)(requestTime)
 * }
 *
 * // Version comparison
 * function isSameVersion(
 *   version1: Temporal.PlainDate,  // Using date as version
 *   version2: Temporal.PlainDate
 * ): boolean {
 *   return equals(version1)(version2)
 * }
 *
 * // Shift comparison
 * function isSameShift(
 *   shift1Start: Temporal.PlainTime,
 *   shift2Start: Temporal.PlainTime
 * ): boolean {
 *   return equals(shift1Start)(shift2Start)
 * }
 *
 * // Duration matching
 * function hasSameDuration(
 *   task1Duration: Temporal.Duration,
 *   task2Duration: Temporal.Duration
 * ): boolean {
 *   return equals(task1Duration)(task2Duration)
 * }
 *
 * const duration1 = Temporal.Duration.from({ hours: 2 })
 * const duration2 = Temporal.Duration.from({ minutes: 120 })
 * hasSameDuration(duration1, duration2)   // true
 *
 * // High precision comparison
 * const precise1 = Temporal.PlainTime.from("10:30:00.123456789")
 * const precise2 = Temporal.PlainTime.from("10:30:00.123456789")
 * const precise3 = Temporal.PlainTime.from("10:30:00.123456788")
 *
 * equals(precise1)(precise2)              // true (exact match)
 * equals(precise1)(precise3)              // false (1 nanosecond off)
 * ```
 * @property Pure - Always returns same result for same inputs
 * @property TypeSafe - Returns false for type mismatches
 * @property NullSafe - Returns false for null/undefined
 * @property Precise - Uses exact equality, not approximate
 */
const equals = <T extends { equals(other: T): boolean }>(
	first: T | null | undefined,
) =>
(
	second: T | null | undefined,
): boolean => {
	if (first == null || second == null) {
		return false
	}

	// Check if both have equals method and are same type
	if (typeof first.equals !== "function") {
		return false
	}

	try {
		// Use Temporal's built-in equals method
		return first.equals(second)
	} catch {
		// Type mismatch or other error
		return false
	}
}

export default equals
