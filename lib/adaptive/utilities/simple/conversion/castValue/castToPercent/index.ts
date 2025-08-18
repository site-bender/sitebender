import type {
	AdaptiveError,
	Either,
	Value,
} from "../../../types/index.ts"

import Error from "../../../constructors/Error/index.ts"
import { MATCHERS } from "../../../guards/constants/index.ts"

/**
 * Casts a value to a percentage (divides by 100)
 * 
 * @param value - The value to cast to percent
 * @returns Either an error or the percentage value
 * @example
 * ```typescript
 * castToPercent("50") // { right: 0.5 }
 * castToPercent("100") // { right: 1 }
 * castToPercent("abc") // { left: [Error] }
 * ```
 */
const castToPercent = (value: Value): Either<Array<AdaptiveError>, Value> => {
	if (MATCHERS.number.test(String(value))) {
		return { right: parseFloat(String(value)) / 100 }
	}

	return {
		left: [
			Error("castToPercent")("Percent")(
				`Cannot cast ${JSON.stringify(value)} to a percent.`,
			),
		],
	}
}

export default castToPercent
