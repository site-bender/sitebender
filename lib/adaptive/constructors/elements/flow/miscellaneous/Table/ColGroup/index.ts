import type {
	ElementConfig,
	GlobalAttributes,
	Value,
} from "../../../../../../types/index.ts"
import type {
	ComparatorConfig,
	LogicalConfig,
	Operand,
	OperatorConfig,
} from "../../../../../types/index.ts"
import type { TableColumnGroupAttributes } from "../../types/attributes/index.ts"

import Filtered from "../../../../../../constructors/abstracted/Filtered/index.ts"
import getId from "../../../../../../constructors/helpers/getId/index.ts"
import filterAttribute from "../../../../../../guards/filterAttribute/index.ts"
import isInteger from "../../../../../../guards/isInteger/index.ts"
import pickGlobalAttributes from "../../../../../../guards/pickGlobalAttributes/index.ts"

/**
 * Filters attributes for ColGroup element
 * Allows global attributes and validates span attribute
 */

/**
 * Extended ColGroup attributes including reactive properties
 */
export type ColGroupElementAttributes = TableColumnGroupAttributes & {
	aria?: Record<string, Value>
	calculation?: Operand
	dataset?: Record<string, Value>
	display?: ComparatorConfig | LogicalConfig
	format?: OperatorConfig
	scripts?: string[]
	stylesheets?: string[]
	validation?: ComparatorConfig | LogicalConfig
}

export const filterAttributes = (attributes: TableColumnGroupAttributes) => {
	const { id, span, ...otherAttributes } = attributes
	const globals = pickGlobalAttributes(otherAttributes)

	return {
		...getId(id),
		...globals,
		...filterAttribute(isInteger)("span")(span),
	}
}

/**
 * Child filter that validates column content (col, script, template)
 */
const colGroupFilter = (child: ElementConfig): boolean => {
	if (typeof child === "object" && child !== null && "tag" in child) {
		const tag = (child as { tag?: string }).tag?.toLowerCase()
		return tag === "col" || tag === "script" || tag === "template"
	}
	return false
}

/**
 * Creates a ColGroup element configuration object
 *
 * The colgroup element represents a group of columns in a table.
 * It can contain col, script, and template elements.
 *
 * @example
 * ```typescript
 * const colgroup = ColGroup({
 *   id: "column-group",
 *   span: 3
 * })([
 *   Col({ span: 2 }),
 *   Col({ span: 1 })
 * ])
 * ```
 */
export const ColGroup = (attributes = {}) => (children = []) => {
	const filteredChildren = Array.isArray(children)
		? children.filter(colGroupFilter)
		: colGroupFilter(children)
		? [children]
		: []

	return Filtered("ColGroup")(filterAttributes)(attributes)(filteredChildren)
}

export default ColGroup
