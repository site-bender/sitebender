import type { OptionAttributes } from "@engineSrc/constructors/elements/types/attributes/index.ts"
import type {
	ComparatorConfig,
	LogicalConfig,
	Operand,
	OperatorConfig,
	Value,
} from "@engineTypes/index.ts"
import filterAttributes from "./filterAttributes/index.ts"
import TextNode from "@engineSrc/constructors/elements/TextNode/index.ts"
import getId from "@engineSrc/constructors/helpers/getId/index.ts"
import isString from "@engineSrc/guards/isString/index.ts"
import isDefined from "@engineSrc/utilities/isDefined/index.ts"

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

// default-only exports
