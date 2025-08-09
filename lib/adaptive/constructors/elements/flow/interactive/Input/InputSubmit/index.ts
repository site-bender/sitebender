import {
	FORM_METHODS,
	FORM_TARGETS,
	POPOVER_TARGET_ACTIONS,
} from "../../../../../../constructors/elements/constants/index.ts"
import filterAttribute from "../../../../../../guards/filterAttribute/index.ts"
import isBoolean from "../../../../../../guards/isBoolean/index.ts"
import isMemberOf from "../../../../../../guards/isMemberOf/index.ts"
import isString from "../../../../../../guards/isString/index.ts"
import pickGlobalAttributes from "../../../../../../guards/pickGlobalAttributes/index.ts"
import Input from "../index.ts"

/**
 * Filters attributes for InputSubmit
 */
export const filterAttributes = (attributes: Record<string, any>) => {
	const {
		autofocus,
		disabled,
		form,
		formaction,
		formenctype,
		formmethod,
		formnovalidate,
		formtarget,
		name,
		popovertarget,
		popovertargetaction,
		value,
		...attrs
	} = attributes
	const globals = pickGlobalAttributes(attrs)

	return {
		...globals,
		...filterAttribute(isBoolean)("autofocus")(autofocus),
		...filterAttribute(isBoolean)("disabled")(disabled),
		...filterAttribute(isString)("form")(form),
		...filterAttribute(isString)("formaction")(formaction),
		...filterAttribute(isString)("formenctype")(formenctype),
		...filterAttribute(isMemberOf(FORM_METHODS))("formmethod")(formmethod),
		...filterAttribute(isBoolean)("formnovalidate")(formnovalidate),
		...filterAttribute(isMemberOf(FORM_TARGETS))("formtarget")(formtarget),
		...filterAttribute(isString)("name")(name),
		...filterAttribute(isString)("popovertarget")(popovertarget),
		...filterAttribute(isMemberOf(POPOVER_TARGET_ACTIONS))(
			"popovertargetaction",
		)(popovertargetaction),
		...filterAttribute(isString)("value")(value),
	}
}

/**
 * Creates an InputSubmit element configuration object
 *
 * The submit input creates a button that submits the form.
 *
 * @example
 * ```typescript
 * const input = InputSubmit({
 *   value: "Submit Form",
 *   formaction: "/submit",
 *   formmethod: "post"
 * })
 * ```
 */
const InputSubmit = Input("submit")(filterAttributes)

export default InputSubmit
