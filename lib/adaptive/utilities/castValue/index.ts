import Error from "../../constructors/Error/index.js"
import isDefined from "../isDefined/index.js"
import castToBoolean from "./castToBoolean/index.js"
import castToInteger from "./castToInteger/index.js"
import castToNumber from "./castToNumber/index.js"
import castToPercent from "./castToPercent/index.js"
import castToPlainDate from "./castToPlainDate/index.js"
import castToPlainDateTime from "./castToPlainDateTime/index.js"
import castToPlainTime from "./castToPlainTime/index.js"
import castToString from "./castToString/index.js"
import castToZonedDateTime from "./castToZonedDateTime/index.js"
import parseJson from "./parseJson/index.js"

const castValue = (datatype) => (value) => {
	if (isDefined(value.left)) {
		return value
	}

	if (isDefined(value.right)) {
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
				return parseJson(value.right)
			default:
				return {
					left: [Error(datatype)("castValue")(`Unknown datatype: ${datatype}`)],
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
