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
 * // [
 * //   {
 * //     date: PlainDate 2024-03-10,
 * //     offsetBefore: "-05:00",
 * //     offsetAfter: "-04:00",
 * //     type: "forward" // Spring forward
 * //   },
 * //   {
 * //     date: PlainDate 2024-11-03,
 * //     offsetBefore: "-04:00", 
 * //     offsetAfter: "-05:00",
 * //     type: "backward" // Fall back
 * //   }
 * // ]
 * 
 * // Get transitions for London (BST)
 * const londonTimeZone = "Europe/London"
 * getOffsetTransitions(londonTimeZone)(start2024, end2024)
 * // [
 * //   {
 * //     date: PlainDate 2024-03-31,
 * //     offsetBefore: "+00:00",
 * //     offsetAfter: "+01:00", 
 * //     type: "forward"
 * //   },
 * //   {
 * //     date: PlainDate 2024-10-27,
 * //     offsetBefore: "+01:00",
 * //     offsetAfter: "+00:00",
 * //     type: "backward"
 * //   }
 * // ]
 * 
 * // Get transitions for Sydney (AEDT/AEST)
 * const sydneyTimeZone = "Australia/Sydney"
 * getOffsetTransitions(sydneyTimeZone)(start2024, end2024)
 * // [
 * //   {
 * //     date: PlainDate 2024-04-07,
 * //     offsetBefore: "+11:00",
 * //     offsetAfter: "+10:00",
 * //     type: "backward" // End DST (Southern Hemisphere)
 * //   },
 * //   {
 * //     date: PlainDate 2024-10-06,
 * //     offsetBefore: "+10:00",
 * //     offsetAfter: "+11:00",
 * //     type: "forward" // Start DST
 * //   }
 * // ]
 * 
 * // No transitions for UTC
 * const utcTimeZone = "UTC"
 * getOffsetTransitions(utcTimeZone)(start2024, end2024)
 * // [] (UTC has no offset transitions)
 * 
 * // Arizona doesn't observe DST
 * const arizonaTimeZone = "America/Phoenix"
 * getOffsetTransitions(arizonaTimeZone)(start2024, end2024)
 * // [] (Arizona doesn't change offsets)
 * 
 * // Historical transitions (timezone rule changes)
 * const historicalStart = Temporal.PlainDate.from("2005-01-01")
 * const historicalEnd = Temporal.PlainDate.from("2008-12-31")
 * getOffsetTransitions(nyTimeZone)(historicalStart, historicalEnd)
 * // Will include the 2007 DST rule change in the US
 * 
 * // Single year analysis
 * const currentYear = Temporal.Now.plainDateISO().year
 * const yearStart = Temporal.PlainDate.from(`${currentYear}-01-01`)
 * const yearEnd = Temporal.PlainDate.from(`${currentYear}-12-31`)
 * const currentYearTransitions = getOffsetTransitions(nyTimeZone)(yearStart, yearEnd)
 * 
 * // Check if timezone observes DST
 * function observesDST(timeZone: string, year: number): boolean {
 *   const start = Temporal.PlainDate.from(`${year}-01-01`)
 *   const end = Temporal.PlainDate.from(`${year}-12-31`)
 *   const transitions = getOffsetTransitions(timeZone)(start, end)
 *   return transitions.length > 0
 * }
 * 
 * observesDST("America/New_York", 2024)  // true
 * observesDST("America/Phoenix", 2024)   // false
 * observesDST("UTC", 2024)               // false
 * 
 * // Find next DST transition
 * function getNextDSTTransition(
 *   timeZone: string,
 *   fromDate: Temporal.PlainDate
 * ): { date: Temporal.PlainDate; type: string } | null {
 *   const oneYearLater = fromDate.add({ years: 1 })
 *   const transitions = getOffsetTransitions(timeZone)(fromDate, oneYearLater)
 *   
 *   const nextTransition = transitions.find(t => 
 *     Temporal.PlainDate.compare(t.date, fromDate) > 0
 *   )
 *   
 *   return nextTransition ? {
 *     date: nextTransition.date,
 *     type: nextTransition.type
 *   } : null
 * }
 * 
 * const today = Temporal.Now.plainDateISO()
 * const nextNYTransition = getNextDSTTransition("America/New_York", today)
 * 
 * // Business logic: avoid scheduling during DST transitions
 * function isSafeDateForScheduling(
 *   timeZone: string,
 *   date: Temporal.PlainDate
 * ): boolean {
 *   const dayBefore = date.subtract({ days: 1 })
 *   const dayAfter = date.add({ days: 1 })
 *   const transitions = getOffsetTransitions(timeZone)(dayBefore, dayAfter)
 *   
 *   return !transitions.some(t => 
 *     Temporal.PlainDate.compare(t.date, date) === 0
 *   )
 * }
 * 
 * // DST transition summary for year
 * function getDSTSummary(
 *   timeZone: string,
 *   year: number
 * ): { forward?: Temporal.PlainDate; backward?: Temporal.PlainDate } {
 *   const start = Temporal.PlainDate.from(`${year}-01-01`)
 *   const end = Temporal.PlainDate.from(`${year}-12-31`)
 *   const transitions = getOffsetTransitions(timeZone)(start, end)
 *   
 *   const forward = transitions.find(t => t.type === "forward")
 *   const backward = transitions.find(t => t.type === "backward")
 *   
 *   return {
 *     ...(forward && { forward: forward.date }),
 *     ...(backward && { backward: backward.date })
 *   }
 * }
 * 
 * getDSTSummary("America/New_York", 2024)
 * // { forward: PlainDate 2024-03-10, backward: PlainDate 2024-11-03 }
 * 
 * // Multi-timezone transition calendar
 * function getGlobalTransitions(
 *   timeZones: Array<string>,
 *   year: number
 * ): Array<{ timeZone: string; date: Temporal.PlainDate; type: string }> {
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
 * const majorTimeZones = [
 *   "America/New_York",
 *   "Europe/London", 
 *   "Australia/Sydney",
 *   "Asia/Tokyo"
 * ]
 * const globalTransitions2024 = getGlobalTransitions(majorTimeZones, 2024)
 * 
 * // Null/undefined handling
 * getOffsetTransitions("America/New_York")(null, end2024)
 * // []
 * 
 * getOffsetTransitions("America/New_York")(start2024, null)
 * // []
 * 
 * // Invalid timezone handling
 * getOffsetTransitions("Invalid/TimeZone")(start2024, end2024)
 * // []
 * 
 * // Invalid date range (end before start)
 * getOffsetTransitions("America/New_York")(end2024, start2024)
 * // []
 * 
 * // Partial application for specific timezone
 * const getNYTransitions = getOffsetTransitions("America/New_York")
 * const ny2024Transitions = getNYTransitions(start2024, end2024)
 * const ny2025Transitions = getNYTransitions(
 *   Temporal.PlainDate.from("2025-01-01"),
 *   Temporal.PlainDate.from("2025-12-31")
 * )
 * 
 * // Timezone transition analytics
 * function analyzeTransitionPattern(
 *   timeZone: string,
 *   startYear: number,
 *   endYear: number
 * ): {
 *   totalTransitions: number
 *   forwardTransitions: number
 *   backwardTransitions: number
 *   avgTransitionsPerYear: number
 * } {
 *   const allTransitions = []
 *   
 *   for (let year = startYear; year <= endYear; year++) {
 *     const yearStart = Temporal.PlainDate.from(`${year}-01-01`)
 *     const yearEnd = Temporal.PlainDate.from(`${year}-12-31`)
 *     allTransitions.push(...getOffsetTransitions(timeZone)(yearStart, yearEnd))
 *   }
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
 * // Analyze DST pattern for New York from 2020-2024
 * const nyPattern = analyzeTransitionPattern("America/New_York", 2020, 2024)
 * // { totalTransitions: 10, forwardTransitions: 5, backwardTransitions: 5, avgTransitionsPerYear: 2 }
 * ```
 * @property Pure - Always returns same result for same inputs
 * @property Safe - Returns empty array for invalid inputs  
 * @property Curried - Easily composable for partial application
 * @property Comprehensive - Includes transition type and offset information
 * @property Historical - Works with historical timezone rule changes
 */
const getOffsetTransitions = (timeZone: string) => (
	startDate: Temporal.PlainDate | null | undefined,
	endDate: Temporal.PlainDate | null | undefined
): Array<{
	date: Temporal.PlainDate
	offsetBefore: string
	offsetAfter: string
	type: "forward" | "backward"
}> => {
	if (startDate == null || endDate == null) {
		return []
	}
	
	if (!(startDate instanceof Temporal.PlainDate) || 
	    !(endDate instanceof Temporal.PlainDate)) {
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
		const transitions: Array<{
			date: Temporal.PlainDate
			offsetBefore: string
			offsetAfter: string
			type: "forward" | "backward"
		}> = []
		
		// Check each day in the range for offset transitions
		// This is a simplified implementation - a more efficient approach
		// would use the TimeZone API directly, but this provides the basic functionality
		let currentDate = startDate
		let previousOffset: string | null = null
		
		while (Temporal.PlainDate.compare(currentDate, endDate) <= 0) {
			try {
				// Get the offset at noon on this date to avoid DST transition edge cases
				const dateTime = currentDate.toPlainDateTime({ hour: 12 })
				const zonedDateTime = dateTime.toZonedDateTime(timeZone)
				const currentOffset = zonedDateTime.offset
				
				if (previousOffset !== null && previousOffset !== currentOffset) {
					// We found a transition
					const isForward = previousOffset < currentOffset
					transitions.push({
						date: currentDate,
						offsetBefore: previousOffset,
						offsetAfter: currentOffset,
						type: isForward ? "forward" : "backward"
					})
				}
				
				previousOffset = currentOffset
			} catch {
				// Invalid timezone or date, skip this date
			}
			
			currentDate = currentDate.add({ days: 1 })
		}
		
		return transitions
	} catch {
		return []
	}
}

export default getOffsetTransitions