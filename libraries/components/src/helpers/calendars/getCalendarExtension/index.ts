import type { CalendarSystem } from "../../../../types/temporal/index.ts"

/**
 * Get calendar extension for datetime attribute
 */
export default function getCalendarExtension(
	calendar?: CalendarSystem,
): string {
	if (!calendar || calendar === "iso8601" || calendar === "gregory") {
		return ""
	}
	return `[u-ca=${calendar}]`
}
