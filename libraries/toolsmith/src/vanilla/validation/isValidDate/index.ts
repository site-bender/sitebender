import type { DateInput } from "../../../types/temporal/index.ts"

import toPlainDate from "../../conversion/castValue/toPlainDate/index.ts"
import isNotNull from "../isNotNull/index.ts"

// (JSDoc removed in favor of Envoy)
//++ Valid date check — true when value converts to a real calendar date
const isValidDate = (value: DateInput | null | undefined): boolean => {
	// Attempt to convert to PlainDate
	// toPlainDate returns null for invalid dates
	const date = toPlainDate(value)

	// If conversion succeeded, it's a valid date
	return isNotNull(date)
}

export default isValidDate

//?? [EXAMPLE] isValidDate("2024-02-29") // true (leap year)
//?? [EXAMPLE] isValidDate("2024-02-30") // false
