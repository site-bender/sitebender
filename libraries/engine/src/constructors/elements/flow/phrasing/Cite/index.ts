import isDefined from "@engineSrc/utilities/isDefined/index.ts"

import type {
import filterAttributes from "./filterAttributes/index.ts"
	ComparatorConfig,
	LogicalConfig,
	Operand,
	OperatorConfig,
	Value,
} from "../../../../../types/index.ts"
import type { AriaAttributes } from "../../../types/aria/index.ts"
import type { CitationAttributes } from "../../../types/attributes/index.ts"
import type { ElementConfig } from "../../../types/index.ts"

import TextNode from "../../../../../constructors/elements/TextNode/index.ts"
import getId from "../../../../../constructors/helpers/getId/index.ts"
import { ADVANCED_FILTERS } from "../../../../../guards/createAdvancedFilters/index.ts"
import filterAttribute from "../../../../../guards/filterAttribute/index.ts"
import isString from "../../../../../guards/isString/index.ts"
import pickGlobalAttributes from "../../../../../guards/pickGlobalAttributes/index.ts"

/**
 * Extended Cite attributes including reactive properties and ARIA
 */
export type CiteElementAttributes = CitationAttributes & AriaAttributes & {
	calculation?: Operand
	dataset?: Record<string, Value>
	display?: ComparatorConfig | LogicalConfig
	format?: OperatorConfig
	scripts?: string[]
	stylesheets?: string[]
	validation?: ComparatorConfig | LogicalConfig
}

/**
 * Filters attributes for Cite element
 * Allows global attributes and validates cite-specific attributes
 */


/**
 * Creates a Cite element configuration object
 *
 * The cite element represents the title of a creative work.
 * It can contain phrasing content.
 *
 * @example
 * ```typescript
 * const cite = Cite({
 *   id: "book-title",
 *   class: "citation"
 * })([
 *   TextNode("The Great Gatsby")
 * ])
 * ```
 */
export const Cite = (attributes: CiteElementAttributes = {}) =>
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
		tag: "cite",
	}
}

export default Cite

export { default as filterAttributes } from "./filterAttributes/index.ts"
