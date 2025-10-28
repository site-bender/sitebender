import type { CalendarSystem } from "../../../../types/temporal/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
export default function getCalendarExtension(
	calendar?: CalendarSystem,
): string {
	if (!calendar || calendar === "iso8601" || calendar === "gregory") {
		return ""
	}
	return `[u-ca=${calendar}]`
}
