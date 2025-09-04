import type { InputImageAttributes } from "@sitebender/engine/constructors/elements/types/attributes/index.ts"

import { FORM_METHODS, FORM_TARGETS, POPOVER_TARGET_ACTIONS } from "@sitebender/engine/constructors/elements/constants/index.ts"
import filterAttribute from "@sitebender/engine/guards/filterAttribute/index.ts"
import isBoolean from "@sitebender/engine/guards/isBoolean/index.ts"
import isInteger from "@sitebender/engine/guards/isInteger/index.ts"
import isMemberOf from "@sitebender/engine/guards/isMemberOf/index.ts"
import isString from "@sitebender/engine/guards/isString/index.ts"
import pickGlobalAttributes from "@sitebender/engine/guards/pickGlobalAttributes/index.ts"

export default function filterAttributes(attributes: InputImageAttributes) {

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
	} = attributes
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
