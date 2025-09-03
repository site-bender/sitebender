import type { MeterAriaAttributes } from "@engineSrc/constructors/elements/types/aria/index.ts"
import type { MeterAttributes } from "@engineSrc/constructors/elements/types/attributes/index.ts"
import type { ElementConfig } from "@engineSrc/constructors/elements/types/index.ts"
import type {
import filterAttributes from "./filterAttributes/index.ts"
	ComparatorConfig,
	LogicalConfig,
	Operand,
	OperatorConfig,
	Value,
} from "@engineTypes/index.ts"

import TextNode from "@engineSrc/constructors/elements/TextNode/index.ts"
import getId from "@engineSrc/constructors/helpers/getId/index.ts"
import { ADVANCED_FILTERS } from "@engineSrc/guards/createAdvancedFilters/index.ts"
import filterAttribute from "@engineSrc/guards/filterAttribute/index.ts"
import isBoolean from "@engineSrc/guards/isBoolean/index.ts"
import isNumber from "@engineSrc/guards/isNumber/index.ts"
import isString from "@engineSrc/guards/isString/index.ts"
import pickGlobalAttributes from "@engineSrc/guards/pickGlobalAttributes/index.ts"
import isDefined from "@engineSrc/utilities/isDefined/index.ts"

/**
 * Filters attributes for Meter element
 * Allows global attributes and validates meter-specific attributes
 */

/**
 * Extended Meter attributes including reactive properties and ARIA
 */
export type MeterElementAttributes = MeterAttributes & MeterAriaAttributes & {
	calculation?: Operand
	dataset?: Record<string, Value>
	display?: ComparatorConfig | LogicalConfig
	format?: OperatorConfig
	scripts?: string[]
	stylesheets?: string[]
	validation?: ComparatorConfig | LogicalConfig
}

/**
 * Filters attributes for Meter element
 * Allows global attributes and validates meter-specific attributes
 */


/**
 * Creates a Meter element configuration object
 *
 * The meter element represents a scalar measurement within a known range,
 * or a fractional value; for example disk usage, the relevance of a query result, or the fraction of a voting population.
 *
 * @example
 * ```typescript
 * const meter = Meter({
 *   value: 6,
 *   min: 0,
 *   max: 10,
 *   optimum: 8
 * })([
 *   TextNode("6 out of 10")
 * ])
 * ```
 */
export const Meter = (attributes: Partial<MeterElementAttributes> = {}) =>
(
	children: Array<ElementConfig> | ElementConfig | string = [],
): ElementConfig => {
	const { id, ...attribs } = filterAttributes(attributes)
	const {
		calculation,
		dataset,
		display,
		format,
		scripts,
		stylesheets,
		validation,
	} = attributes

	// Convert string children to TextNode and filter children
	const kids = isString(children)
		? [TextNode(children)]
		: Array.isArray(children)
		? children.filter(ADVANCED_FILTERS.formContent)
		: ADVANCED_FILTERS.formContent(children)
		? [children]
		: []

	return {
		attributes: {
			id,
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
		tag: "Meter",
	}
}

export default Meter

export { default as filterAttributes } from "./filterAttributes/index.ts"
