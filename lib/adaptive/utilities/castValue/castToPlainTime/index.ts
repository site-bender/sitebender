import type {
	AdaptiveError,
	Either,
	Value,
} from "../../../types/index.ts"

import Error from "../../../constructors/Error/index.ts"

/**
 * Casts a value to a Temporal.PlainTime
 * 
 * @param value - The value to cast to a PlainTime
 * @returns Either an error or the PlainTime value
 * @example
 * ```typescript
 * castToPlainTime("10:30:00") // { right: PlainTime }
 * castToPlainTime("invalid") // { left: [Error] }
 * ```
 */
const castToPlainTime = (value: Value): Either<Array<AdaptiveError>, Value> => {
	try {
		const t = Temporal.PlainTime.from(value)

		return { right: t }
	} catch (e) {
		return {
			left: [
				Error("castToPlainTime")("PlainTime")(
					`Cannot cast ${value} to a plain time: ${(e as Error).message}.`,
				),
			],
		}
	}
}

export default castToPlainTime
