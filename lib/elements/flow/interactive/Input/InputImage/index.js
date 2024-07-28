import filterAttribute from "../../../../../guards/filterAttribute"
import isBoolean from "../../../../../guards/isBoolean"
import isInteger from "../../../../../guards/isInteger"
import isMemberOf from "../../../../../guards/isMemberOf"
import isString from "../../../../../guards/isString"
import pickGlobalAttributes from "../../../../../guards/pickGlobalAttributes"
import {
	FORM_METHODS,
	POPOVER_TARGET_ACTIONS,
} from "../../../../../rendering/constants"
import Input from ".."

export const filterAttributes = attributes => {
	const {
		alt,
		form,
		formAction,
		formEncType,
		formMethod,
		formNoValidate,
		formTarget,
		height,
		name,
		popoverTarget,
		popoverTargetAction,
		src,
		value,
		width,
		...attrs
	} = attributes || {}
	const globals = pickGlobalAttributes(attrs)

	return {
		...globals,
		...filterAttribute(isString)("alt")(alt),
		...filterAttribute(isString)("form")(form),
		...filterAttribute(isString)("formAction")(formAction),
		...filterAttribute(isString)("formEncType")(formEncType),
		...filterAttribute(isMemberOf(FORM_METHODS))("formMethod")(formMethod),
		...filterAttribute(isBoolean)("formNoValidate")(formNoValidate),
		...filterAttribute(isString)("formTarget")(formTarget),
		...filterAttribute(isInteger)("height")(height),
		...filterAttribute(isString)("name")(name),
		...filterAttribute(isString)("popoverTarget")(popoverTarget),
		...filterAttribute(isMemberOf(POPOVER_TARGET_ACTIONS))(
			"popoverTargetAction",
		)(popoverTargetAction),
		...filterAttribute(isString)("src")(src),
		...filterAttribute(isString)("value")(value),
		...filterAttribute(isInteger)("width")(width),
	}
}

const InputImage = Input("Image")(filterAttributes)

export default InputImage
