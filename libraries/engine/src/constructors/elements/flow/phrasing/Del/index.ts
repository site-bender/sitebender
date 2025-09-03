import type { ElementConfig } from "@engineSrc/constructors/elements/types/index.ts"
import filterAttributes from "./filterAttributes/index.ts"
import type {
	ComparatorConfig,
	LogicalConfig,
	Operand,
	OperatorConfig,
	Value,
} from "@engineTypes/index.ts"

import TextNode from "@engineSrc/constructors/elements/TextNode/index.ts"
import ADVANCED_FILTERS from "@engineSrc/guards/createAdvancedFilters/index.ts"
import isString from "@engineSrc/guards/isString/index.ts"
import isDefined from "@engineSrc/utilities/isDefined/index.ts"

import type { AriaAttributes } from "@engineSrc/constructors/elements/types/aria/index.ts"
import type { DeletedTextAttributes } from "@engineSrc/constructors/elements/types/attributes/index.ts"

/**
 * Extended Del attributes including reactive properties and ARIA
 */
export type DelElementAttributes = DeletedTextAttributes & AriaAttributes & {
	calculation?: Operand
	dataset?: Record<string, Value>
	display?: ComparatorConfig | LogicalConfig
	format?: OperatorConfig
	scripts?: string[]
	stylesheets?: string[]
	validation?: ComparatorConfig | LogicalConfig
}

/**
 * Filters attributes for Del element
 * Allows global attributes and validates del-specific attributes
 */


/**
 * Creates a Del element configuration object
 *
 * The del element represents text that has been deleted from a document.
 * It can contain phrasing content.
 *
 * @example
 * ```typescript
 * const del = Del({
 *   cite: "https://example.com/edit-log",
 *   datetime: "2023-12-25T10:00:00Z"
 * })([
 *   TextNode("This text was deleted")
 * ])
 * ```
 */
const Del = (attributes: DelElementAttributes = {}) =>
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
		tag: "del",
	}
}

export default Del
