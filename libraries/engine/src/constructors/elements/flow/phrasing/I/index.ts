import isDefined from "@engineSrc/utilities/isDefined/index.ts"
import type {
	ComparatorConfig,
	LogicalConfig,
	Operand,
	OperatorConfig,
	Value,
} from "@engineTypes/index.ts"
import type { AriaAttributes } from "@engineSrc/constructors/elements/types/aria/index.ts"
import type { IdiomaticTextAttributes } from "@engineSrc/constructors/elements/types/attributes/index.ts"
import type { ElementConfig } from "@engineSrc/constructors/elements/types/index.ts"
import filterAttributes from "./filterAttributes/index.ts"

import TextNode from "@engineSrc/constructors/elements/TextNode/index.ts"
import ADVANCED_FILTERS from "@engineSrc/guards/createAdvancedFilters/index.ts"
import isString from "@engineSrc/guards/isString/index.ts"

/**
 * Extended I attributes including reactive properties and ARIA
 */
export type IElementAttributes = IdiomaticTextAttributes & AriaAttributes & {
	calculation?: Operand
	dataset?: Record<string, Value>
	display?: ComparatorConfig | LogicalConfig
	format?: OperatorConfig
	scripts?: string[]
	stylesheets?: string[]
	validation?: ComparatorConfig | LogicalConfig
}

/**
 * Filters attributes for I element
 * Allows global attributes and validates i-specific attributes
 */


/**
 * Creates an I element configuration object
 *
 * The i element represents a span of text in an alternate voice or mood,
 * or otherwise offset from the normal prose.
 *
 * @example
 * ```typescript
 * const i = I({ id: "italic", class: "highlight" })([
 *   TextNode("Italic text")
 * ])
 * ```
 */
const I = (attributes: IElementAttributes = {}) =>
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
		tag: "i",
	}
}

export default I
