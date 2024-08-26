import Filtered from "../../../../constructors/Filtered"
import filterAttribute from "../../../../guards/filterAttribute"
import isString from "../../../../guards/isString"
import pickGlobalAttributes from "../../../../guards/pickGlobalAttributes"
import isNumber from "../../../../utilities/isNumber"

export const filterAttributes = attributes => {
	const { form, high, low, max, min, optimum, value, ...attrs } = attributes
	const globals = pickGlobalAttributes(attrs)

	return {
		...globals,
		...filterAttribute(isString)("form")(form),
		...filterAttribute(isNumber)("high")(high),
		...filterAttribute(isNumber)("low")(low),
		...filterAttribute(isNumber)("max")(max),
		...filterAttribute(isNumber)("min")(min),
		...filterAttribute(isNumber)("optimum")(optimum),
		...filterAttribute(isNumber)("value")(value),
	}
}

const Meter = Filtered("Meter")(filterAttributes)

export default Meter
