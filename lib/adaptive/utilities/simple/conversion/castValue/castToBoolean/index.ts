import type {
	AdaptiveError,
	Either,
	Value,
} from "../../../types/index.ts"

import Error from "../../../constructors/Error/index.ts"

/**
 * Casts a value to a boolean
 * 
 * @param value - The value to cast to boolean
 * @returns Either an error or the boolean value
 * @example
 * ```typescript
 * castToBoolean("true") // { right: true }
 * castToBoolean(0) // { right: false }
 * castToBoolean("yes") // { right: true }
 * ```
 */
const castToBoolean = (value: Value): Either<Array<AdaptiveError>, Value> => {
	if (typeof value === "boolean") {
		return { right: value }
	}

	if (typeof value === "string") {
		const val = value.toLocaleLowerCase()

		if (val === "t" || val === "true" || val === "yes") {
			return { right: true }
		}

		if (val === "f" || val === "false" || val === "no") {
			return { right: false }
		}
	}

	if (typeof value === "number") {
		if (value === 0) {
			return { right: false }
		}

		return { right: true }
	}

	return {
		left: [
			Error("castToBoolean")("Boolean")(
				`Cannot cast ${JSON.stringify(value)} to a boolean.`,
			),
		],
	}
}

export default castToBoolean
