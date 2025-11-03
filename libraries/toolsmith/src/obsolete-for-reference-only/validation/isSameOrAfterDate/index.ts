import type { DateInput } from "../../../types/temporal/index.ts"

import toPlainDate from "../../conversion/castValue/toPlainDate/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
const isSameOrAfterDate = (
	reference: DateInput | null | undefined,
) =>
(
	date: DateInput | null | undefined,
): boolean => {
	const refDate = toPlainDate(reference)
	const compareDate = toPlainDate(date)

	if (!refDate || !compareDate) {
		return false
	}

	try {
		return Temporal.PlainDate.compare(compareDate, refDate) >= 0
	} catch {
		return false
	}
}

export default isSameOrAfterDate
