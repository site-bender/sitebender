import isNullish from "../../validation/isNullish/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
const fromISO = (
	isoString: string | null | undefined,
):
	| Temporal.PlainDate
	| Temporal.PlainTime
	| Temporal.PlainDateTime
	| Temporal.ZonedDateTime
	| Temporal.PlainYearMonth
	| Temporal.Duration
	| Temporal.Instant
	| null => {
	if (isNullish(isoString) || typeof isoString !== "string") {
		return null
	}

	const trimmed = isoString.trim()
	if (trimmed.length === 0) {
		return null
	}

	try {
		// Try to detect and parse different formats

		// Duration format (starts with P)
		if (trimmed.startsWith("P")) {
			return Temporal.Duration.from(trimmed)
		}

		// Check for time-only format (HH:MM:SS)
		if (/^\d{2}:\d{2}(:\d{2})?/.test(trimmed) && !trimmed.includes("-")) {
			return Temporal.PlainTime.from(trimmed)
		}

		// Check for year-month format (YYYY-MM)
		if (/^\d{4}-\d{2}$/.test(trimmed)) {
			return Temporal.PlainYearMonth.from(trimmed)
		}

		// Check for date-only format (YYYY-MM-DD)
		if (/^\d{4}-\d{2}-\d{2}$/.test(trimmed)) {
			return Temporal.PlainDate.from(trimmed)
		}

		// Check for datetime with timezone or offset
		if (trimmed.includes("[") || /[+-]\d{2}:\d{2}/.test(trimmed)) {
			return Temporal.ZonedDateTime.from(trimmed)
		}

		// Check for UTC instant (ends with Z)
		if (trimmed.endsWith("Z")) {
			return Temporal.Instant.from(trimmed)
		}

		// Check for plain datetime format (YYYY-MM-DDTHH:MM:SS)
		if (trimmed.includes("T")) {
			return Temporal.PlainDateTime.from(trimmed)
		}

		// Fallback: try as PlainDate
		return Temporal.PlainDate.from(trimmed)
	} catch {
		// If all parsing attempts fail, return null
		return null
	}
}

export default fromISO
