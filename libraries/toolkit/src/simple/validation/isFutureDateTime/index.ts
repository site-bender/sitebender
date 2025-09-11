import type { DateTimeInput } from "../../../types/temporal/index.ts"

import toPlainDateTime from "../../conversion/castValue/toPlainDateTime/index.ts"
import not from "../../logic/not/index.ts"
import nowIsoLocal from "./nowIsoLocal/index.ts"
import toIsoDateTimeString from "./toIsoDateTimeString/index.ts"

//++ Checks if a datetime is in the future relative to the current moment
export default function isFutureDateTime(
	value: DateTimeInput | null | undefined,
): boolean {
	const dateTime = toPlainDateTime(value)

	if (not(dateTime)) {
		return false
	}

	const iso = toIsoDateTimeString(dateTime)

	if (not(iso)) {
		return false
	}

	// Narrow iso to string after the guard
	return (iso as string) > nowIsoLocal()
}

//?? [EXAMPLE] isFutureDateTime("2099-01-01T00:00:00") // true
//?? [EXAMPLE] isFutureDateTime("2000-01-01T00:00:00") // false
//?? [EXAMPLE] isFutureDateTime(null) // false
/*??
 | [EXAMPLE]
 | const tomorrow = Temporal.Now.plainDateTimeISO().add({ days: 1 })
 | isFutureDateTime(tomorrow) // true
 |
 | [EXAMPLE] Meeting validation
 | const meetingTimeIsInFuture = isFutureDateTime(meetingTime)
 | meetingTimeIsInFuture // true if meeting is in future
 |
 | [GOTCHA] Current moment returns false (not considered future)
 | [PRO] Accepts various datetime formats (string, Date, Temporal types)
 |
*/
