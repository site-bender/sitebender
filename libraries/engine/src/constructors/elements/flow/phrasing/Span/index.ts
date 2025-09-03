import type { GenericContainerAttributes } from "@engineSrc/constructors/elements/types/attributes/index.ts"
import type { ElementConfig } from "@engineSrc/constructors/elements/types/index.ts"
import type {
import filterAttributes from "./filterAttributes/index.ts"
	ComparatorConfig,
	LogicalConfig,
	Operand,
	OperatorConfig,
	Value,
} from "@engineTypes/index.ts"

import { ALL_ARIA_ROLES } from "@engineSrc/constructors/elements/constants/aria-roles.ts"
import TextNode from "@engineSrc/constructors/elements/TextNode/index.ts"
import getId from "@engineSrc/constructors/helpers/getId/index.ts"
import filterAttribute from "@engineSrc/guards/filterAttribute/index.ts"
import isBoolean from "@engineSrc/guards/isBoolean/index.ts"
import isMemberOf from "@engineSrc/guards/isMemberOf/index.ts"
import isPhrasingContent from "@engineSrc/guards/isPhrasingContent/index.ts"
import isString from "@engineSrc/guards/isString/index.ts"
import pickGlobalAttributes from "@engineSrc/guards/pickGlobalAttributes/index.ts"
import isDefined from "@toolkit/simple/validation/isDefined/index.ts"

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
export const Span = (attributes: SpanElementAttributes = {}) =>
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

export { default as filterAttributes } from "./filterAttributes/index.ts"
