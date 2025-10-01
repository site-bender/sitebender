import type { DateInput } from "../../../types/temporal/index.ts"

import toPlainDate from "../../conversion/castValue/toPlainDate/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
const isPastDate = (
	value: DateInput | null | undefined,
): boolean => {
	const date = toPlainDate(value)

	if (!date) {
		return false
	}

	try {
		const today = Temporal.Now.plainDateISO()
		return Temporal.PlainDate.compare(date, today) < 0
	} catch {
		return false
	}
}

export default isPastDate
