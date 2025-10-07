import type { InputSubmitAttributes } from "@sitebender/architect/constructors/elements/types/attributes/index.ts"

import {
	FORM_METHODS,
	FORM_TARGETS,
	POPOVER_TARGET_ACTIONS,
} from "@sitebender/architect/constructors/elements/constants/index.ts"
import filterAttribute from "@sitebender/architect/guards/filterAttribute/index.ts"
import isBoolean from "@sitebender/architect/guards/isBoolean/index.ts"
import isMemberOf from "@sitebender/architect/guards/isMemberOf/index.ts"
import isString from "@sitebender/architect/guards/isString/index.ts"
import pickGlobalAttributes from "@sitebender/architect/guards/pickGlobalAttributes/index.ts"

export default function filterAttributes(attributes: InputSubmitAttributes) {
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
		value,
		...attrs
	} = attributes
	const globals = pickGlobalAttributes(attrs)

	return {
		...globals,
		...filterAttribute(isBoolean)("autofocus")(autofocus),
		...filterAttribute(isBoolean)("disabled")(disabled),
		...filterAttribute(isString)("form")(form),
		...filterAttribute(isString)("formaction")(formAction),
		...filterAttribute(isString)("formenctype")(formEncType),
		...filterAttribute(isMemberOf(FORM_METHODS))("formmethod")(formMethod),
		...filterAttribute(isBoolean)("formnovalidate")(formNoValidate),
		...filterAttribute(isMemberOf(FORM_TARGETS))("formtarget")(formTarget),
		...filterAttribute(isString)("name")(name),
		...filterAttribute(isString)("popovertarget")(popoverTarget),
		...filterAttribute(isMemberOf(POPOVER_TARGET_ACTIONS))(
			"popovertargetaction",
		)(popoverTargetAction),
		...filterAttribute(isString)("value")(value),
	}
}
