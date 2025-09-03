import type { HeadingAriaAttributes } from "@engineSrc/constructors/elements/types/aria/index.ts"
import type { HeadingAttributes } from "@engineSrc/constructors/elements/types/attributes/index.ts"
import type { ElementConfig } from "@engineSrc/constructors/elements/types/index.ts"
import type {
import filterAttributes from "./filterAttributes/index.ts"
	ComparatorConfig,
	LogicalConfig,
	Operand,
	OperatorConfig,
	Value,
} from "@engineTypes/index.ts"

import { HEADING_ROLES } from "@engineSrc/constructors/elements/constants/index.ts"
import TextNode from "@engineSrc/constructors/elements/TextNode/index.ts"
import getId from "@engineSrc/constructors/helpers/getId/index.ts"
import { ADVANCED_FILTERS } from "@engineSrc/guards/createAdvancedFilters/index.ts"
import filterAttribute from "@engineSrc/guards/filterAttribute/index.ts"
import isBoolean from "@engineSrc/guards/isBoolean/index.ts"
import isMemberOf from "@engineSrc/guards/isMemberOf/index.ts"
import isNumber from "@engineSrc/guards/isNumber/index.ts"
import isString from "@engineSrc/guards/isString/index.ts"
import pickGlobalAttributes from "@engineSrc/guards/pickGlobalAttributes/index.ts"
import isDefined from "@engineSrc/utilities/isDefined/index.ts"

/**
 * Extended H1 attributes including reactive properties and ARIA
 */
export type H1ElementAttributes = HeadingAttributes & HeadingAriaAttributes & {
	calculation?: Operand
	dataset?: Record<string, Value>
	display?: ComparatorConfig | LogicalConfig
	format?: OperatorConfig
	scripts?: string[]
	stylesheets?: string[]
	validation?: ComparatorConfig | LogicalConfig
}

/**
 * Filters attributes for H1 element
 * Allows global attributes and validates heading-specific attributes
 */


/**
 * Creates an H1 element configuration object
 *
 * @example
 * ```typescript
 * const h1 = H1({ id: "main-title", role: "tab" })([
 *   TextNode("Main Heading")
 * ])
 * ```
 */
export const H1 = (attributes: H1ElementAttributes = {}) =>
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
		tag: "H1",
	}
}

export default H1

export { default as filterAttributes } from "./filterAttributes/index.ts"
