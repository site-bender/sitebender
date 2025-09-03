import type { OptionGroupAttributes } from "@engineSrc/constructors/elements/types/attributes/index.ts"
import type { ElementConfig } from "@engineSrc/constructors/elements/types/index.ts"
import type {
import filterAttributes from "./filterAttributes/index.ts"
	ComparatorConfig,
	LogicalConfig,
	Operand,
	OperatorConfig,
	Value,
} from "@engineTypes/index.ts"

import getId from "@engineSrc/constructors/helpers/getId/index.ts"
import filterAttribute from "@engineSrc/guards/filterAttribute/index.ts"
import isBoolean from "@engineSrc/guards/isBoolean/index.ts"
import isString from "@engineSrc/guards/isString/index.ts"
import pickGlobalAttributes from "@engineSrc/guards/pickGlobalAttributes/index.ts"
import isDefined from "@toolkit/simple/validation/isDefined/index.ts"

/**
 * Filters attributes for OptGroup element
 * Allows global attributes and validates disabled and label attributes
 */

/**
 * Extended OptGroup attributes including reactive properties
 */
export type OptGroupElementAttributes = OptionGroupAttributes & {
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
 * Creates an OptGroup element configuration object
 *
 * The optgroup element represents a group of option elements
 * with a common label.
 *
 * @param attributes - Element attributes
 * @param children - Child elements (typically Option elements)
 * @returns Element configuration object
 *
 * @example
 * ```typescript
 * const optgroup = OptGroup({
 *   label: "Colors",
 *   disabled: false
 * })([
 *   Option({ value: "red" })("Red"),
 *   Option({ value: "blue" })("Blue")
 * ])
 * ```
 */
const OptGroup =
	(attributes: Record<string, Value> = {}) =>
	(children: Array<ElementConfig> | ElementConfig | string = []) => {
		const { dataset, display, id, ...attrs } = attributes
		const { ...attribs } = filterAttributes(
			attrs as unknown as Record<string, Value>,
		)

		return {
			attributes: {
				...getId(id),
				...attribs,
			},
			children,
			...(isDefined(dataset) ? { dataset } : {}),
			...(isDefined(display) ? { display } : {}),
			tag: "optgroup",
		}
	}

export default OptGroup

export { default as filterAttributes } from "./filterAttributes/index.ts"
