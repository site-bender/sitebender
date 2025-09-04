import type {
	ComparatorConfig,
	LogicalConfig,
	Operand,
	OperatorConfig,
	Value,
} from "@sitebender/engine-types/index.ts"
import type { DetailsAttributes } from "@sitebender/engine/constructors/elements/types/attributes/index.ts"
import type { ElementConfig } from "@sitebender/engine/constructors/elements/types/index.ts"

import getAriaAttributes from "@sitebender/engine/constructors/helpers/getAriaAttributes/index.ts"
import getId from "@sitebender/engine/constructors/helpers/getId/index.ts"
import ADVANCED_FILTERS from "@sitebender/engine/guards/createAdvancedFilters/index.ts"
import isDefined from "@sitebender/engine/utilities/isDefined/index.ts"

import filterAttributes from "./filterAttributes/index.ts"

/**
 * Filters attributes for Details element
 * Allows global attributes and validates details-specific attributes
 */

/**
 * Extended Details attributes including reactive properties
 */
export type DetailsElementAttributes = DetailsAttributes & {
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
 * Creates a Details element configuration object
 *
 * The details element represents a disclosure widget from which the user
 * can obtain additional information or controls.
 *
 * @example
 * ```typescript
 * const details = Details({
 *   id: "more-info",
 *   open: false
 * })([
 *   Summary()(TextNode("More Information")),
 *   P()(TextNode("Additional details here..."))
 * ])
 * ```
 */
const Details = (attributes: DetailsElementAttributes = {}) =>
(
	children: Array<ElementConfig> | ElementConfig | string = [],
): ElementConfig => {
	const {
		aria,
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

	// Use the Details content reorganizer to properly order Summary and validate other children
	const kids = Array.isArray(children)
		? ADVANCED_FILTERS.detailsContent(children)
		: ADVANCED_FILTERS.detailsContent([children])

	return {
		attributes: {
			...getId(id),
			...getAriaAttributes(aria),
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
		tag: "Details",
	}
}

export default Details
