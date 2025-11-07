import isNullish from "../../validation/isNullish/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
const dateRange =
	(start: Temporal.PlainDate | null | undefined) =>
	(end: Temporal.PlainDate | null | undefined) =>
	(
		step: Temporal.Duration | null | undefined = Temporal.Duration.from({
			days: 1,
		}),
	): Array<Temporal.PlainDate> | null => {
		if (isNullish(start) || isNullish(end)) {
			return null
		}

		if (
			!(start instanceof Temporal.PlainDate) ||
			!(end instanceof Temporal.PlainDate)
		) {
			return null
		}

		// Default to 1 day if step is nullish
		const duration = step ?? Temporal.Duration.from({ days: 1 })

		if (!(duration instanceof Temporal.Duration)) {
			return null
		}

		try {
			const dates: Array<Temporal.PlainDate> = []

			// Return empty array if start is after end
			if (Temporal.PlainDate.compare(start, end) > 0) {
				return dates
			}

			// Generate dates from start to end using recursion
			const generate = (
				current: Temporal.PlainDate,
			): Array<Temporal.PlainDate> => {
				if (Temporal.PlainDate.compare(current, end) > 0) {
					return []
				}
				return [current, ...generate(current.add(duration))]
			}
			dates.push(...generate(start))

			return dates
		} catch {
			return null
		}
	}

export default dateRange
