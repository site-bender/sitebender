import type {
	AdaptiveError,
	Either,
	Value,
} from "../../../types/index.ts"

import Error from "../../../constructors/Error/index.ts"

const castToZonedDateTime = (
	value: Value,
): Either<Array<AdaptiveError>, Value> => {
	try {
		const zdt = Temporal.ZonedDateTime.from(value)

		return { right: zdt }
	} catch (e) {
		return {
			left: [
				Error("castToZonedDateTime")("ZonedDateTime")(
					`Cannot cast ${value} to a zoned date-time: ${(e as Error).message}.`,
				),
			],
		}
	}
}

export default castToZonedDateTime
