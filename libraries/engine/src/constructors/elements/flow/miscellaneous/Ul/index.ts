import type {
	ComparatorConfig,
	LogicalConfig,
	Operand,
	OperatorConfig,
	Value,
} from "@sitebender/engine-types/index.ts"
import type { ListAriaAttributes } from "@sitebender/engine/constructors/elements/types/aria/index.ts"
import type { UnorderedListAttributes } from "@sitebender/engine/constructors/elements/types/attributes/index.ts"
import type { ElementConfig } from "@sitebender/engine/constructors/elements/types/index.ts"

import TextNode from "@sitebender/engine/constructors/elements/TextNode/index.ts"
import isString from "@sitebender/engine/guards/isString/index.ts"
import isDefined from "@sitebender/engine/utilities/isDefined/index.ts"

import filterAttributes from "./filterAttributes/index.ts"

/**
 * Extended Ul attributes including reactive properties and ARIA
 */
export type UlElementAttributes =
	& UnorderedListAttributes
	& ListAriaAttributes
	& {
		calculation?: Operand
		dataset?: Record<string, Value>
		display?: ComparatorConfig | LogicalConfig
		format?: OperatorConfig
		scripts?: string[]
		stylesheets?: string[]
		validation?: ComparatorConfig | LogicalConfig
	}

/**
 * Filters attributes for Ul element
 * Allows global attributes and validates list-specific attributes
 */

/**
 * Creates a Ul element configuration object
 *
 * The ul element represents an unordered list of items.
 * It can only contain li, script, and template elements.
 *
 * @example
 * ```typescript
 * const ul = Ul({
 *   id: "main-list",
 *   class: "list"
 * })([
 *   Li()("First item"),
 *   Li()("Second item"),
 *   Li()("Third item")
 * ])
 * ```
 */
const Ul = (attributes: UlElementAttributes = {}) =>
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
		tag: "Ul",
	}
}

export default Ul
