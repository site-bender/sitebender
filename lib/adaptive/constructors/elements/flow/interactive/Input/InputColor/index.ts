import { AUTOCOMPLETES } from "../../../../../../constructors/elements/constants/index.ts"
import filterAttribute from "../../../../../../guards/filterAttribute/index.ts"
import isBoolean from "../../../../../../guards/isBoolean/index.ts"
import isMemberOf from "../../../../../../guards/isMemberOf/index.ts"
import isString from "../../../../../../guards/isString/index.ts"
import pickGlobalAttributes from "../../../../../../guards/pickGlobalAttributes/index.ts"
import Input from "../index.ts"

/**
 * Filters attributes for InputColor
 */
export const filterAttributes = (attributes: Record<string, any>) => {
	const {
		autocomplete,
		autofocus,
		disabled,
		form,
		list,
		name,
		required,
		value,
		...attrs
	} = attributes
	const globals = pickGlobalAttributes(attrs)

	return {
		...globals,
		...filterAttribute(isMemberOf(AUTOCOMPLETES))("autocomplete")(autocomplete),
		...filterAttribute(isBoolean)("autofocus")(autofocus),
		...filterAttribute(isBoolean)("disabled")(disabled),
		...filterAttribute(isString)("form")(form),
		...filterAttribute(isString)("list")(list),
		...filterAttribute(isString)("name")(name),
		...filterAttribute(isBoolean)("required")(required),
		...filterAttribute(isString)("value")(value),
	}
}

/**
 * Creates an InputColor element configuration object
 *
 * The color input allows users to select a color.
 *
 * @example
 * ```typescript
 * const input = InputColor({
 *   name: "background",
 *   value: "#ff0000",
 *   required: true
 * })
 * ```
 */
const InputColor = Input("color")(filterAttributes)

export default InputColor
