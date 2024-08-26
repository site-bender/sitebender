import castToBoolean from "./castToBoolean"
import castToPlainDate from "./castToPlainDate"
import castToPlainDateTime from "./castToPlainDateTime"
import castToInteger from "./castToInteger"
import castToNumber from "./castToNumber"
import castToPercent from "./castToPercent"
import castToString from "./castToString"
import parseJson from "./parseJson"
import isDefined from "../isDefined"
import castToPlainTime from "./castToPlainTime"
import castToZonedDateTime from "./castToZonedDateTime"
import Error from "../../constructors/Error"

const castValue = datatype => value => {
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
