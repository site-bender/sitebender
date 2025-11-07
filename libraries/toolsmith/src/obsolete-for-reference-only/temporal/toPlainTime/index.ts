//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
import isNullish from "../../validation/isNullish/index.ts"

const toPlainTime = (
	temporal:
		| Temporal.PlainTime
		| Temporal.PlainDateTime
		| Temporal.ZonedDateTime
		| Temporal.Duration
		| string
		| null
		| undefined,
): Temporal.PlainTime | null => {
	if (isNullish(temporal)) {
		return null
	}

	try {
		// Handle PlainTime - return as-is
		if (temporal instanceof Temporal.PlainTime) {
			return temporal
		}

		// Handle PlainDateTime - extract time portion
		if (temporal instanceof Temporal.PlainDateTime) {
			return temporal.toPlainTime()
		}

		// Handle ZonedDateTime - extract local time
		if (temporal instanceof Temporal.ZonedDateTime) {
			return temporal.toPlainTime()
		}

		// Handle Duration - convert to time (wrap at 24 hours)
		if (temporal instanceof Temporal.Duration) {
			const totalNanoseconds = temporal.total({ unit: "nanoseconds" })
			const nanosecondsIn24Hours = 24 * 60 * 60 * 1_000_000_000
			const wrappedNanoseconds = totalNanoseconds % nanosecondsIn24Hours

			const hours = Math.floor(
				wrappedNanoseconds / (60 * 60 * 1_000_000_000),
			)
			const minutes = Math.floor(
				(wrappedNanoseconds % (60 * 60 * 1_000_000_000)) /
					(60 * 1_000_000_000),
			)
			const seconds = Math.floor(
				(wrappedNanoseconds % (60 * 1_000_000_000)) / 1_000_000_000,
			)
			const nanoseconds = wrappedNanoseconds % 1_000_000_000

			return Temporal.PlainTime.from({
				hour: hours,
				minute: minutes,
				second: seconds,
				millisecond: Math.floor(nanoseconds / 1_000_000),
				microsecond: Math.floor((nanoseconds % 1_000_000) / 1_000),
				nanosecond: nanoseconds % 1_000,
			})
		}

		// Handle string - try to parse
		if (typeof temporal === "string") {
			// Try to parse as PlainTime first
			try {
				return Temporal.PlainTime.from(temporal)
			} catch {
				// Try to parse as PlainDateTime and extract time
				try {
					const datetime = Temporal.PlainDateTime.from(temporal)
					return datetime.toPlainTime()
				} catch {
					// Try to parse as ZonedDateTime and extract time
					try {
						const zoned = Temporal.ZonedDateTime.from(temporal)
						return zoned.toPlainTime()
					} catch {
						return null
					}
				}
			}
		}

		return null
	} catch {
		return null
	}
}

export default toPlainTime
