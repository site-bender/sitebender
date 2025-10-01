import isNullish from "../../validation/isNullish/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
export default function parse(
	dateString: string | null | undefined,
):
	| Temporal.PlainDate
	| Temporal.PlainTime
	| Temporal.PlainDateTime
	| Temporal.ZonedDateTime
	| Temporal.Instant
	| Temporal.PlainYearMonth
	| Temporal.PlainMonthDay
	| null {
	if (isNullish(dateString) || dateString === "") {
		return null
	}

	// Clean the input
	const cleaned = dateString.trim()

	try {
		// Try Instant (ends with Z)
		if (cleaned.endsWith("Z")) {
			return Temporal.Instant.from(cleaned)
		}

		// Try ZonedDateTime (has timezone)
		if (cleaned.includes("[") || /[+-]\d{2}:\d{2}/.test(cleaned)) {
			return Temporal.ZonedDateTime.from(cleaned)
		}

		// Try PlainDateTime (has both date and time)
		if (
			cleaned.includes("T") ||
			/\d{4}-\d{2}-\d{2}\s+\d{2}:\d{2}/.test(cleaned)
		) {
			return Temporal.PlainDateTime.from(cleaned)
		}

		// Try PlainTime (time only patterns)
		if (/^T?\d{1,2}:\d{2}(:\d{2})?(\.\d+)?$/.test(cleaned)) {
			const timeStr = cleaned.startsWith("T") ? cleaned.slice(1) : cleaned
			return Temporal.PlainTime.from(timeStr)
		}

		// Try PlainYearMonth (YYYY-MM)
		if (/^\d{4}-\d{2}$/.test(cleaned)) {
			return Temporal.PlainYearMonth.from(cleaned)
		}

		// Try PlainMonthDay (--MM-DD or MM-DD)
		if (/^(--)?\d{2}-\d{2}$/.test(cleaned)) {
			const mdStr = cleaned.startsWith("--") ? cleaned.slice(2) : cleaned
			return Temporal.PlainMonthDay.from(mdStr)
		}

		// Try PlainDate with various separators
		// Handle US format (MM/DD/YYYY)
		if (/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(cleaned)) {
			const [month, day, year] = cleaned.split("/")
			return Temporal.PlainDate.from({
				year: parseInt(year),
				month: parseInt(month),
				day: parseInt(day),
			})
		}

		// Handle European format (DD-MM-YYYY or DD.MM.YYYY)
		if (/^\d{1,2}[-\.]\d{1,2}[-\.]\d{4}$/.test(cleaned)) {
			const parts = cleaned.split(/[-\.]/)
			const [day, month, year] = parts
			return Temporal.PlainDate.from({
				year: parseInt(year),
				month: parseInt(month),
				day: parseInt(day),
			})
		}

		// Handle YYYY/MM/DD or YYYY.MM.DD
		if (/^\d{4}[\/\.]\d{1,2}[\/\.]\d{1,2}$/.test(cleaned)) {
			const normalized = cleaned.replace(/[\/\.]/g, "-")
			return Temporal.PlainDate.from(normalized)
		}

		// Try standard ISO date (YYYY-MM-DD)
		if (/^\d{4}-\d{2}-\d{2}$/.test(cleaned)) {
			return Temporal.PlainDate.from(cleaned)
		}

		// Last resort: try to parse as-is
		return Temporal.PlainDate.from(cleaned)
	} catch {
		// If all parsing attempts fail, return null
		return null
	}
}
