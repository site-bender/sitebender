import type {
	AdaptiveError,
	Either,
	Value,
} from "../../../types/index.ts"

import Error from "../../../constructors/Error/index.ts"

/**
 * Casts a value to a string
 * 
 * @param value - The value to cast to string
 * @returns Either an error or the string value
 * @example
 * ```typescript
 * castToString(42) // { right: "42" }
 * castToString(true) // { right: "true" }
 * castToString("hello") // { right: "hello" }
 * ```
 */
const castToString = (value: Value): Either<Array<AdaptiveError>, Value> => {
	if (typeof value === "string") {
		return { right: value }
	}

	if (typeof value === "number") {
		return { right: String(value) }
	}

	if (typeof value === "boolean") {
		return { right: value ? "true" : "false" }
	}

	return {
		left: [
			Error("castToString")("String")(
				`Cannot cast ${JSON.stringify(value)} to a string.`,
			),
		],
	}
}

export default castToString
