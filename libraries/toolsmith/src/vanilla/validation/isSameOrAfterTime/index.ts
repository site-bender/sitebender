import type { TimeInput } from "../../../types/temporal/index.ts"

import toPlainTime from "../../conversion/castValue/toPlainTime/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
const isSameOrAfterTime = (
	reference: TimeInput | null | undefined,
) =>
(
	time: TimeInput | null | undefined,
): boolean => {
	const refTime = toPlainTime(reference)
	const compareTime = toPlainTime(time)

	if (!refTime || !compareTime) {
		return false
	}

	try {
		return Temporal.PlainTime.compare(compareTime, refTime) >= 0
	} catch {
		return false
	}
}

export default isSameOrAfterTime
