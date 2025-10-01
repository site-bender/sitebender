import isNullish from "../../validation/isNullish/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
const diffDays =
	(from: Temporal.PlainDate | Temporal.PlainDateTime | null | undefined) =>
	(
		to: Temporal.PlainDate | Temporal.PlainDateTime | null | undefined,
	): number | null => {
		if (isNullish(from) || isNullish(to)) {
			return null
		}

		// Convert PlainDateTime to PlainDate if needed
		let fromDate: Temporal.PlainDate
		let toDate: Temporal.PlainDate

		try {
			if (from instanceof Temporal.PlainDateTime) {
				fromDate = from.toPlainDate()
			} else if (from instanceof Temporal.PlainDate) {
				fromDate = from
			} else {
				return null
			}

			if (to instanceof Temporal.PlainDateTime) {
				toDate = to.toPlainDate()
			} else if (to instanceof Temporal.PlainDate) {
				toDate = to
			} else {
				return null
			}

			// Calculate difference in days
			const duration = toDate.since(fromDate, { largestUnit: "days" })
			return duration.days
		} catch {
			return null
		}
	}

export default diffDays
