import isNullish from "../../validation/isNullish/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
export default function addDays(days: number) {
	return function addDaysToDate(
		date: Temporal.PlainDate | Temporal.PlainDateTime | null | undefined,
	): Temporal.PlainDate | Temporal.PlainDateTime | null {
		if (isNullish(date)) {
			return null
		}

		if (
			!(date instanceof Temporal.PlainDate) &&
			!(date instanceof Temporal.PlainDateTime)
		) {
			return null
		}

		try {
			return date.add({ days })
		} catch {
			return null
		}
	}
}
