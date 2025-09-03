import isDefined from "@engineSrc/utilities/isDefined/index.ts"
import filterAttributes from "./filterAttributes/index.ts"
import type {
	ComparatorConfig,
	LogicalConfig,
	Operand,
	OperatorConfig,
	Value,
} from "@engineTypes/index.ts"
import type { AriaAttributes } from "@engineSrc/constructors/elements/types/aria/index.ts"
import type { MarkTextAttributes } from "@engineSrc/constructors/elements/types/attributes/index.ts"
import type { ElementConfig } from "@engineSrc/constructors/elements/types/index.ts"

import TextNode from "@engineSrc/constructors/elements/TextNode/index.ts"
import ADVANCED_FILTERS from "@engineSrc/guards/createAdvancedFilters/index.ts"
import isString from "@engineSrc/guards/isString/index.ts"

/**
 * Extended Mark attributes including reactive properties and ARIA
 */
export type MarkElementAttributes = MarkTextAttributes & AriaAttributes & {
	calculation?: Operand
	dataset?: Record<string, Value>
	display?: ComparatorConfig | LogicalConfig
	format?: OperatorConfig
	scripts?: string[]
	stylesheets?: string[]
	validation?: ComparatorConfig | LogicalConfig
}

/**
 * Filters attributes for Mark element
 * Allows global attributes and validates mark-specific attributes
 */


/**
 * Creates a Mark element configuration object
 *
 * The mark element represents text which is marked or highlighted
 * for reference or notation purposes.
 * It can contain phrasing content.
 *
 * @example
 * ```typescript
 * const mark = Mark({
 *   id: "search-highlight"
 * })([
 *   TextNode("important text")
 * ])
 * ```
 */
const Mark = (attributes: MarkElementAttributes = {}) =>
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
		tag: "mark",
	}
}

export default Mark
