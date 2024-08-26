import FilteredAllowText from "../../../../constructors/FilteredAllowText"
import filterAttribute from "../../../../guards/filterAttribute"
import isBoolean from "../../../../guards/isBoolean"
import isMemberOf from "../../../../guards/isMemberOf"
import isString from "../../../../guards/isString"
import pickGlobalAttributes from "../../../../guards/pickGlobalAttributes"
import {
	BUTTON_TYPES,
	FORM_METHODS,
	FORM_TARGETS,
	POPOVER_TARGET_ACTIONS,
} from "../../../../rendering/constants"
import { BUTTON_ROLES } from "../../../constants"

export const filterAttributes = attributes => {
	const {
		autofocus,
		disabled,
		form,
		formAction,
		formEncType,
		formMethod,
		formNoValidate,
		formTarget,
		name,
		popoverTarget,
		popoverTargetAction,
		role,
		type,
		value,
		...attrs
	} = attributes
	const globals = pickGlobalAttributes(attrs)

	return {
		...globals,
		...filterAttribute(isBoolean)("autofocus")(autofocus),
		...filterAttribute(isBoolean)("disabled")(disabled),
		...filterAttribute(isString)("form")(form),
		...filterAttribute(isString)("formAction")(formAction),
		...filterAttribute(isString)("formEncType")(formEncType),
		...filterAttribute(isMemberOf(FORM_METHODS))("formMethod")(formMethod),
		...filterAttribute(isBoolean)("formNoValidate")(formNoValidate),
		...filterAttribute(isMemberOf(FORM_TARGETS))("formTarget")(formTarget),
		...filterAttribute(isString)("name")(name),
		...filterAttribute(isString)("popoverTarget")(popoverTarget),
		...filterAttribute(isMemberOf(POPOVER_TARGET_ACTIONS))(
			"popoverTargetAction",
		)(popoverTargetAction),
		...filterAttribute(isMemberOf(BUTTON_ROLES))("role")(role),
		...filterAttribute(isMemberOf(BUTTON_TYPES))("type")(type),
		...filterAttribute(isString)("value")(value),
	}
}

const Button = FilteredAllowText("Button")(filterAttributes)

export default Button
