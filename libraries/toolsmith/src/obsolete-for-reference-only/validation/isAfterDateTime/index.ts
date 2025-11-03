import type { DateTimeInput } from "../../../types/temporal/index.ts"

import toPlainDateTime from "../../conversion/castValue/toPlainDateTime/index.ts"

//++ Checks if a datetime is after another datetime
export default function isAfterDateTime(
	reference: DateTimeInput | null | undefined,
) {
	return function checkIsAfterDateTime(
		datetime: DateTimeInput | null | undefined,
	): boolean {
		const refDateTime = toPlainDateTime(reference)
		const compareDateTime = toPlainDateTime(datetime)

		if (!refDateTime || !compareDateTime) {
			return false
		}

		try {
			return Temporal.PlainDateTime.compare(compareDateTime, refDateTime) > 0
		} catch {
			return false
		}
	}
}
