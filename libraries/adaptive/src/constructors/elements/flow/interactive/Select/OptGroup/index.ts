import type { Value, ComparatorConfig, LogicalConfig, Operand, OperatorConfig } from "@adaptiveTypes/index.ts"
import type { ElementConfig } from "@adaptiveSrc/constructors/elements/types/index.ts"
import type { OptionGroupAttributes } from "@adaptiveSrc/constructors/elements/types/attributes/index.ts"

import isDefined from "@toolkit/simple/validation/isDefined/index.ts"
import getId from "@adaptiveSrc/constructors/helpers/getId/index.ts"
import filterAttribute from "@adaptiveSrc/guards/filterAttribute/index.ts"
import isBoolean from "@adaptiveSrc/guards/isBoolean/index.ts"
import isString from "@adaptiveSrc/guards/isString/index.ts"
import pickGlobalAttributes from "@adaptiveSrc/guards/pickGlobalAttributes/index.ts"

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

export const filterAttributes = (attributes: Record<string, Value>): Record<string, Value> => {
	const { disabled, label, ...attrs } = attributes
	const globals = pickGlobalAttributes(attrs)

	const out: Record<string, Value> = {
		...globals,
		...filterAttribute(isBoolean)("disabled")(disabled as Value),
		...filterAttribute(isString)("label")(label as Value),
	}

	return out
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
		const { ...attribs } = filterAttributes(attrs as unknown as Record<string, Value>)

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
