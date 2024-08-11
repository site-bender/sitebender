import castToBoolean from "./castToBoolean"
import castToDate from "./castToDate"
import castToDateTime from "./castToDateTime"
import castToInteger from "./castToInteger"
import castToNumber from "./castToNumber"
import castToPercent from "./castToPercent"
import castToString from "./castToString"
import parseJson from "./parseJson"
import isDefined from "../isDefined"

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
			case "date":
				return castToDate(value.right)
			case "datetime":
				return castToDateTime(value.right)
			case "json":
				return parseJson(value.right)
			default:
				return { left: "Unknown datatype." }
		}
	}

	return { left: "Unable to cast value." }
}

export default castValue
