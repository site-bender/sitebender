import isNullish from "../../validation/isNullish/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
const getMonth = (
	date:
		| Temporal.PlainDate
		| Temporal.PlainDateTime
		| Temporal.PlainYearMonth
		| Temporal.PlainMonthDay
		| Temporal.ZonedDateTime
		| null
		| undefined,
): number | null => {
	if (isNullish(date)) {
		return null
	}

	if (
		!(date instanceof Temporal.PlainDate) &&
		!(date instanceof Temporal.PlainDateTime) &&
		!(date instanceof Temporal.PlainYearMonth) &&
		!(date instanceof Temporal.PlainMonthDay) &&
		!(date instanceof Temporal.ZonedDateTime)
	) {
		return null
	}

	if (date instanceof Temporal.PlainDate) return date.month
	if (date instanceof Temporal.PlainDateTime) return date.month
	if (date instanceof Temporal.PlainYearMonth) return date.month
	if (date instanceof Temporal.PlainMonthDay) {
		const code = date.monthCode // e.g. "M02" or "M08L"
		const digits = code.replace(/[^0-9]/g, "")
		const num = parseInt(digits, 10)
		return Number.isFinite(num) ? num : null
	}
	if (date instanceof Temporal.ZonedDateTime) return date.month
	return null
}

export default getMonth
