import type {
	ComparatorConfig,
	LogicalConfig,
	Operand,
	OperatorConfig,
	Value,
} from "@sitebender/engine-types/index.ts"
import type { AriaAttributes } from "@sitebender/engine/constructors/elements/types/aria/index.ts"
import type { TableRowAttributes } from "@sitebender/engine/constructors/elements/types/attributes/index.ts"
import type { ElementConfig } from "@sitebender/engine/constructors/elements/types/index.ts"

import TextNode from "@sitebender/engine/constructors/elements/TextNode/index.ts"
import isString from "@sitebender/engine/guards/isString/index.ts"
import isDefined from "@sitebender/engine/utilities/isDefined/index.ts"

import filterAttributes from "./filterAttributes/index.ts"

/**
 * Extended Tr attributes including reactive properties and ARIA
 */
export type TrElementAttributes = TableRowAttributes & AriaAttributes & {
	calculation?: Operand
	dataset?: Record<string, Value>
	display?: ComparatorConfig | LogicalConfig
	format?: OperatorConfig
	scripts?: string[]
	stylesheets?: string[]
	validation?: ComparatorConfig | LogicalConfig
}

/**
 * Filters attributes for Tr element
 * Allows global attributes and validates tr-specific attributes
 */


/**
 * Creates a Tr element configuration object
 *
 * The tr element represents a row of cells in a table.
 * It can contain td, th, script, and template elements.
 *
 * @example
 * ```typescript
 * const tr = Tr({
 *   id: "table-row"
 * })([
 *   Td()([TextNode("Cell 1")]),
 *   Td()([TextNode("Cell 2")])
 * ])
 * ```
 */
const Tr = (attributes: TrElementAttributes = {}) =>
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

	// Filter children to only allow table cell elements
	const kids = isString(children)
		? [TextNode(children)] // Convert string to TextNode
		: Array.isArray(children)
		? children.filter((child) => {
			if (!child || typeof child !== "object" || !("tag" in child)) {
				return false // Reject text nodes in table rows
			}
			const tag = child.tag?.toLowerCase()
			return tag === "td" || tag === "th" || tag === "script" ||
				tag === "template"
		})
		: (children && typeof children === "object" && "tag" in children &&
				(children.tag?.toLowerCase() === "td" ||
					children.tag?.toLowerCase() === "th" ||
					children.tag?.toLowerCase() === "script" ||
					children.tag?.toLowerCase() === "template"))
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
		tag: "Tr",
	}
}

export default Tr
