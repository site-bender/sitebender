import type { OptionAttributes } from "@adaptiveSrc/constructors/elements/types/attributes/index.ts"
import type {
	ComparatorConfig,
	LogicalConfig,
	Operand,
	OperatorConfig,
	Value,
} from "@adaptiveTypes/index.ts"

import TextNode from "@adaptiveSrc/constructors/elements/TextNode/index.ts"
import getId from "@adaptiveSrc/constructors/helpers/getId/index.ts"
import filterAttribute from "@adaptiveSrc/guards/filterAttribute/index.ts"
import isBoolean from "@adaptiveSrc/guards/isBoolean/index.ts"
import isString from "@adaptiveSrc/guards/isString/index.ts"
import pickGlobalAttributes from "@adaptiveSrc/guards/pickGlobalAttributes/index.ts"
import isDefined from "@toolkit/simple/validation/isDefined/index.ts"

/**
 * Filters attributes for Option element
 * Allows global attributes and validates disabled, label, selected, and value attributes
 */

/**
 * Extended Option attributes including reactive properties
 */
export type OptionElementAttributes = OptionAttributes & {
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
	attributes: Record<string, Value>,
): Record<string, Value> => {
	const { disabled, label, selected, value, ...attrs } = attributes
	const globals = pickGlobalAttributes(attrs)

	const out: Record<string, Value> = {
		...globals,
		...filterAttribute(isBoolean)("disabled")(disabled as Value),
		...filterAttribute(isString)("label")(label as Value),
		...filterAttribute(isBoolean)("selected")(selected as Value),
		...filterAttribute(isString)("value")(value as Value),
	}

	return out
}

/**
 * Creates an Option element configuration object
 *
 * The option element represents an option in a select element
 * or as part of a list of suggestions in a datalist element.
 *
 * @param attributes - Element attributes
 * @param label - Text content for the option
 * @returns Element configuration object
 *
 * @example
 * ```typescript
 * const option = Option({
 *   value: "red",
 *   selected: true
 * })("Red")
 * ```
 */
const Option = (attributes: Record<string, Value> = {}) => (label?: string) => {
	const { dataset, display, id, ...attrs } = attributes
	const { ...attribs } = filterAttributes(attrs)

	// Convert string label to TextNode children
	const kids = isString(label) ? [TextNode(label)] : undefined

	return {
		attributes: {
			...getId(id),
			...attribs,
		},
		children: kids,
		...(isDefined(dataset) ? { dataset } : {}),
		...(isDefined(display) ? { display } : {}),
		tag: "option",
	}
}

export default Option
