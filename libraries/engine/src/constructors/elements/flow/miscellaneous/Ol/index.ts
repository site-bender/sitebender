import type { ListAriaAttributes } from "@engineSrc/constructors/elements/types/aria/index.ts"
import type { OrderedListAttributes } from "@engineSrc/constructors/elements/types/attributes/index.ts"
import type { ElementConfig } from "@engineSrc/constructors/elements/types/index.ts"
import type {
import filterAttributes from "./filterAttributes/index.ts"
	ComparatorConfig,
	LogicalConfig,
	Operand,
	OperatorConfig,
	Value,
} from "@engineTypes/index.ts"

import { OL_ROLES } from "@engineSrc/constructors/elements/constants/aria-roles.ts"
import TextNode from "@engineSrc/constructors/elements/TextNode/index.ts"
import getId from "@engineSrc/constructors/helpers/getId/index.ts"
import filterAttribute from "@engineSrc/guards/filterAttribute/index.ts"
import isBoolean from "@engineSrc/guards/isBoolean/index.ts"
import isInteger from "@engineSrc/guards/isInteger/index.ts"
import isMemberOf from "@engineSrc/guards/isMemberOf/index.ts"
import isString from "@engineSrc/guards/isString/index.ts"
import pickGlobalAttributes from "@engineSrc/guards/pickGlobalAttributes/index.ts"
import isDefined from "@toolkit/simple/validation/isDefined/index.ts"

/**
 * Valid type values for ordered lists
 */
const OL_TYPES = ["1", "a", "A", "i", "I"]

/**
 * Extended Ol attributes including reactive properties and ARIA
 */
export type OlElementAttributes = OrderedListAttributes & ListAriaAttributes & {
	calculation?: Operand
	dataset?: Record<string, Value>
	display?: ComparatorConfig | LogicalConfig
	format?: OperatorConfig
	scripts?: string[]
	stylesheets?: string[]
	validation?: ComparatorConfig | LogicalConfig
}

/**
 * Filters attributes for Ol element
 * Allows global attributes and validates ol-specific attributes
 */


/**
 * Creates an Ol element configuration object
 *
 * The ol element represents an ordered list of items.
 * It can only contain li, script, and template elements.
 *
 * @example
 * ```typescript
 * const ol = Ol({
 *   id: "ordered-list",
 *   start: 5,
 *   type: "i"
 * })([
 *   Li()("First item"),
 *   Li()("Second item"),
 *   Li()("Third item")
 * ])
 * ```
 */
export const Ol = (attributes: OlElementAttributes = {}) =>
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

	// Filter children to only allow Li, Script, and Template elements
	const kids = isString(children)
		? [TextNode(children)] // Convert string to TextNode
		: Array.isArray(children)
		? children.filter((child) => {
			if (!child || typeof child !== "object" || !("tag" in child)) {
				return false // Reject text nodes in lists
			}
			return ["Li", "Script", "Template"].includes(child.tag)
		})
		: (children && typeof children === "object" && "tag" in children &&
				["Li", "Script", "Template"].includes(children.tag))
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
		tag: "Ol",
	}
}

export default Ol

export { default as filterAttributes } from "./filterAttributes/index.ts"
