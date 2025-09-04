import type {
	ComparatorConfig,
	LogicalConfig,
	Operand,
	OperatorConfig,
	Value,
} from "@sitebender/engine-types/index.ts"
import type { AriaAttributes } from "@sitebender/engine/constructors/elements/types/aria/index.ts"
import type { ParagraphAttributes } from "@sitebender/engine/constructors/elements/types/attributes/index.ts"
import type { ElementConfig } from "@sitebender/engine/constructors/elements/types/index.ts"

import TextNode from "@sitebender/engine/constructors/elements/TextNode/index.ts"
import ADVANCED_FILTERS from "@sitebender/engine/guards/createAdvancedFilters/index.ts"
import isString from "@sitebender/engine/guards/isString/index.ts"
import isDefined from "@sitebender/engine/utilities/isDefined/index.ts"

import filterAttributes from "./filterAttributes/index.ts"

/**
 * Extended P attributes including reactive properties and ARIA
 */
export type PElementAttributes = ParagraphAttributes & AriaAttributes & {
	calculation?: Operand
	dataset?: Record<string, Value>
	display?: ComparatorConfig | LogicalConfig
	format?: OperatorConfig
	scripts?: string[]
	stylesheets?: string[]
	validation?: ComparatorConfig | LogicalConfig
}

/**
 * Filters attributes for P element
 * Allows global attributes and validates paragraph-specific attributes
 */


/**
 * Creates a P element configuration object
 *
 * The p element represents a paragraph. A paragraph is typically a run of
 * phrasing content that forms a block of text with one or more sentences.
 *
 * @example
 * ```typescript
 * const paragraph = P({
 *   id: "intro",
 *   class: "lead"
 * })([TextNode("This is a paragraph of text.")])
 * ```
 */
const P = (attributes: PElementAttributes = {}) =>
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

	// Convert string children to TextNode and filter for phrasing content
	const kids = isString(children)
		? [TextNode(children)]
		: Array.isArray(children)
		? children.filter((child) => {
			// P elements can only contain phrasing content
			if (!child || typeof child !== "object" || !("tag" in child)) {
				return true // Accept text nodes
			}
			return ADVANCED_FILTERS.buttonContent(child) // Phrasing content filter
		})
		: ADVANCED_FILTERS.buttonContent(children)
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
		tag: "P",
	}
}

export default P
