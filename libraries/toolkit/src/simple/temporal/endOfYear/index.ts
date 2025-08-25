/**
 * Returns the last day of the year for a given date
 *
 * Creates a PlainDate representing December 31st of the year for the given date.
 * Useful for annual reports, fiscal year calculations, and year-end processing.
 * Works with PlainDate, PlainDateTime, and PlainYearMonth. Returns null for invalid inputs.
 *
 * @param date - The date to get end of year for
 * @returns PlainDate of December 31st of that year, or null if invalid
 * @example
 * ```typescript
 * // Basic usage with PlainDate
 * const date = Temporal.PlainDate.from("2024-03-15")
 * endOfYear(date)                         // PlainDate 2024-12-31
 *
 * const january = Temporal.PlainDate.from("2024-01-01")
 * endOfYear(january)                      // PlainDate 2024-12-31
 *
 * const december = Temporal.PlainDate.from("2024-12-15")
 * endOfYear(december)                     // PlainDate 2024-12-31
 *
 * // With PlainDateTime (returns PlainDate)
 * const datetime = Temporal.PlainDateTime.from("2024-06-15T10:30:00")
 * endOfYear(datetime)                     // PlainDate 2024-12-31
 *
 * // With PlainYearMonth
 * const yearMonth = Temporal.PlainYearMonth.from("2024-06")
 * endOfYear(yearMonth)                    // PlainDate 2024-12-31
 *
 * // Current year's end
 * const today = Temporal.Now.plainDateISO()
 * const yearEnd = endOfYear(today)        // December 31st of current year
 *
 * // Days remaining in year
 * function getDaysRemainingInYear(
 *   date: Temporal.PlainDate
 * ): number {
 *   const lastDay = endOfYear(date)
 *   if (!lastDay) return 0
 *
 *   return date.until(lastDay).days + 1  // Include today
 * }
 *
 * const midYear = Temporal.PlainDate.from("2024-07-01")
 * getDaysRemainingInYear(midYear)         // 184 days (including July 1)
 *
 * // Fiscal year end (calendar year)
 * function getFiscalYearEnd(
 *   date: Temporal.PlainDate,
 *   fiscalYearEndMonth: number = 12
 * ): Temporal.PlainDate | null {
 *   if (fiscalYearEndMonth === 12) {
 *     return endOfYear(date)
 *   }
 *
 *   // Non-calendar fiscal year
 *   const year = date.month <= fiscalYearEndMonth ? date.year : date.year + 1
 *   const fiscalEnd = Temporal.PlainYearMonth.from({ year, month: fiscalYearEndMonth })
 *   return fiscalEnd.toPlainDate({ day: fiscalEnd.daysInMonth })
 * }
 *
 * const q2Date = Temporal.PlainDate.from("2024-04-15")
 * getFiscalYearEnd(q2Date, 12)            // PlainDate 2024-12-31 (calendar year)
 * getFiscalYearEnd(q2Date, 3)             // PlainDate 2025-03-31 (fiscal year)
 *
 * // Annual report deadline
 * function getAnnualReportDeadline(
 *   year: number
 * ): Temporal.PlainDate | null {
 *   const anyDateInYear = Temporal.PlainDate.from({ year, month: 1, day: 1 })
 *   return endOfYear(anyDateInYear)
 * }
 *
 * getAnnualReportDeadline(2024)           // PlainDate 2024-12-31
 * getAnnualReportDeadline(2025)           // PlainDate 2025-12-31
 *
 * // Tax year end
 * function getTaxYearEnd(
 *   date: Temporal.PlainDate,
 *   country: "US" | "UK" | "AU" = "US"
 * ): Temporal.PlainDate | null {
 *   switch (country) {
 *     case "US":
 *       return endOfYear(date)  // December 31
 *     case "UK":
 *       // UK tax year ends April 5
 *       const ukYear = date.month <= 4 && date.day <= 5 ? date.year : date.year + 1
 *       return Temporal.PlainDate.from({ year: ukYear, month: 4, day: 5 })
 *     case "AU":
 *       // Australia tax year ends June 30
 *       const auYear = date.month <= 6 ? date.year : date.year + 1
 *       return Temporal.PlainDate.from({ year: auYear, month: 6, day: 30 })
 *     default:
 *       return endOfYear(date)
 *   }
 * }
 *
 * // Null handling
 * endOfYear(null)                         // null
 * endOfYear(undefined)                    // null
 *
 * // Contract expiration
 * function getContractYearEnd(
 *   contractDate: Temporal.PlainDate
 * ): Temporal.PlainDate | null {
 *   return endOfYear(contractDate)
 * }
 *
 * // Academic year (Northern Hemisphere)
 * function getAcademicYearEnd(
 *   date: Temporal.PlainDate,
 *   isNorthernHemisphere: boolean = true
 * ): Temporal.PlainDate | null {
 *   if (isNorthernHemisphere) {
 *     // Academic year ends in May/June
 *     const year = date.month >= 9 ? date.year + 1 : date.year
 *     return Temporal.PlainDate.from({ year, month: 6, day: 30 })
 *   } else {
 *     // Southern hemisphere: ends in December
 *     return endOfYear(date)
 *   }
 * }
 *
 * // Budget period
 * function getBudgetYearEnd(
 *   date: Temporal.PlainDate,
 *   budgetYearStart: number = 1  // January default
 * ): Temporal.PlainDate | null {
 *   if (budgetYearStart === 1) {
 *     return endOfYear(date)
 *   }
 *
 *   // Custom budget year
 *   const year = date.month >= budgetYearStart ? date.year + 1 : date.year
 *   const endMonth = budgetYearStart === 1 ? 12 : budgetYearStart - 1
 *   const yearMonth = Temporal.PlainYearMonth.from({ year, month: endMonth })
 *   return yearMonth.toPlainDate({ day: yearMonth.daysInMonth })
 * }
 *
 * // Performance review period
 * function getReviewPeriodEnd(
 *   hireDate: Temporal.PlainDate
 * ): Temporal.PlainDate | null {
 *   // Annual reviews at year end
 *   return endOfYear(Temporal.Now.plainDateISO())
 * }
 *
 * // Depreciation calculation
 * function getDepreciationYearEnd(
 *   assetPurchaseDate: Temporal.PlainDate
 * ): Temporal.PlainDate | null {
 *   return endOfYear(assetPurchaseDate)
 * }
 *
 * // Insurance policy year
 * function getPolicyYearEnd(
 *   policyStartDate: Temporal.PlainDate
 * ): Temporal.PlainDate | null {
 *   // Policies often align with calendar year
 *   return endOfYear(policyStartDate)
 * }
 *
 * // Membership expiration
 * function getMembershipYearEnd(
 *   joinDate: Temporal.PlainDate,
 *   isCalendarYear: boolean = true
 * ): Temporal.PlainDate | null {
 *   if (isCalendarYear) {
 *     return endOfYear(joinDate)
 *   }
 *   // Anniversary-based membership
 *   return joinDate.add({ years: 1, days: -1 })
 * }
 *
 * // Statistical year end
 * function getStatisticalYearEnd(
 *   dataDate: Temporal.PlainDate
 * ): Temporal.PlainDate | null {
 *   return endOfYear(dataDate)
 * }
 *
 * // Archive cutoff
 * function getArchiveYearEnd(
 *   date: Temporal.PlainDate
 * ): Temporal.PlainDateTime | null {
 *   const yearEnd = endOfYear(date)
 *   return yearEnd ?
 *     yearEnd.toPlainDateTime(Temporal.PlainTime.from("23:59:59")) :
 *     null
 * }
 *
 * // Quarterly comparison
 * function getQuartersInYear(
 *   year: number
 * ): Array<{ quarter: number; end: Temporal.PlainDate }> {
 *   return [
 *     { quarter: 1, end: Temporal.PlainDate.from({ year, month: 3, day: 31 }) },
 *     { quarter: 2, end: Temporal.PlainDate.from({ year, month: 6, day: 30 }) },
 *     { quarter: 3, end: Temporal.PlainDate.from({ year, month: 9, day: 30 }) },
 *     { quarter: 4, end: endOfYear(Temporal.PlainDate.from({ year, month: 1, day: 1 })) || Temporal.PlainDate.from({ year, month: 12, day: 31 }) }
 *   ]
 * }
 *
 * // Bonus calculation period
 * function getBonusPeriodEnd(
 *   date: Temporal.PlainDate
 * ): Temporal.PlainDate | null {
 *   // Annual bonuses calculated at year end
 *   return endOfYear(date)
 * }
 *
 * // Project fiscal year
 * function getProjectFiscalYearEnd(
 *   projectDate: Temporal.PlainDate,
 *   fiscalMonth: number = 12
 * ): Temporal.PlainDate | null {
 *   if (fiscalMonth === 12) {
 *     return endOfYear(projectDate)
 *   }
 *
 *   const year = projectDate.month > fiscalMonth ? projectDate.year + 1 : projectDate.year
 *   return Temporal.PlainDate.from({ year, month: fiscalMonth, day: 31 })
 *     .with({ day: Temporal.PlainDate.from({ year, month: fiscalMonth, day: 1 }).daysInMonth })
 * }
 * ```
 * @property Pure - Always returns same result for same inputs
 * @property Immutable - Returns new date without modifying input
 * @property Safe - Returns null for invalid inputs
 * @property Simple - Always returns December 31st of the year
 */
const endOfYear = (
	date:
		| Temporal.PlainDate
		| Temporal.PlainDateTime
		| Temporal.PlainYearMonth
		| null
		| undefined,
): Temporal.PlainDate | null => {
	if (date == null) {
		return null
	}

	try {
		// Get the year
		let year: number

		if (date instanceof Temporal.PlainDateTime) {
			year = date.year
		} else if (date instanceof Temporal.PlainDate) {
			year = date.year
		} else if (date instanceof Temporal.PlainYearMonth) {
			year = date.year
		} else {
			return null
		}

		// Return December 31st of that year
		return Temporal.PlainDate.from({ year, month: 12, day: 31 })
	} catch {
		return null
	}
}

export default endOfYear
