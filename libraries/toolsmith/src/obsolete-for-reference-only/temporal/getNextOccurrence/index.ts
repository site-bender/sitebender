//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
import isNullish from "../../validation/isNullish/index.ts"

const getNextOccurrence = (pattern: {
	unit: string
	interval: number
}) =>
(
	referenceDate: Temporal.PlainDate | null | undefined,
): Temporal.PlainDate | null => {
	if (isNullish(referenceDate)) {
		return null
	}

	if (!(referenceDate instanceof Temporal.PlainDate)) {
		return null
	}

	// Validate pattern
	if (
		!pattern || typeof pattern.unit !== "string" ||
		typeof pattern.interval !== "number"
	) {
		return null
	}

	if (pattern.interval <= 0) {
		return null
	}

	try {
		// Build duration object based on unit and interval
		switch (pattern.unit) {
			case "days":
				return referenceDate.add({ days: pattern.interval })

			case "weeks":
				return referenceDate.add({ weeks: pattern.interval })

			case "months":
				return referenceDate.add({ months: pattern.interval })

			case "years":
				return referenceDate.add({ years: pattern.interval })

			default:
				return null
		}
	} catch {
		return null
	}
}

export default getNextOccurrence
