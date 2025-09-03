import type { InputImageAttributes } from "@engineSrc/constructors/elements/types/attributes/index.ts"
import type {
import type { Record } from "../index.ts"

export default function filterAttributes(attributes: Record<string, Value>) {

	const {
		alt,
		autofocus,
		disabled,
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
		width,
		...attrs
	} = attributes as unknown as InputImageAttributes
	const globals = pickGlobalAttributes(attrs)

	return {
		...globals,
		...filterAttribute(isString)("alt")(alt),
		...filterAttribute(isBoolean)("autofocus")(autofocus),
		...filterAttribute(isBoolean)("disabled")(disabled),
		...filterAttribute(isString)("form")(form),
		...filterAttribute(isString)("formaction")(formAction),
		...filterAttribute(isString)("formenctype")(formEncType),
		...filterAttribute(isMemberOf(FORM_METHODS))("formmethod")(formMethod),
		...filterAttribute(isBoolean)("formnovalidate")(formNoValidate),
		...filterAttribute(isMemberOf(FORM_TARGETS))("formtarget")(formTarget),
		...filterAttribute(isInteger)("height")(height),
		...filterAttribute(isString)("name")(name),
		...filterAttribute(isString)("popovertarget")(popoverTarget),
		...filterAttribute(isMemberOf(POPOVER_TARGET_ACTIONS))(
			"popovertargetaction",
		)(popoverTargetAction),
		...filterAttribute(isString)("src")(src),
		...filterAttribute(isInteger)("width")(width),
	}

}
