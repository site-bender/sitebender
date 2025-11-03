import type { DateInput } from "../../../types/temporal/index.ts"

import toPlainDate from "../../conversion/castValue/toPlainDate/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
const isYesterday = (date: DateInput | null | undefined): boolean => {
	const checkDate = toPlainDate(date)

	if (!checkDate) {
		return false
	}

	try {
		const yesterday = Temporal.Now.plainDateISO().subtract({ days: 1 })
		return Temporal.PlainDate.compare(checkDate, yesterday) === 0
	} catch {
		return false
	}
}

export default isYesterday
