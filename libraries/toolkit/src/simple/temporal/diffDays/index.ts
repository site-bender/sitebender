/**
 * Calculates the difference in days between two dates
 *
 * Computes the number of days from the first date to the second date.
 * Returns a positive number if the second date is later, negative if
 * earlier. Works with PlainDate and PlainDateTime. Fractional days
 * are truncated for PlainDateTime comparisons. Returns null for invalid inputs.
 *
 * @curried (from) => (to) => result
 * @param from - The starting date
 * @param to - The ending date
 * @returns Number of days difference, or null if invalid
 * @example
 * ```typescript
 * // Basic usage with PlainDate
 * const date1 = Temporal.PlainDate.from("2024-03-01")
 * const date2 = Temporal.PlainDate.from("2024-03-15")
 * diffDays(date1)(date2)                  // 14 days
 * diffDays(date2)(date1)                  // -14 days
 * diffDays(date1)(date1)                  // 0 days
 *
 * // Month boundary crossing
 * const jan31 = Temporal.PlainDate.from("2024-01-31")
 * const feb15 = Temporal.PlainDate.from("2024-02-15")
 * diffDays(jan31)(feb15)                  // 15 days
 *
 * // Year boundary crossing
 * const dec25 = Temporal.PlainDate.from("2023-12-25")
 * const jan5 = Temporal.PlainDate.from("2024-01-05")
 * diffDays(dec25)(jan5)                   // 11 days
 *
 * // Leap year handling
 * const feb28_2024 = Temporal.PlainDate.from("2024-02-28")
 * const mar1_2024 = Temporal.PlainDate.from("2024-03-01")
 * diffDays(feb28_2024)(mar1_2024)         // 2 days (leap year)
 *
 * const feb28_2023 = Temporal.PlainDate.from("2023-02-28")
 * const mar1_2023 = Temporal.PlainDate.from("2023-03-01")
 * diffDays(feb28_2023)(mar1_2023)         // 1 day (non-leap year)
 *
 * // With PlainDateTime (time ignored, only dates considered)
 * const dt1 = Temporal.PlainDateTime.from("2024-03-15T08:00:00")
 * const dt2 = Temporal.PlainDateTime.from("2024-03-20T22:00:00")
 * diffDays(dt1)(dt2)                      // 5 days
 *
 * // Partial application for age calculations
 * const birthDate = Temporal.PlainDate.from("1990-06-15")
 * const daysSinceBirth = diffDays(birthDate)
 *
 * const today = Temporal.Now.plainDateISO()
 * daysSinceBirth(today)                   // Days since birth
 *
 * // Project duration
 * function getProjectDuration(
 *   startDate: Temporal.PlainDate,
 *   endDate: Temporal.PlainDate
 * ): number | null {
 *   return diffDays(startDate)(endDate)
 * }
 *
 * const projectStart = Temporal.PlainDate.from("2024-01-15")
 * const projectEnd = Temporal.PlainDate.from("2024-06-30")
 * getProjectDuration(projectStart, projectEnd)  // 166 days
 *
 * // Days until deadline
 * function daysUntilDeadline(
 *   deadline: Temporal.PlainDate
 * ): number | null {
 *   const today = Temporal.Now.plainDateISO()
 *   return diffDays(today)(deadline)
 * }
 *
 * const deadline = Temporal.PlainDate.from("2024-12-31")
 * daysUntilDeadline(deadline)             // Days remaining (positive if future)
 *
 * // Overdue calculations
 * function getDaysOverdue(
 *   dueDate: Temporal.PlainDate
 * ): number {
 *   const today = Temporal.Now.plainDateISO()
 *   const days = diffDays(dueDate)(today)
 *   return days && days > 0 ? days : 0
 * }
 *
 * const invoiceDue = Temporal.PlainDate.from("2024-02-15")
 * getDaysOverdue(invoiceDue)              // Days overdue (0 if not overdue)
 *
 * // Vacation day tracking
 * function getVacationDays(
 *   startDate: Temporal.PlainDate,
 *   endDate: Temporal.PlainDate
 * ): number | null {
 *   const totalDays = diffDays(startDate)(endDate)
 *   // Add 1 to include both start and end dates
 *   return totalDays !== null ? totalDays + 1 : null
 * }
 *
 * const vacationStart = Temporal.PlainDate.from("2024-07-01")
 * const vacationEnd = Temporal.PlainDate.from("2024-07-14")
 * getVacationDays(vacationStart, vacationEnd)  // 14 days
 *
 * // Hotel stay calculation
 * function getNightsStayed(
 *   checkIn: Temporal.PlainDate,
 *   checkOut: Temporal.PlainDate
 * ): number | null {
 *   return diffDays(checkIn)(checkOut)
 * }
 *
 * const checkIn = Temporal.PlainDate.from("2024-03-10")
 * const checkOut = Temporal.PlainDate.from("2024-03-15")
 * getNightsStayed(checkIn, checkOut)      // 5 nights
 *
 * // Subscription renewal
 * function getDaysUntilRenewal(
 *   lastRenewal: Temporal.PlainDate,
 *   renewalPeriodDays: number
 * ): number | null {
 *   const nextRenewal = lastRenewal.add({ days: renewalPeriodDays })
 *   const today = Temporal.Now.plainDateISO()
 *   return diffDays(today)(nextRenewal)
 * }
 *
 * const subscriptionDate = Temporal.PlainDate.from("2024-01-15")
 * getDaysUntilRenewal(subscriptionDate, 365)  // Days until annual renewal
 *
 * // Null handling
 * diffDays(null)(date2)                   // null
 * diffDays(date1)(null)                   // null
 * diffDays(null)(null)                    // null
 *
 * // Warranty expiration
 * function getWarrantyDaysRemaining(
 *   purchaseDate: Temporal.PlainDate,
 *   warrantyDays: number
 * ): number | null {
 *   const expiryDate = purchaseDate.add({ days: warrantyDays })
 *   const today = Temporal.Now.plainDateISO()
 *   const remaining = diffDays(today)(expiryDate)
 *   return remaining && remaining > 0 ? remaining : 0
 * }
 *
 * const purchase = Temporal.PlainDate.from("2023-03-15")
 * getWarrantyDaysRemaining(purchase, 365) // Days remaining in 1-year warranty
 *
 * // Business day calculation (simple version)
 * function getBusinessDaysDiff(
 *   start: Temporal.PlainDate,
 *   end: Temporal.PlainDate
 * ): number {
 *   const totalDays = diffDays(start)(end)
 *   if (totalDays === null || totalDays < 0) return 0
 *
 *   let businessDays = 0
 *   let current = start
 *
 *   for (let i = 0; i <= totalDays; i++) {
 *     if (current.dayOfWeek >= 1 && current.dayOfWeek <= 5) {
 *       businessDays++
 *     }
 *     current = current.add({ days: 1 })
 *   }
 *
 *   return businessDays
 * }
 *
 * // Interest calculation periods
 * function getInterestDays(
 *   principalDate: Temporal.PlainDate,
 *   calculationDate: Temporal.PlainDate
 * ): number | null {
 *   return diffDays(principalDate)(calculationDate)
 * }
 *
 * // Sprint burndown
 * function getSprintDaysRemaining(
 *   sprintStart: Temporal.PlainDate,
 *   sprintDurationDays: number
 * ): number | null {
 *   const sprintEnd = sprintStart.add({ days: sprintDurationDays - 1 })
 *   const today = Temporal.Now.plainDateISO()
 *   const remaining = diffDays(today)(sprintEnd)
 *   return remaining && remaining >= 0 ? remaining : 0
 * }
 *
 * const sprint = Temporal.PlainDate.from("2024-03-01")
 * getSprintDaysRemaining(sprint, 14)      // Days left in 2-week sprint
 *
 * // Historical age in days
 * function getAgeInDays(
 *   birthDate: Temporal.PlainDate
 * ): number | null {
 *   const today = Temporal.Now.plainDateISO()
 *   return diffDays(birthDate)(today)
 * }
 *
 * const birth = Temporal.PlainDate.from("2000-01-01")
 * getAgeInDays(birth)                     // Total days lived
 * ```
 * @property Pure - Always returns same result for same inputs
 * @property Signed - Returns negative for past dates, positive for future
 * @property Safe - Returns null for invalid inputs
 * @property Precise - Exact day count accounting for leap years
 */
const diffDays =
	(from: Temporal.PlainDate | Temporal.PlainDateTime | null | undefined) =>
	(
		to: Temporal.PlainDate | Temporal.PlainDateTime | null | undefined,
	): number | null => {
		if (from == null || to == null) {
			return null
		}

		// Convert PlainDateTime to PlainDate if needed
		let fromDate: Temporal.PlainDate
		let toDate: Temporal.PlainDate

		try {
			if (from instanceof Temporal.PlainDateTime) {
				fromDate = from.toPlainDate()
			} else if (from instanceof Temporal.PlainDate) {
				fromDate = from
			} else {
				return null
			}

			if (to instanceof Temporal.PlainDateTime) {
				toDate = to.toPlainDate()
			} else if (to instanceof Temporal.PlainDate) {
				toDate = to
			} else {
				return null
			}

			// Calculate difference in days
			const duration = toDate.since(fromDate, { largestUnit: "days" })
			return duration.days
		} catch {
			return null
		}
	}

export default diffDays
