import type {
	ComparatorConfig,
	LogicalConfig,
	Operand,
	OperatorConfig,
	Value,
} from "@sitebender/engine-types/index.ts"
import type { TableAriaAttributes } from "@sitebender/engine/constructors/elements/types/aria/index.ts"
import type { TableAttributes } from "@sitebender/engine/constructors/elements/types/attributes/index.ts"
import type { ElementConfig } from "@sitebender/engine/constructors/elements/types/index.ts"

import TextNode from "@sitebender/engine/constructors/elements/TextNode/index.ts"
import isString from "@sitebender/engine/guards/isString/index.ts"
import isDefined from "@sitebender/engine/utilities/isDefined/index.ts"

import filterAttributes from "./filterAttributes/index.ts"

/**
 * Extended Table attributes including reactive properties and ARIA
 */
export type TableElementAttributes = TableAttributes & TableAriaAttributes & {
	calculation?: Operand
	dataset?: Record<string, Value>
	display?: ComparatorConfig | LogicalConfig
	format?: OperatorConfig
	scripts?: string[]
	stylesheets?: string[]
	validation?: ComparatorConfig | LogicalConfig
}

/**
 * Filters attributes for Table element
 * Allows global attributes and validates table-specific attributes
 */


/**
 * Creates a Table element configuration object
 *
 * The table element represents tabular data in rows and columns.
 * It can contain caption, colgroup, thead, tbody, tfoot, tr, script, and template elements.
 *
 * @example
 * ```typescript
 * const table = Table({
 *   id: "data-table",
 *   class: "table"
 * })([
 *   Caption()("Sales Data"),
 *   THead()([
 *     Tr()([
 *       Th()("Month"),
 *       Th()("Sales")
 *     ])
 *   ]),
 *   TBody()([
 *     Tr()([
 *       Td()("January"),
 *       Td()("$1000")
 *     ])
 *   ])
 * ])
 * ```
 */
const Table = (attributes: TableElementAttributes = {}) =>
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

	// Filter children to only allow table-specific elements
	const kids = isString(children)
		? [TextNode(children)] // Convert string to TextNode
		: Array.isArray(children)
		? children.filter((child) => {
			if (!child || typeof child !== "object" || !("tag" in child)) {
				return false // Reject text nodes in tables
			}
			return [
				"Caption",
				"ColGroup",
				"THead",
				"TBody",
				"TFoot",
				"Tr",
				"Script",
				"Template",
			].includes(child.tag)
		})
		: (children && typeof children === "object" && "tag" in children &&
				[
					"Caption",
					"ColGroup",
					"THead",
					"TBody",
					"TFoot",
					"Tr",
					"Script",
					"Template",
				].includes(children.tag))
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
		tag: "Table",
	}
}

export default Table
