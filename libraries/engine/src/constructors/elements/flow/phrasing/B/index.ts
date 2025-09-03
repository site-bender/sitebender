import type { AriaAttributes } from "@engineSrc/constructors/elements/types/aria/index.ts"
import type { BringAttentionToAttributes } from "@engineSrc/constructors/elements/types/attributes/index.ts"
import type { ElementConfig } from "@engineSrc/constructors/elements/types/index.ts"
import type {
	ComparatorConfig,
	LogicalConfig,
	Operand,
	OperatorConfig,
	Value,
} from "@engineTypes/index.ts"
import filterAttributes from "./filterAttributes/index.ts"

import TextNode from "@engineSrc/constructors/elements/TextNode/index.ts"
import ADVANCED_FILTERS from "@engineSrc/guards/createAdvancedFilters/index.ts"
import isString from "@engineSrc/guards/isString/index.ts"
import isDefined from "@engineSrc/utilities/isDefined/index.ts"

/**
 * Extended B attributes including reactive properties and ARIA
 */
export type BElementAttributes = BringAttentionToAttributes & AriaAttributes & {
	calculation?: Operand
	dataset?: Record<string, Value>
	display?: ComparatorConfig | LogicalConfig
	format?: OperatorConfig
	scripts?: string[]
	stylesheets?: string[]
	validation?: ComparatorConfig | LogicalConfig
}

/**
 * Filters attributes for B element
 * Allows global attributes and validates b-specific attributes
 */


/**
 * Creates a B element configuration object
 *
 * The b element represents content to which attention is being drawn
 * for utilitarian purposes without conveying any extra importance.
 *
 * @example
 * ```typescript
 * const b = B({ id: "bold", class: "highlight" })([
 *   TextNode("Bold text")
 * ])
 * ```
 */
const B = (attributes: BElementAttributes = {}) =>
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
		tag: "b",
	}
}

export default B
