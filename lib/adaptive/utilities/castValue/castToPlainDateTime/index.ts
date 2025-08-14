import type {
	AdaptiveError,
	Either,
	Value,
} from "../../../types/index.ts"

import Error from "../../../constructors/Error/index.ts"

/**
 * Casts a value to a Temporal.PlainDateTime
 * 
 * @param value - The value to cast to a PlainDateTime
 * @returns Either an error or the PlainDateTime value
 * @example
 * ```typescript
 * castToPlainDateTime("2024-01-15T10:30:00") // { right: PlainDateTime }
 * castToPlainDateTime("invalid") // { left: [Error] }
 * ```
 */
const castToPlainDateTime = (value: Value): Either<Array<AdaptiveError>, Value> => {
	try {
		const dt = Temporal.PlainDateTime.from(value)

		return { right: dt }
	} catch (e) {
		return {
			left: [
				Error("castToPlainDateTime")("PlainDateTime")(
					`Cannot cast ${value} to a plain date-time: ${(e as Error).message}.`,
				),
			],
		}
	}
}

export default castToPlainDateTime
