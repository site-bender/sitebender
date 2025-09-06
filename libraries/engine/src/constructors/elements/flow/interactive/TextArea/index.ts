import type {
	ComparatorConfig,
	LogicalConfig,
	Operand,
	OperatorConfig,
	Value,
} from "@sitebender/engine-types/index.ts"
import type { TextAreaAttributes } from "@sitebender/engine/constructors/elements/types/attributes/index.ts"

import TextNode from "@sitebender/engine/constructors/elements/TextNode/index.ts"
import getId from "@sitebender/engine/constructors/helpers/getId/index.ts"
import isString from "@sitebender/engine/guards/isString/index.ts"
import isDefined from "@sitebender/engine/utilities/isDefined/index.ts"

import filterAttributes from "./filterAttributes/index.ts"

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
