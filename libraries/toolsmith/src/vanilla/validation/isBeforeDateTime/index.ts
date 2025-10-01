import type { DateTimeInput } from "../../../types/temporal/index.ts"

import toPlainDateTime from "../../conversion/castValue/toPlainDateTime/index.ts"

//++ Checks if a datetime is before another datetime
export default function isBeforeDateTime(
	reference: DateTimeInput | null | undefined,
) {
	return function checkIsBeforeDateTime(
		datetime: DateTimeInput | null | undefined,
	): boolean {
		const refDateTime = toPlainDateTime(reference)
		const compareDateTime = toPlainDateTime(datetime)

		if (!refDateTime || !compareDateTime) {
			return false
		}

		try {
			return Temporal.PlainDateTime.compare(compareDateTime, refDateTime) < 0
		} catch {
			return false
		}
	}
}
