import type { TextAreaAttributes } from "@engineSrc/constructors/elements/types/attributes/index.ts"
import type {
	ComparatorConfig,
	LogicalConfig,
	Operand,
	OperatorConfig,
	Value,
} from "@engineTypes/index.ts"

import { TEXTAREA_ROLES } from "@engineSrc/constructors/elements/constants/aria-roles.ts"
import {
	AUTOCOMPLETES,
	WRAPS,
} from "@engineSrc/constructors/elements/constants/index.ts"
import TextNode from "@engineSrc/constructors/elements/TextNode/index.ts"
import getId from "@engineSrc/constructors/helpers/getId/index.ts"
import filterAttribute from "@engineSrc/guards/filterAttribute/index.ts"
import isBoolean from "@engineSrc/guards/isBoolean/index.ts"
import isInteger from "@engineSrc/guards/isInteger/index.ts"
import isMemberOf from "@engineSrc/guards/isMemberOf/index.ts"
import isString from "@engineSrc/guards/isString/index.ts"
import pickGlobalAttributes from "@engineSrc/guards/pickGlobalAttributes/index.ts"
import isDefined from "@toolkit/simple/validation/isDefined/index.ts"

/**
 * Filters attributes for TextArea element
 * Allows global attributes and validates textarea-specific attributes
 */

/**
 * Extended TextArea attributes including reactive properties
 */
export type TextAreaElementAttributes = TextAreaAttributes & {
	aria?: Record<string, Value>
	calculation?: Operand
	dataset?: Record<string, Value>
	display?: ComparatorConfig | LogicalConfig
	format?: OperatorConfig
	scripts?: string[]
	stylesheets?: string[]
	validation?: ComparatorConfig | LogicalConfig
}

export const filterAttributes = (
	attributes: TextAreaAttributes,
): Record<string, Value> => {
	const {
		autocomplete,
		cols,
		dirName,
		disabled,
		form,
		maxLength,
		minLength,
		name,
		placeholder,
		readOnly,
		required,
		role,
		rows,
		wrap,
		...attrs
	} = attributes
	const globals = pickGlobalAttributes(attrs)

	return {
		...globals,
		...filterAttribute(isMemberOf(AUTOCOMPLETES))("autocomplete")(
			autocomplete as Value,
		),
		...filterAttribute(isInteger)("cols")(cols),
		...filterAttribute(isString)("dirName")(dirName),
		...filterAttribute(isBoolean)("disabled")(disabled),
		...filterAttribute(isString)("form")(form),
		...filterAttribute(isInteger)("maxLength")(maxLength),
		...filterAttribute(isInteger)("minLength")(minLength),
		...filterAttribute(isString)("name")(name),
		...filterAttribute(isString)("placeholder")(placeholder),
		...filterAttribute(isBoolean)("readOnly")(readOnly),
		...filterAttribute(isBoolean)("required")(required),
		...filterAttribute(isMemberOf(TEXTAREA_ROLES))("role")(role),
		...filterAttribute(isInteger)("rows")(rows),
		...filterAttribute(isMemberOf(WRAPS))("wrap")(wrap),
	}
}

/**
 * Creates a TextArea element configuration object
 *
 * The textarea element represents a multiline plain text edit control
 * for the element's raw value.
 *
 * @param attributes - Element attributes
 * @param content - Text content for the textarea
 * @returns Element configuration object
 *
 * @example
 * ```typescript
 * const textarea = TextArea({
 *   name: "message",
 *   rows: 4,
 *   cols: 50,
 *   placeholder: "Enter your message..."
 * })("Default content")
 * ```
 */
const TextArea =
	(attributes: Record<string, Value> = {}) => (content?: string) => {
		const {
			calculation,
			dataset,
			display,
			format,
			scripts,
			stylesheets,
			validation,
			...attrs
		} = attributes
		const { id, ...attribs } = filterAttributes(attrs)

		// Convert string content to TextNode children
		const kids = isString(content) && content !== ""
			? [TextNode(content)]
			: undefined

		return {
			attributes: {
				...getId(id),
				...attribs,
			},
			children: kids,
			...(isDefined(calculation) ? { calculation } : {}),
			...(isDefined(dataset) ? { dataset } : {}),
			...(isDefined(display) ? { display } : {}),
			...(isDefined(format) ? { format } : {}),
			...(isDefined(scripts) ? { scripts } : {}),
			...(isDefined(stylesheets) ? { stylesheets } : {}),
			...(isDefined(validation) ? { validation } : {}),
			tag: "textarea",
		}
	}

export default TextArea
