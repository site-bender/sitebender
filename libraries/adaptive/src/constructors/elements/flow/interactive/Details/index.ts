import type {
	ComparatorConfig,
	LogicalConfig,
	Operand,
	OperatorConfig,
	Value,
	ElementConfig,
} from "../../../../../types/index.ts"
import type { DetailsAttributes } from "@adaptiveSrc/constructors/elements/types/attributes/index.ts"

import isDefined from "@adaptiveSrc/utilities/isDefined/index.ts"
import { DETAILS_ROLES } from "@adaptiveSrc/constructors/elements/constants/aria-roles.ts"
import getAriaAttributes from "@adaptiveSrc/constructors/helpers/getAriaAttributes/index.ts"
import getId from "@adaptiveSrc/constructors/helpers/getId/index.ts"
import { ADVANCED_FILTERS } from "@adaptiveSrc/guards/createAdvancedFilters/index.ts"
import filterAttribute from "@adaptiveSrc/guards/filterAttribute/index.ts"
import isBoolean from "@adaptiveSrc/guards/isBoolean/index.ts"
import isMemberOf from "@adaptiveSrc/guards/isMemberOf/index.ts"
import pickGlobalAttributes from "@adaptiveSrc/guards/pickGlobalAttributes/index.ts"

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

export const filterAttributes = (attributes: DetailsAttributes) => {
	const { id, open, role, ...otherAttributes } = attributes
	const globals = pickGlobalAttributes(otherAttributes)

	return {
		...getId(id),
		...globals,
		...filterAttribute(isBoolean)("open")(open),
		...filterAttribute(isMemberOf(DETAILS_ROLES))("role")(role),
	}
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
export const Details = (attributes: DetailsElementAttributes = {}) =>
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
