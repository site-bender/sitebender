import type { DateInput } from "../../../types/temporal/index.ts"

import toPlainDate from "../../conversion/castValue/toPlainDate/index.ts"
import not from "../../logic/not/index.ts"
import todayIsoLocal from "./todayIsoLocal/index.ts"
import toIsoDateString from "./toIsoDateString/index.ts"

//++ Checks if a date is in the future relative to today (strictly after today)
export default function isFutureDate(
	value: DateInput | null | undefined,
): boolean {
	const date = toPlainDate(value)

	if (not(date)) {
		return false
	}

	const iso = toIsoDateString(date)

	// Ensure iso is a string before comparing
	if (iso === null) {
		return false
	}

	return iso > todayIsoLocal()
}
