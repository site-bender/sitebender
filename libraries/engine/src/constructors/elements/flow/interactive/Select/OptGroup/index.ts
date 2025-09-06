import type {
	ComparatorConfig,
	LogicalConfig,
	Operand,
	OperatorConfig,
	Value,
} from "@sitebender/engine-types/index.ts"
import type { OptionGroupAttributes } from "@sitebender/engine/constructors/elements/types/attributes/index.ts"
import type { ElementConfig } from "@sitebender/engine/constructors/elements/types/index.ts"

import getId from "@sitebender/engine/constructors/helpers/getId/index.ts"
import isDefined from "@sitebender/engine/utilities/isDefined/index.ts"

import filterAttributes from "./filterAttributes/index.ts"

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
			attrs as unknown as OptionGroupAttributes,
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

// default-only exports
