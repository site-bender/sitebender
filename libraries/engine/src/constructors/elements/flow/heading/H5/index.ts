import isDefined from "@engineSrc/utilities/isDefined/index.ts"

import type {
import filterAttributes from "./filterAttributes/index.ts"
	ComparatorConfig,
	LogicalConfig,
	Operand,
	OperatorConfig,
	Value,
} from "../../../../../types/index.ts"
import type { HeadingAriaAttributes } from "../../../types/aria/index.ts"
import type { HeadingAttributes } from "../../../types/attributes/index.ts"
import type { ElementConfig } from "../../../types/index.ts"

import { HEADING_ROLES } from "../../../../../constructors/elements/constants/index.ts"
import TextNode from "../../../../../constructors/elements/TextNode/index.ts"
import getId from "../../../../../constructors/helpers/getId/index.ts"
import { ADVANCED_FILTERS } from "../../../../../guards/createAdvancedFilters/index.ts"
import filterAttribute from "../../../../../guards/filterAttribute/index.ts"
import isBoolean from "../../../../../guards/isBoolean/index.ts"
import isMemberOf from "../../../../../guards/isMemberOf/index.ts"
import isNumber from "../../../../../guards/isNumber/index.ts"
import isString from "../../../../../guards/isString/index.ts"
import pickGlobalAttributes from "../../../../../guards/pickGlobalAttributes/index.ts"

/**
 * Extended H5 attributes including reactive properties and ARIA
 */
export type H5ElementAttributes = HeadingAttributes & HeadingAriaAttributes & {
	calculation?: Operand
	dataset?: Record<string, Value>
	display?: ComparatorConfig | LogicalConfig
	format?: OperatorConfig
	scripts?: string[]
	stylesheets?: string[]
	validation?: ComparatorConfig | LogicalConfig
}

/**
 * Filters attributes for H5 element
 * Allows global attributes and validates heading-specific attributes
 */


/**
 * Creates an H5 element configuration object
 *
 * @example
 * ```typescript
 * const h5 = H5({ id: "small-title", role: "tab" })([
 *   TextNode("Small Heading")
 * ])
 * ```
 */
export const H5 = (attributes: H5ElementAttributes = {}) =>
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
		tag: "H5",
	}
}

export default H5

export { default as filterAttributes } from "./filterAttributes/index.ts"
