import filterAttribute from "../../../../../guards/filterAttribute"
import isBoolean from "../../../../../guards/isBoolean"
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
		form,
		formAction,
		formEncType,
		formMethod,
		formNoValidate,
		formTarget,
		name,
		popoverTarget,
		popoverTargetAction,
		value,
		...attrs
	} = attributes || {}
	const globals = pickGlobalAttributes(attrs)

	return {
		...globals,
		...filterAttribute(isString)("form")(form),
		...filterAttribute(isString)("formAction")(formAction),
		...filterAttribute(isString)("formEncType")(formEncType),
		...filterAttribute(isMemberOf(FORM_METHODS))("formMethod")(formMethod),
		...filterAttribute(isBoolean)("formNoValidate")(formNoValidate),
		...filterAttribute(isString)("formTarget")(formTarget),
		...filterAttribute(isString)("name")(name),
		...filterAttribute(isString)("popoverTarget")(popoverTarget),
		...filterAttribute(isMemberOf(POPOVER_TARGET_ACTIONS))(
			"popoverTargetAction",
		)(popoverTargetAction),
		...filterAttribute(isString)("value")(value),
	}
}

const InputSubmit = Input("Submit")(filterAttributes)

export default InputSubmit
