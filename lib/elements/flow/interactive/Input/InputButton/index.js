import filterAttribute from "../../../../../guards/filterAttribute"
import isMemberOf from "../../../../../guards/isMemberOf"
import isString from "../../../../../guards/isString"
import pickGlobalAttributes from "../../../../../guards/pickGlobalAttributes"
import { POPOVER_TARGET_ACTIONS } from "../../../../../rendering/constants"
import Input from ".."

export const filterAttributes = attributes => {
	const { form, popoverTarget, popoverTargetAction, value, ...attrs } =
		attributes
	const globals = pickGlobalAttributes(attrs)

	return {
		...globals,
		...filterAttribute(isString)("form")(form),
		...filterAttribute(isString)("popoverTarget")(popoverTarget),
		...filterAttribute(isMemberOf(POPOVER_TARGET_ACTIONS))(
			"popoverTargetAction",
		)(popoverTargetAction),
		...filterAttribute(isString)("value")(value),
	}
}

const InputButton = Input("Button")(filterAttributes)

export default InputButton
