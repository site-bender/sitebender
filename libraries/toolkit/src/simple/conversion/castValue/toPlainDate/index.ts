import type {
	DateInput,
	PlainDateLike,
} from "../../../../types/temporal/index.ts"

import isNullish from "../../../validation/isNullish/index.ts"

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
 * @pure
 * @safe
 * @param value - The value to convert to PlainDate
 * @returns The PlainDate representation or null if invalid
 * @example
 * ```typescript
 * // Basic usage
 * toPlainDate("2024-03-15")        // PlainDate 2024-03-15
 * toPlainDate("2024-12-31")        // PlainDate 2024-12-31
 * toPlainDate(new Date("2024-03-15T12:30:00Z"))  // PlainDate 2024-03-15
 *
 * // PlainDateLike objects
 * toPlainDate({ year: 2024, month: 3, day: 15 })  // PlainDate 2024-03-15
 *
 * // Invalid inputs
 * toPlainDate("2024-13-01")        // null (invalid month)
 * toPlainDate("03/15/2024")        // null (wrong format)
 * toPlainDate(null)                // null
 * toPlainDate(123)                 // null
 *
 * // Date validation example
 * const date = toPlainDate(userInput)
 * if (!date) {
 *   throw new Error("Invalid date format")
 * }
 * ```
 */
const toPlainDate = (
	value: DateInput | null | undefined,
): Temporal.PlainDate | null => {
	// Handle nullish values
	if (isNullish(value)) {
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
			return Temporal.PlainDate.from(trimmed, { overflow: "reject" })
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
	if (
		typeof value === "object" &&
		"year" in value &&
		"month" in value &&
		"day" in value
	) {
		try {
			// Use 'reject' to ensure invalid dates return null
			return Temporal.PlainDate.from(value as PlainDateLike, {
				overflow: "reject",
			})
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
