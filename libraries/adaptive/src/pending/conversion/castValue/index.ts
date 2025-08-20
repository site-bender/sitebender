import type {
	AdaptiveError,
	Datatype,
	Either,
	Value,
} from "../../types/index.ts"
import { isLeft, isRight } from "../../types/index.ts"

import Error from "../../constructors/Error/index.ts"
import isDefined from "../isDefined/index.ts"
import castToBoolean from "./castToBoolean/index.ts"
import castToInteger from "./castToInteger/index.ts"
import castToNumber from "./castToNumber/index.ts"
import castToPercent from "./castToPercent/index.ts"
import castToPlainDate from "./castToPlainDate/index.ts"
import castToPlainDateTime from "./castToPlainDateTime/index.ts"
import castToPlainTime from "./castToPlainTime/index.ts"
import castToString from "./castToString/index.ts"
import castToZonedDateTime from "./castToZonedDateTime/index.ts"
import parseJson from "./parseJson/index.ts"

/**
 * Casts a value to a specific datatype
 * 
 * @param datatype - The target datatype to cast to
 * @returns Function that takes an Either value and returns cast result
 * @example
 * ```typescript
 * castValue("integer")({ right: "123" }) // { right: 123 }
 * castValue("boolean")({ right: "true" }) // { right: true }
 * ```
 */
const castValue =
	(datatype: Datatype) =>
	(
		value: Either<Array<AdaptiveError>, Value>,
	): Either<Array<AdaptiveError>, Value> => {
	if (isLeft(value)) {
		return value
	}

	if (isRight(value)) {
		switch (datatype.toLocaleLowerCase()) {
			case "integer":
				return castToInteger(value.right)
			case "number":
				return castToNumber(value.right)
			case "percent":
				return castToPercent(value.right)
			case "boolean":
				return castToBoolean(value.right)
			case "string":
				return castToString(value.right)
			case "plaindatetime":
				return castToPlainDateTime(value.right)
			case "plaindate":
				return castToPlainDate(value.right)
			case "plaintime":
				return castToPlainTime(value.right)
			case "zoneddatetime":
				return castToZonedDateTime(value.right)
			case "json":
				return parseJson(String(value.right))
			default:
				return {
					left: [
						Error(datatype)("castValue")(`Unknown datatype: ${datatype}`),
					],
				}
		}
	}

	return {
		left: [
			Error(datatype)("castValue")(
				`Unable to cast value: ${JSON.stringify(value)}`,
			),
		],
	}
}

export default castValue
