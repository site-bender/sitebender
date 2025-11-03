import isNullish from "../../validation/isNullish/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
const endOfDay = (
	date: Temporal.PlainDate | Temporal.PlainDateTime | null | undefined,
): Temporal.PlainDateTime | null => {
	if (isNullish(date)) {
		return null
	}

	try {
		// Convert to PlainDate if needed
		let plainDate: Temporal.PlainDate

		if (date instanceof Temporal.PlainDateTime) {
			plainDate = date.toPlainDate()
		} else if (date instanceof Temporal.PlainDate) {
			plainDate = date
		} else {
			return null
		}

		// Create end of day time (23:59:59.999999999)
		const endTime = Temporal.PlainTime.from({
			hour: 23,
			minute: 59,
			second: 59,
			millisecond: 999,
			microsecond: 999,
			nanosecond: 999,
		})

		// Combine date with end time
		return plainDate.toPlainDateTime(endTime)
	} catch {
		return null
	}
}

export default endOfDay
