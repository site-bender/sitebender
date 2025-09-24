import type {
	ComparatorConfig,
	LogicalConfig,
	Operand,
	OperatorConfig,
	Value,
} from "@sitebender/architect-types/index.ts"
import type { MeterAriaAttributes } from "@sitebender/architect/constructors/elements/types/aria/index.ts"
import type { MeterAttributes } from "@sitebender/architect/constructors/elements/types/attributes/index.ts"
import type { ElementConfig } from "@sitebender/architect/constructors/elements/types/index.ts"

import TextNode from "@sitebender/architect/constructors/elements/TextNode/index.ts"
import ADVANCED_FILTERS from "@sitebender/architect/guards/createAdvancedFilters/index.ts"
import isString from "@sitebender/architect/guards/isString/index.ts"
import isDefined from "@sitebender/architect/utilities/isDefined/index.ts"

import filterAttributes from "./filterAttributes/index.ts"

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
const Meter = (attributes: Partial<MeterElementAttributes> = {}) =>
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
