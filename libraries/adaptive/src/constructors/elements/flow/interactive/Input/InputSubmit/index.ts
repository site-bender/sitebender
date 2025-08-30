import type { Value } from "@adaptiveTypes/index.ts"
import type {
	ComparatorConfig,
	LogicalConfig,
	Operand,
	OperatorConfig,
} from "@adaptiveTypes/index.ts"
import type { InputSubmitAttributes } from "@adaptiveSrc/constructors/elements/types/attributes/index.ts"

import {
	FORM_METHODS,
	FORM_TARGETS,
	POPOVER_TARGET_ACTIONS,
} from "@adaptiveSrc/constructors/elements/constants/index.ts"
import filterAttribute from "@adaptiveSrc/guards/filterAttribute/index.ts"
import isBoolean from "@adaptiveSrc/guards/isBoolean/index.ts"
import isMemberOf from "@adaptiveSrc/guards/isMemberOf/index.ts"
import isString from "@adaptiveSrc/guards/isString/index.ts"
import pickGlobalAttributes from "@adaptiveSrc/guards/pickGlobalAttributes/index.ts"
import Input from "@adaptiveSrc/constructors/elements/flow/interactive/Input/index.ts"

/**
 * Filters attributes for InputSubmit
 */

/**
 * Extended InputSubmit attributes including reactive properties
 */
export type InputSubmitElementAttributes = InputSubmitAttributes & {
	aria?: Record<string, Value>
	calculation?: Operand
	dataset?: Record<string, Value>
	display?: ComparatorConfig | LogicalConfig
	format?: OperatorConfig
	scripts?: string[]
	stylesheets?: string[]
	validation?: ComparatorConfig | LogicalConfig
}

export const filterAttributes = (attributes: Record<string, Value>) => {
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
	} = attributes as unknown as InputSubmitAttributes
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
