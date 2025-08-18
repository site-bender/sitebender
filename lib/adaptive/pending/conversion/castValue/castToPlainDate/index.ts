import type {
	AdaptiveError,
	Either,
	Value,
} from "../../../types/index.ts"

import Error from "../../../constructors/Error/index.ts"

const castToPlainDate = (value: Value): Either<Array<AdaptiveError>, Value> => {
	try {
		const d = Temporal.PlainDate.from(value)

		return { right: d }
	} catch (e) {
		return {
			left: [
				Error("castToPlainDate")("PlainDate")(
					`Cannot cast ${value} to a plain date: ${(e as Error).message}.`,
				),
			],
		}
	}
}

export default castToPlainDate
