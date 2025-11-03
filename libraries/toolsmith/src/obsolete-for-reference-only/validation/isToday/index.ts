import type { DateInput } from "../../../types/temporal/index.ts"

import toPlainDate from "../../conversion/castValue/toPlainDate/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
const isToday = (date: DateInput | null | undefined): boolean => {
	const checkDate = toPlainDate(date)

	if (!checkDate) {
		return false
	}

	try {
		const today = Temporal.Now.plainDateISO()
		return Temporal.PlainDate.compare(checkDate, today) === 0
	} catch {
		return false
	}
}

export default isToday
