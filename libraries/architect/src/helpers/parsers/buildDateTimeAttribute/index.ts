import type { ParsedTemporal } from "../../../../types/temporal/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
export default function buildDateTimeAttribute(
	parsed: ParsedTemporal,
	includeTimezone = true,
	includeCalendar = true,
): string {
	let result = ""

	// Build base value
	switch (parsed.type) {
		case "date":
			result = `${parsed.year}-${String(parsed.month).padStart(2, "0")}-${
				String(parsed.day).padStart(2, "0")
			}`
			break

		case "time":
			result = `${String(parsed.hour).padStart(2, "0")}:${
				String(parsed.minute).padStart(2, "0")
			}`
			if (parsed.second !== undefined) {
				result += `:${String(parsed.second).padStart(2, "0")}`
				if (parsed.microsecond || parsed.nanosecond) {
					const fractional = String(parsed.millisecond || 0).padStart(3, "0") +
						String(parsed.microsecond || 0).padStart(3, "0") +
						String(parsed.nanosecond || 0).padStart(3, "0")
					result += `.${fractional.replace(/0+$/, "")}`
				} else if (parsed.millisecond) {
					result += `.${String(parsed.millisecond).padStart(3, "0")}`
				}
			}
			break

		case "datetime":
		case "instant":
			result = `${parsed.year}-${String(parsed.month).padStart(2, "0")}-${
				String(parsed.day).padStart(2, "0")
			}`
			result += `T${String(parsed.hour).padStart(2, "0")}:${
				String(parsed.minute).padStart(2, "0")
			}`
			if (parsed.second !== undefined) {
				result += `:${String(parsed.second).padStart(2, "0")}`
				if (parsed.microsecond || parsed.nanosecond) {
					const fractional = String(parsed.millisecond || 0).padStart(3, "0") +
						String(parsed.microsecond || 0).padStart(3, "0") +
						String(parsed.nanosecond || 0).padStart(3, "0")
					result += `.${fractional.replace(/0+$/, "")}`
				} else if (parsed.millisecond) {
					result += `.${String(parsed.millisecond).padStart(3, "0")}`
				}
			}
			if (parsed.offset) {
				result += parsed.offset
			}
			break

		case "yearmonth":
			result = `${parsed.year}-${String(parsed.month).padStart(2, "0")}`
			break

		case "monthday":
			result = `--${String(parsed.month).padStart(2, "0")}-${
				String(parsed.day).padStart(2, "0")
			}`
			break

		case "duration":
			return parsed.original
	}

	// Add timezone bracket
	if (includeTimezone && parsed.timezone && parsed.timezone !== "UTC") {
		result += `[${parsed.timezone}]`
	}

	// Add calendar bracket
	if (
		includeCalendar && parsed.calendar && parsed.calendar !== "iso8601" &&
		parsed.calendar !== "gregory"
	) {
		result += `[u-ca=${parsed.calendar}]`
	}

	return result
}
