import type { DateInput } from "../../../types/temporal/index.ts"

import toPlainDate from "../../conversion/castValue/toPlainDate/index.ts"

// (JSDoc removed in favor of Envoy)
//++ Tomorrow date predicate — true if date equals system tomorrow (ISO PlainDate)
const isTomorrow = (date: DateInput | null | undefined): boolean => {
	const checkDate = toPlainDate(date)

	if (!checkDate) {
		return false
	}

	try {
		const tomorrow = Temporal.Now.plainDateISO().add({ days: 1 })
		return Temporal.PlainDate.compare(checkDate, tomorrow) === 0
	} catch {
		return false
	}
}

export default isTomorrow

//?? [EXAMPLE] isTomorrow(Temporal.Now.plainDateISO().add({ days: 1 })) // true
//?? [EXAMPLE] isTomorrow(new Date()) // false (today)
