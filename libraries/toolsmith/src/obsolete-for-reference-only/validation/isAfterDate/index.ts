import type { DateInput } from "../../../types/temporal/index.ts"

import toPlainDate from "../../conversion/castValue/toPlainDate/index.ts"
import toIsoDateString from "./toIsoDateString/index.ts"

//++ Checks if a date is after another date
export default function isAfterDate(
	reference: DateInput | null | undefined,
) {
	return function checkIsAfterDate(
		date: DateInput | null | undefined,
	): boolean {
		const refDate = toPlainDate(reference)
		const compareDate = toPlainDate(date)

		if (!refDate || !compareDate) {
			return false
		}

		const a = toIsoDateString(compareDate)
		const b = toIsoDateString(refDate)
		if (!a || !b) return false
		return a > b
	}
}
