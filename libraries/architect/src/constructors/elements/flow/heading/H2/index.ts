import type {
	ComparatorConfig,
	LogicalConfig,
	Operand,
	OperatorConfig,
	Value,
} from "@sitebender/architect-types/index.ts"
import type { HeadingAriaAttributes } from "@sitebender/architect/constructors/elements/types/aria/index.ts"
import type { HeadingAttributes } from "@sitebender/architect/constructors/elements/types/attributes/index.ts"
import type { ElementConfig } from "@sitebender/architect/constructors/elements/types/index.ts"

import TextNode from "@sitebender/architect/constructors/elements/TextNode/index.ts"
import ADVANCED_FILTERS from "@sitebender/architect/guards/createAdvancedFilters/index.ts"
import isString from "@sitebender/architect/guards/isString/index.ts"
import isDefined from "@sitebender/architect/utilities/isDefined/index.ts"

import filterAttributes from "./filterAttributes/index.ts"

/**
 * Extended H2 attributes including reactive properties and ARIA
 */
export type H2ElementAttributes = HeadingAttributes & HeadingAriaAttributes & {
	calculation?: Operand
	dataset?: Record<string, Value>
	display?: ComparatorConfig | LogicalConfig
	format?: OperatorConfig
	scripts?: string[]
	stylesheets?: string[]
	validation?: ComparatorConfig | LogicalConfig
}

/**
 * Filters attributes for H2 element
 * Allows global attributes and validates heading-specific attributes
 */

/**
 * Creates an H2 element configuration object
 *
 * @example
 * ```typescript
 * const h2 = H2({ id: "section-title", role: "tab" })([
 *   TextNode("Section Heading")
 * ])
 * ```
 */
const H2 = (attributes: H2ElementAttributes = {}) =>
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
		? children.filter(ADVANCED_FILTERS.phrasingContent)
		: ADVANCED_FILTERS.phrasingContent(children)
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
		tag: "H2",
	}
}

export default H2
