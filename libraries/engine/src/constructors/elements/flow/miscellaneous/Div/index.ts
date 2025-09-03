import type { DivAriaAttributes } from "@engineSrc/constructors/elements/types/aria/index.ts"
import type { DivisionAttributes } from "@engineSrc/constructors/elements/types/attributes/index.ts"
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
import { ADVANCED_FILTERS as _ADVANCED_FILTERS } from "@engineSrc/guards/createAdvancedFilters/index.ts"
import filterAttribute from "@engineSrc/guards/filterAttribute/index.ts"
import isBoolean from "@engineSrc/guards/isBoolean/index.ts"
import isMemberOf from "@engineSrc/guards/isMemberOf/index.ts"
import isString from "@engineSrc/guards/isString/index.ts"
import pickGlobalAttributes from "@engineSrc/guards/pickGlobalAttributes/index.ts"
import isDefined from "@toolkit/simple/validation/isDefined/index.ts"

/**
 * Extended Div attributes including reactive properties and ARIA
 */
export type DivElementAttributes = DivisionAttributes & DivAriaAttributes & {
	calculation?: Operand
	dataset?: Record<string, Value>
	display?: ComparatorConfig | LogicalConfig
	format?: OperatorConfig
	scripts?: string[]
	stylesheets?: string[]
	validation?: ComparatorConfig | LogicalConfig
}

/**
 * Filters attributes for Div element
 * Allows global attributes and validates div-specific attributes
 */


/**
 * Creates a Div element configuration object
 *
 * The div element has no special meaning at all. It represents its children.
 * It can be used with class, lang, and title attributes to mark up semantics
 * common to a group of consecutive elements.
 *
 * @example
 * ```typescript
 * const div = Div({
 *   id: "container",
 *   class: "main"
 * })([TextNode("Content")])
 * ```
 */
export const Div = (attributes: DivElementAttributes = {}) =>
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

	// Convert string children to TextNode - Div can contain any flow content
	const kids = isString(children)
		? [TextNode(children)]
		: Array.isArray(children)
		? children // Div accepts all flow content
		: [children]

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
		tag: "Div",
	}
}

export default Div

export { default as filterAttributes } from "./filterAttributes/index.ts"
