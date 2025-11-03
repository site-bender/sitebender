import type { DateTimeInput } from "../../../types/temporal/index.ts"

import toPlainDateTime from "../../conversion/castValue/toPlainDateTime/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
const isSameOrBeforeDateTime = (
	reference: DateTimeInput | null | undefined,
) =>
(
	datetime: DateTimeInput | null | undefined,
): boolean => {
	const refDateTime = toPlainDateTime(reference)
	const compareDateTime = toPlainDateTime(datetime)

	if (!refDateTime || !compareDateTime) {
		return false
	}

	try {
		return Temporal.PlainDateTime.compare(compareDateTime, refDateTime) <= 0
	} catch {
		return false
	}
}

export default isSameOrBeforeDateTime
