import type { TimeInput } from "../../../types/temporal/index.ts"

import toPlainTime from "../../conversion/castValue/toPlainTime/index.ts"

//++ Checks if a time is before another time
export default function isBeforeTime(
	reference: TimeInput | null | undefined,
) {
	return function checkIsBeforeTime(
		time: TimeInput | null | undefined,
	): boolean {
		const refTime = toPlainTime(reference)
		const compareTime = toPlainTime(time)

		if (!refTime || !compareTime) {
			return false
		}

		try {
			return Temporal.PlainTime.compare(compareTime, refTime) < 0
		} catch {
			return false
		}
	}
}
