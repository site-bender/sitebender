import type {
	AdaptiveError,
	Either,
	Value,
} from "../../../types/index.ts"

import Error from "../../../constructors/Error/index.ts"
import { MATCHERS } from "../../../guards/constants/index.ts"

/**
 * Casts a value to an integer
 * 
 * @param value - The value to cast to integer
 * @returns Either an error or the integer value
 * @example
 * ```typescript
 * castToInteger("42") // { right: 42 }
 * castToInteger("3.14") // { left: [Error] }
 * castToInteger("abc") // { left: [Error] }
 * ```
 */
const castToInteger = (value: Value): Either<Array<AdaptiveError>, Value> => {
	if (MATCHERS.integer.test(String(value))) {
		return { right: parseInt(String(value), 10) }
	}

	return {
		left: [
			Error("castToInteger")("Integer")(
				`Cannot cast ${JSON.stringify(value)} to an integer.`,
			),
		],
	}
}

export default castToInteger
