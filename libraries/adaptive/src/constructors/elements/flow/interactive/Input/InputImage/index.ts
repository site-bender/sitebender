import type {
	ElementConfig,
	GlobalAttributes,
	Value,
} from "../../../../../../types/index.ts"
import type {
	ComparatorConfig,
	LogicalConfig,
	Operand,
	OperatorConfig,
} from "../../../../../types/index.ts"
import type { InputImageAttributes } from "../../types/attributes/index.ts"

import {
	FORM_METHODS,
	FORM_TARGETS,
	POPOVER_TARGET_ACTIONS,
} from "../../../../../../constructors/elements/constants/index.ts"
import filterAttribute from "../../../../../../guards/filterAttribute/index.ts"
import isBoolean from "../../../../../../guards/isBoolean/index.ts"
import isInteger from "../../../../../../guards/isInteger/index.ts"
import isMemberOf from "../../../../../../guards/isMemberOf/index.ts"
import isString from "../../../../../../guards/isString/index.ts"
import pickGlobalAttributes from "../../../../../../guards/pickGlobalAttributes/index.ts"
import Input from "../index.ts"

/**
 * Filters attributes for InputImage
 */

/**
 * Extended InputImage attributes including reactive properties
 */
export type InputImageElementAttributes = InputImageAttributes & {
	aria?: Record<string, Value>
	calculation?: Operand
	dataset?: Record<string, Value>
	display?: ComparatorConfig | LogicalConfig
	format?: OperatorConfig
	scripts?: string[]
	stylesheets?: string[]
	validation?: ComparatorConfig | LogicalConfig
}

export const filterAttributes = (attributes: InputImageAttributes) => {
	const {
		alt,
		autofocus,
		disabled,
		form,
		formaction,
		formenctype,
		formmethod,
		formnovalidate,
		formtarget,
		height,
		name,
		popovertarget,
		popovertargetaction,
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
		...filterAttribute(isString)("formaction")(formaction),
		...filterAttribute(isString)("formenctype")(formenctype),
		...filterAttribute(isMemberOf(FORM_METHODS))("formmethod")(formmethod),
		...filterAttribute(isBoolean)("formnovalidate")(formnovalidate),
		...filterAttribute(isMemberOf(FORM_TARGETS))("formtarget")(formtarget),
		...filterAttribute(isInteger)("height")(height),
		...filterAttribute(isString)("name")(name),
		...filterAttribute(isString)("popovertarget")(popovertarget),
		...filterAttribute(isMemberOf(POPOVER_TARGET_ACTIONS))(
			"popovertargetaction",
		)(popovertargetaction),
		...filterAttribute(isString)("src")(src),
		...filterAttribute(isInteger)("width")(width),
	}
}

/**
 * Creates an InputImage element configuration object
 *
 * The image input creates a clickable image that submits the form.
 *
 * @example
 * ```typescript
 * const input = InputImage({
 *   name: "submit",
 *   src: "submit-button.png",
 *   alt: "Submit",
 *   width: 100,
 *   height: 40,
 *   disabled: false
 * })
 * ```
 */
const InputImage = Input("image")(filterAttributes)

export default InputImage
