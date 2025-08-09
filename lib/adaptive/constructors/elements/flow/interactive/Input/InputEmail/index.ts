import { AUTOCOMPLETES } from "../../../../../../constructors/elements/constants/index.ts"
import filterAttribute from "../../../../../../guards/filterAttribute/index.ts"
import isBoolean from "../../../../../../guards/isBoolean/index.ts"
import isInteger from "../../../../../../guards/isInteger/index.ts"
import isMemberOf from "../../../../../../guards/isMemberOf/index.ts"
import isString from "../../../../../../guards/isString/index.ts"
import pickGlobalAttributes from "../../../../../../guards/pickGlobalAttributes/index.ts"
import Input from "../index.ts"

/**
 * Filters attributes for InputEmail
 */
export const filterAttributes = (attributes: Record<string, any>) => {
	const {
		autocomplete,
		autofocus,
		dirname,
		disabled,
		form,
		list,
		maxlength,
		minlength,
		multiple,
		name,
		pattern,
		placeholder,
		readonly,
		required,
		size,
		value,
		...attrs
	} = attributes
	const globals = pickGlobalAttributes(attrs)

	return {
		...globals,
		...filterAttribute(isMemberOf(AUTOCOMPLETES))("autocomplete")(autocomplete),
		...filterAttribute(isBoolean)("autofocus")(autofocus),
		...filterAttribute(isString)("dirname")(dirname),
		...filterAttribute(isBoolean)("disabled")(disabled),
		...filterAttribute(isString)("form")(form),
		...filterAttribute(isString)("list")(list),
		...filterAttribute(isInteger)("maxlength")(maxlength),
		...filterAttribute(isInteger)("minlength")(minlength),
		...filterAttribute(isBoolean)("multiple")(multiple),
		...filterAttribute(isString)("name")(name),
		...filterAttribute(isString)("pattern")(pattern),
		...filterAttribute(isString)("placeholder")(placeholder),
		...filterAttribute(isBoolean)("readonly")(readonly),
		...filterAttribute(isBoolean)("required")(required),
		...filterAttribute(isInteger)("size")(size),
		...filterAttribute(isString)("value")(value),
	}
}

/**
 * Creates an InputEmail element configuration object
 *
 * The email input field allows users to input and edit email addresses.
 *
 * @example
 * ```typescript
 * const input = InputEmail({
 *   name: "email",
 *   placeholder: "Enter your email address",
 *   required: true,
 *   multiple: true
 * })
 * ```
 */
const InputEmail = Input("email")(filterAttributes)

export default InputEmail
