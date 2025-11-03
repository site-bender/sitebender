import isNull from "../../../validation/isNull/index.ts"

export default function _checkTransitions(
	current: Temporal.PlainDate,
	prevOffset: string | null,
	acc: Array<{
		date: Temporal.PlainDate
		offsetBefore: string
		offsetAfter: string
		type: "forward" | "backward"
	}>,
	endDate: Temporal.PlainDate | string,
	timeZone: string,
): Array<{
	date: Temporal.PlainDate
	offsetBefore: string
	offsetAfter: string
	type: "forward" | "backward"
}> {
	if (Temporal.PlainDate.compare(current, endDate) > 0) {
		return acc
	}

	try {
		// Get the offset at noon on this date to avoid DST transition edge cases
		const dateTime = current.toPlainDateTime({ hour: 12 })
		const zonedDateTime = dateTime.toZonedDateTime(timeZone)
		const currentOffset = zonedDateTime.offset

		const newTransitions = !isNull(prevOffset) && prevOffset !== currentOffset
			? [...acc, {
				date: current,
				offsetBefore: prevOffset,
				offsetAfter: currentOffset,
				type: (prevOffset < currentOffset ? "forward" : "backward") as
					| "forward"
					| "backward",
			}]
			: acc

		return _checkTransitions(
			current.add({ days: 1 }),
			currentOffset,
			newTransitions,
			endDate,
			timeZone,
		)
	} catch {
		// Invalid timezone or date, skip this date
		return _checkTransitions(
			current.add({ days: 1 }),
			prevOffset,
			acc,
			endDate,
			timeZone,
		)
	}
}
