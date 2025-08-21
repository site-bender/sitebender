/**
 * Compares two Temporal objects and returns their relative ordering
 * 
 * Performs a three-way comparison of two Temporal objects, returning -1 if
 * the first is earlier, 1 if the first is later, and 0 if they are equal.
 * Works with any Temporal type that has a compare method (PlainDate,
 * PlainDateTime, PlainTime, etc.). Returns null for invalid inputs.
 * 
 * @curried (first) => (second) => result
 * @param first - The first Temporal object to compare
 * @param second - The second Temporal object to compare
 * @returns -1 if first < second, 0 if equal, 1 if first > second, null if invalid
 * @example
 * ```typescript
 * // Basic usage with PlainDate
 * const date1 = Temporal.PlainDate.from("2024-03-15")
 * const date2 = Temporal.PlainDate.from("2024-03-20")
 * const date3 = Temporal.PlainDate.from("2024-03-15")
 * 
 * compare(date1)(date2)                   // -1 (date1 is earlier)
 * compare(date2)(date1)                   // 1 (date2 is later)
 * compare(date1)(date3)                   // 0 (equal dates)
 * 
 * // With PlainTime
 * const time1 = Temporal.PlainTime.from("10:30:00")
 * const time2 = Temporal.PlainTime.from("14:45:00")
 * 
 * compare(time1)(time2)                   // -1 (time1 is earlier)
 * compare(time2)(time1)                   // 1 (time2 is later)
 * compare(time1)(time1)                   // 0 (same time)
 * 
 * // With PlainDateTime
 * const dt1 = Temporal.PlainDateTime.from("2024-03-15T10:30:00")
 * const dt2 = Temporal.PlainDateTime.from("2024-03-15T14:45:00")
 * const dt3 = Temporal.PlainDateTime.from("2024-03-16T08:00:00")
 * 
 * compare(dt1)(dt2)                       // -1 (same day, earlier time)
 * compare(dt1)(dt3)                       // -1 (earlier day)
 * compare(dt3)(dt2)                       // 1 (later day)
 * 
 * // Partial application for sorting
 * const compareToToday = compare(Temporal.Now.plainDateISO())
 * 
 * const futureDate = Temporal.PlainDate.from("2025-01-01")
 * const pastDate = Temporal.PlainDate.from("2023-01-01")
 * 
 * compareToToday(futureDate)              // -1 (today is before future)
 * compareToToday(pastDate)                // 1 (today is after past)
 * 
 * // Sorting arrays of dates
 * const dates = [
 *   Temporal.PlainDate.from("2024-03-20"),
 *   Temporal.PlainDate.from("2024-03-10"),
 *   Temporal.PlainDate.from("2024-03-15"),
 *   Temporal.PlainDate.from("2024-03-05")
 * ]
 * 
 * const sorted = [...dates].sort((a, b) => compare(a)(b))
 * // [2024-03-05, 2024-03-10, 2024-03-15, 2024-03-20]
 * 
 * const sortedDesc = [...dates].sort((a, b) => -compare(a)(b))
 * // [2024-03-20, 2024-03-15, 2024-03-10, 2024-03-05]
 * 
 * // Finding min/max dates
 * function findEarliest<T extends { compare(other: T): number }>(
 *   dates: Array<T>
 * ): T | null {
 *   if (dates.length === 0) return null
 *   
 *   return dates.reduce((earliest, date) => 
 *     compare(date)(earliest) < 0 ? date : earliest
 *   )
 * }
 * 
 * function findLatest<T extends { compare(other: T): number }>(
 *   dates: Array<T>
 * ): T | null {
 *   if (dates.length === 0) return null
 *   
 *   return dates.reduce((latest, date) => 
 *     compare(date)(latest) > 0 ? date : latest
 *   )
 * }
 * 
 * const appointments = [
 *   Temporal.PlainDateTime.from("2024-03-15T09:00:00"),
 *   Temporal.PlainDateTime.from("2024-03-15T14:30:00"),
 *   Temporal.PlainDateTime.from("2024-03-15T11:00:00")
 * ]
 * 
 * findEarliest(appointments)              // PlainDateTime 2024-03-15T09:00:00
 * findLatest(appointments)                // PlainDateTime 2024-03-15T14:30:00
 * 
 * // Checking date relationships
 * function isBefore<T extends { compare(other: T): number }>(
 *   first: T
 * ): (second: T) => boolean {
 *   return (second: T) => compare(first)(second) < 0
 * }
 * 
 * function isAfter<T extends { compare(other: T): number }>(
 *   first: T
 * ): (second: T) => boolean {
 *   return (second: T) => compare(first)(second) > 0
 * }
 * 
 * function isSame<T extends { compare(other: T): number }>(
 *   first: T
 * ): (second: T) => boolean {
 *   return (second: T) => compare(first)(second) === 0
 * }
 * 
 * const deadline = Temporal.PlainDate.from("2024-12-31")
 * const isBeforeDeadline = isBefore(deadline)
 * const isAfterDeadline = isAfter(deadline)
 * 
 * isBeforeDeadline(Temporal.PlainDate.from("2024-06-15"))  // true
 * isAfterDeadline(Temporal.PlainDate.from("2025-01-15"))   // true
 * 
 * // Binary search in sorted dates
 * function binarySearchDate<T extends { compare(other: T): number }>(
 *   sortedDates: Array<T>,
 *   target: T
 * ): number {
 *   let left = 0
 *   let right = sortedDates.length - 1
 *   
 *   while (left <= right) {
 *     const mid = Math.floor((left + right) / 2)
 *     const comparison = compare(sortedDates[mid])(target)
 *     
 *     if (comparison === 0) return mid
 *     if (comparison < 0) left = mid + 1
 *     else right = mid - 1
 *   }
 *   
 *   return -1  // Not found
 * }
 * 
 * // Event scheduling conflicts
 * function hasConflict(
 *   event1Start: Temporal.PlainDateTime,
 *   event1End: Temporal.PlainDateTime,
 *   event2Start: Temporal.PlainDateTime,
 *   event2End: Temporal.PlainDateTime
 * ): boolean {
 *   // Events conflict if one starts before the other ends
 *   return compare(event1Start)(event2End) < 0 && 
 *          compare(event2Start)(event1End) < 0
 * }
 * 
 * // Null handling
 * compare(null)(date2)                    // null
 * compare(date1)(null)                    // null
 * compare(null)(null)                     // null
 * 
 * // Age comparison
 * function compareAges(
 *   birthDate1: Temporal.PlainDate,
 *   birthDate2: Temporal.PlainDate
 * ): number | null {
 *   // Earlier birth date means older person
 *   const result = compare(birthDate1)(birthDate2)
 *   return result !== null ? -result : null
 * }
 * 
 * const person1Birth = Temporal.PlainDate.from("1990-05-15")
 * const person2Birth = Temporal.PlainDate.from("1995-03-20")
 * compareAges(person1Birth, person2Birth) // 1 (person1 is older)
 * 
 * // Priority queue implementation
 * class DatePriorityQueue<T extends { compare(other: T): number }> {
 *   private items: Array<T> = []
 *   
 *   insert(item: T): void {
 *     const index = this.items.findIndex(existing => 
 *       compare(item)(existing) < 0
 *     )
 *     if (index === -1) {
 *       this.items.push(item)
 *     } else {
 *       this.items.splice(index, 0, item)
 *     }
 *   }
 *   
 *   extractMin(): T | undefined {
 *     return this.items.shift()
 *   }
 * }
 * 
 * // Timeline ordering
 * const events = [
 *   { name: "Start", date: Temporal.PlainDate.from("2024-01-01") },
 *   { name: "Milestone", date: Temporal.PlainDate.from("2024-06-15") },
 *   { name: "End", date: Temporal.PlainDate.from("2024-12-31") }
 * ]
 * 
 * events.sort((a, b) => compare(a.date)(b.date))
 * // Events in chronological order
 * 
 * // Deadline checking
 * function checkDeadline(
 *   submission: Temporal.PlainDateTime,
 *   deadline: Temporal.PlainDateTime
 * ): "on-time" | "late" | "early" {
 *   const comparison = compare(submission)(deadline)
 *   if (comparison === null) return "early"
 *   if (comparison < 0) return "early"
 *   if (comparison > 0) return "late"
 *   return "on-time"
 * }
 * ```
 * @property Pure - Always returns same result for same inputs
 * @property Consistent - Provides total ordering for sortable types
 * @property Safe - Returns null for invalid inputs
 * @property Generic - Works with any Temporal type that supports compare
 */
const compare = <T extends { 
	compare(other: T): number 
}>(first: T | null | undefined) => 
	(second: T | null | undefined): number | null => {
	if (first == null || second == null) {
		return null
	}
	
	// Ensure both parameters have a compare method
	if (typeof first.compare !== 'function') {
		return null
	}
	
	try {
		// Use Temporal's built-in compare method
		return first.compare(second)
	} catch {
		return null
	}
}

export default compare