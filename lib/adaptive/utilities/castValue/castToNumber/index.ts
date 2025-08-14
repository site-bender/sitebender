import type {
	AdaptiveError,
	Either,
	Value,
} from "../../../types/index.ts"

import Error from "../../../constructors/Error/index.ts"
import { MATCHERS } from "../../../guards/constants/index.ts"

/**
 * Casts a value to a number
 * 
 * @param value - The value to cast to number
 * @returns Either an error or the numeric value
 * @example
 * ```typescript
 * castToNumber("42") // { right: 42 }
 * castToNumber("3.14") // { right: 3.14 }
 * castToNumber("abc") // { left: [Error] }
 * ```
 */
const castToNumber = (value: Value): Either<Array<AdaptiveError>, Value> => {
	if (MATCHERS.number.test(String(value))) {
		return { right: parseFloat(String(value)) }
	}

	return {
		left: [
			Error("castToNumber")("Number")(
				`Cannot cast ${JSON.stringify(value)} to a number.`,
			),
		],
	}
}

export default castToNumber
