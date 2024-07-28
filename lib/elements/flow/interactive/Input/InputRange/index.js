import filterAttribute from "../../../../../guards/filterAttribute"
import isMemberOf from "../../../../../guards/isMemberOf"
import isNumber from "../../../../../guards/isNumber"
import isString from "../../../../../guards/isString"
import pickGlobalAttributes from "../../../../../guards/pickGlobalAttributes"
import { AUTOCOMPLETES } from "../../../../../rendering/constants"
import Input from ".."

export const filterAttributes = attributes => {
	const { autocomplete, form, list, max, min, name, step, value, ...attrs } =
		attributes || {}
	const globals = pickGlobalAttributes(attrs)

	return {
		...globals,
		...filterAttribute(isMemberOf(AUTOCOMPLETES))("autocomplete")(autocomplete),
		...filterAttribute(isString)("form")(form),
		...filterAttribute(isString)("list")(list),
		...filterAttribute(isNumber)("max")(max),
		...filterAttribute(isNumber)("min")(min),
		...filterAttribute(isString)("name")(name),
		...filterAttribute(isNumber)("step")(step),
		...filterAttribute(isMemberOf(["any"]))("step")(step),
		...filterAttribute(isString)("value")(value),
	}
}

const InputRange = Input("Range")(filterAttributes)

export default InputRange
