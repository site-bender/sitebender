type PlainDateLike = {
	year: number
	month: number
	day: number
}

type DateInput = 
	| string                        // ISO date string
	| Date                          // JS Date
	| Temporal.PlainDate           
	| Temporal.PlainDateTime        // Extract date part
	| Temporal.ZonedDateTime        // Extract date part
	| PlainDateLike                // Object with year/month/day

/**
 * Parses values into Temporal PlainDate objects
 * 
 * Converts various date representations to Temporal.PlainDate.
 * Returns null for invalid inputs rather than throwing errors,
 * making it easy to wrap in monadic error handling later.
 * 
 * Parsing rules:
 * - Temporal.PlainDate: returned as-is
 * - Temporal.PlainDateTime/ZonedDateTime: extracts date portion
 * - Strings: ISO 8601 date format (YYYY-MM-DD)
 * - Date objects: converted to PlainDate (date only, no time)
 * - PlainDateLike objects: must have year, month, day properties
 * - null/undefined: null
 * 
 * @param value - The value to convert to PlainDate
 * @returns The PlainDate representation or null if invalid
 * @example
 * ```typescript
 * // ISO date strings
 * toPlainDate("2024-03-15")        // PlainDate 2024-03-15
 * toPlainDate("2024-12-31")        // PlainDate 2024-12-31
 * toPlainDate("2024-01-01")        // PlainDate 2024-01-01
 * toPlainDate("2024-02-05")        // PlainDate 2024-02-05
 * 
 * // Invalid date strings
 * toPlainDate("2024-13-01")        // null (month 13 invalid)
 * toPlainDate("2024-02-30")        // null (Feb 30 invalid)
 * toPlainDate("2024-2-5")          // null (single digits not valid ISO)
 * toPlainDate("03/15/2024")        // null (wrong format)
 * toPlainDate("March 15, 2024")    // null (wrong format)
 * toPlainDate("2024")              // null (incomplete)
 * toPlainDate("")                  // null
 * 
 * // Date objects
 * const jsDate = new Date("2024-03-15T12:30:00Z")
 * toPlainDate(jsDate)              // PlainDate 2024-03-15 (time stripped)
 * 
 * // Temporal objects
 * const plainDate = Temporal.PlainDate.from("2024-03-15")
 * toPlainDate(plainDate)           // PlainDate 2024-03-15 (passes through)
 * 
 * // PlainDateLike objects
 * toPlainDate({ year: 2024, month: 3, day: 15 })  // PlainDate 2024-03-15
 * toPlainDate({ year: 2024, month: 12, day: 31 }) // PlainDate 2024-12-31
 * toPlainDate({ year: 2024, month: 13, day: 1 })  // null (invalid month)
 * toPlainDate({ year: 2024, month: 3 })           // null (missing day)
 * 
 * // Nullish values
 * toPlainDate(null)                // null
 * toPlainDate(undefined)           // null
 * 
 * // Other types
 * toPlainDate(true)                // null
 * toPlainDate(123)                 // null (numbers not supported)
 * toPlainDate([2024, 3, 15])       // null (arrays not supported)
 * 
 * // Form input parsing
 * const dateInput = document.querySelector('input[type="date"]')
 * const date = toPlainDate(dateInput?.value)
 * if (date) {
 *   console.log(`Selected: ${date.year}-${date.month}-${date.day}`)
 * }
 * 
 * // Date validation
 * function isValidBirthdate(input: unknown): boolean {
 *   const date = toPlainDate(input)
 *   if (!date) return false
 *   
 *   const today = Temporal.Now.plainDateISO()
 *   const age = today.since(date, { largestUnit: "years" }).years
 *   
 *   return age >= 0 && age <= 150
 * }
 * 
 * isValidBirthdate("1990-01-01")   // true
 * isValidBirthdate("2050-01-01")   // false (future)
 * isValidBirthdate("1850-01-01")   // false (too old)
 * 
 * // Date calculations
 * function daysBetween(date1: unknown, date2: unknown): number | null {
 *   const d1 = toPlainDate(date1)
 *   const d2 = toPlainDate(date2)
 *   
 *   if (!d1 || !d2) return null
 *   
 *   return d2.since(d1, { largestUnit: "days" }).days
 * }
 * 
 * daysBetween("2024-01-01", "2024-12-31")  // 365
 * daysBetween("2024-03-01", "2024-03-15")  // 14
 * 
 * // Working with date components
 * const date = toPlainDate("2024-03-15")
 * if (date) {
 *   console.log(date.year)         // 2024
 *   console.log(date.month)        // 3
 *   console.log(date.day)          // 15
 *   console.log(date.dayOfWeek)    // 5 (Friday)
 *   console.log(date.dayOfYear)    // 75
 *   console.log(date.weekOfYear)   // 11
 * }
 * ```
 * @property Pure - Always returns same result for same input
 * @property Safe - Returns null instead of throwing errors
 * @property Temporal - Uses Temporal API for precise date handling
 */
const toPlainDate = (value: DateInput | null | undefined): Temporal.PlainDate | null => {
	// Handle nullish values
	if (value == null) {
		return null
	}
	
	// If already a PlainDate, return as-is
	if (value instanceof Temporal.PlainDate) {
		return value
	}
	
	// Handle strings (ISO format expected)
	if (typeof value === "string") {
		const trimmed = value.trim()
		if (trimmed.length === 0) {
			return null
		}
		
		try {
			// Temporal.PlainDate.from with strict validation
			return Temporal.PlainDate.from(trimmed, { overflow: 'reject' })
		} catch {
			return null
		}
	}
	
	// Handle JavaScript Date objects
	if (value instanceof Date) {
		if (isNaN(value.getTime())) {
			return null
		}
		
		try {
			// Convert to ISO string and parse date part only
			const isoString = value.toISOString()
			const dateOnly = isoString.split("T")[0]
			return Temporal.PlainDate.from(dateOnly)
		} catch {
			return null
		}
	}
	
	// Handle PlainDateLike objects
	if (typeof value === "object" && 
	    "year" in value && 
	    "month" in value && 
	    "day" in value) {
		try {
			// Use 'reject' to ensure invalid dates return null
			return Temporal.PlainDate.from(value as PlainDateLike, { overflow: 'reject' })
		} catch {
			return null
		}
	}
	
	// Handle PlainDateTime and ZonedDateTime
	if (value instanceof Temporal.PlainDateTime) {
		return value.toPlainDate()
	}
	
	if (value instanceof Temporal.ZonedDateTime) {
		return value.toPlainDate()
	}
	
	// Exhaustive type check - should never reach here with proper types
	return null
}

export default toPlainDate