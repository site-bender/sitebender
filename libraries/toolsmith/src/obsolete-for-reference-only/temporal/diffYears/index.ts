import isNullish from "../../validation/isNullish/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
const diffYears = (
	from:
		| Temporal.PlainDate
		| Temporal.PlainDateTime
		| Temporal.PlainYearMonth
		| null
		| undefined,
) =>
(
	to:
		| Temporal.PlainDate
		| Temporal.PlainDateTime
		| Temporal.PlainYearMonth
		| null
		| undefined,
): number | null => {
	if (isNullish(from) || isNullish(to)) {
		return null
	}

	try {
		// Convert to appropriate types for comparison
		let fromDate: Temporal.PlainDate | Temporal.PlainYearMonth
		let toDate: Temporal.PlainDate | Temporal.PlainYearMonth

		if (from instanceof Temporal.PlainDateTime) {
			fromDate = from.toPlainDate()
		} else if (
			from instanceof Temporal.PlainDate ||
			from instanceof Temporal.PlainYearMonth
		) {
			fromDate = from
		} else {
			return null
		}

		if (to instanceof Temporal.PlainDateTime) {
			toDate = to.toPlainDate()
		} else if (
			to instanceof Temporal.PlainDate ||
			to instanceof Temporal.PlainYearMonth
		) {
			toDate = to
		} else {
			return null
		}

		// Calculate difference in years
		const duration = toDate.since(fromDate, { largestUnit: "years" })
		return duration.years
	} catch {
		return null
	}
}

export default diffYears
