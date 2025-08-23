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
import type { OptionGroupAttributes } from "../../types/attributes/index.ts"

import isDefined from "../../../../../../../utilities/isDefined/index.ts"
import getId from "../../../../../../constructors/helpers/getId/index.ts"
import filterAttribute from "../../../../../../guards/filterAttribute/index.ts"
import isBoolean from "../../../../../../guards/isBoolean/index.ts"
import isString from "../../../../../../guards/isString/index.ts"
import pickGlobalAttributes from "../../../../../../guards/pickGlobalAttributes/index.ts"

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

export const filterAttributes = (attributes: OptionGroupAttributes) => {
	const { disabled, label, ...attrs } = attributes
	const globals = pickGlobalAttributes(attrs)

	return {
		...globals,
		...filterAttribute(isBoolean)("disabled")(disabled),
		...filterAttribute(isString)("label")(label),
	}
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
		const { ...attribs } = filterAttributes(attrs)

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
