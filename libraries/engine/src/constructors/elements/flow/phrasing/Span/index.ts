import type { GenericContainerAttributes } from "@engineSrc/constructors/elements/types/attributes/index.ts"
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
import isPhrasingContent from "@engineSrc/guards/isPhrasingContent/index.ts"
import isString from "@engineSrc/guards/isString/index.ts"
import isDefined from "@engineSrc/utilities/isDefined/index.ts"

/**
 * Extended Span attributes including reactive properties and ARIA
 */
export type SpanElementAttributes = GenericContainerAttributes & {
	calculation?: Operand
	dataset?: Record<string, Value>
	display?: ComparatorConfig | LogicalConfig
	format?: OperatorConfig
	scripts?: string[]
	stylesheets?: string[]
	validation?: ComparatorConfig | LogicalConfig
}

/**
 * Filters attributes for Span element
 * Allows global attributes and validates span-specific attributes
 */


/**
 * Creates a Span element configuration object
 *
 * The span element doesn't mean anything on its own, but can be useful when used
 * together with the global attributes, e.g. class, lang, or dir.
 *
 * @example
 * ```typescript
 * const span = Span({
 *   id: "highlight",
 *   class: "important"
 * })([TextNode("Important text")])
 * ```
 */
const Span = (attributes: SpanElementAttributes = {}) =>
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
			// Span elements can only contain phrasing content
			if (!child || typeof child !== "object" || !("tag" in child)) {
				return true // Accept text nodes
			}
			return isPhrasingContent()(child as ElementConfig)
		})
		: isPhrasingContent()(children as ElementConfig)
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
		tag: "span",
	}
}

export default Span
