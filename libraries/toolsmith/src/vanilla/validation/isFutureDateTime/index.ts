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
