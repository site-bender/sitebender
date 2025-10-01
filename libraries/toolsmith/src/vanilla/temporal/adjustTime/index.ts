import isNotUndefined from "../../validation/isNotUndefined/index.ts"
import isNullish from "../../validation/isNullish/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
const adjustTime = (
	timeAdjustment:
		| {
			hour?: number
			minute?: number
			second?: number
			millisecond?: number
			microsecond?: number
			nanosecond?: number
		}
		| null
		| undefined,
) =>
(
	datetime: Temporal.PlainDateTime | null | undefined,
): Temporal.PlainDateTime | null => {
	if (isNullish(datetime) || isNullish(timeAdjustment)) {
		return null
	}

	if (!(datetime instanceof Temporal.PlainDateTime)) {
		return null
	}

	try {
		// Build the with() argument, only including defined properties
		const withArgs: Record<string, number> = {}

		if (isNotUndefined(timeAdjustment.hour)) {
			withArgs.hour = timeAdjustment.hour
		}
		if (isNotUndefined(timeAdjustment.minute)) {
			withArgs.minute = timeAdjustment.minute
		}
		if (isNotUndefined(timeAdjustment.second)) {
			withArgs.second = timeAdjustment.second
		}
		if (isNotUndefined(timeAdjustment.millisecond)) {
			withArgs.millisecond = timeAdjustment.millisecond
		}
		if (isNotUndefined(timeAdjustment.microsecond)) {
			withArgs.microsecond = timeAdjustment.microsecond
		}
		if (isNotUndefined(timeAdjustment.nanosecond)) {
			withArgs.nanosecond = timeAdjustment.nanosecond
		}

		return datetime.with(withArgs)
	} catch {
		return null
	}
}

export default adjustTime
