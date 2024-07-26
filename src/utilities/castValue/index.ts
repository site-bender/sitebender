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
		switch (datatype) {
			case "Integer":
				return castToInteger(value.right)
			case "Number":
				return castToNumber(value.right)
			case "Percent":
				return castToPercent(value.right)
			case "Boolean":
				return castToBoolean(value.right)
			case "String":
				return castToString(value.right)
			case "Date":
				return castToDate(value.right)
			case "DateTime":
				return castToDateTime(value.right)
			case "Json":
				return parseJson(value.right)
			default:
				return { left: "Unknown datatype." }
		}
	}

	return { left: "Unable to cast value." }
}

export default castValue
