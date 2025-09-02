import type { TableColumnAttributes } from "@engineSrc/constructors/elements/types/attributes/index.ts"
import type {
	ComparatorConfig,
	LogicalConfig,
	Operand,
	OperatorConfig,
} from "@engineTypes/index.ts"
import type { Value } from "@engineTypes/index.ts"

import FilteredEmpty from "@engineSrc/constructors/abstracted/FilteredEmpty/index.ts"
import getId from "@engineSrc/constructors/helpers/getId/index.ts"
import filterAttribute from "@engineSrc/guards/filterAttribute/index.ts"
import isInteger from "@engineSrc/guards/isInteger/index.ts"
import pickGlobalAttributes from "@engineSrc/guards/pickGlobalAttributes/index.ts"

/**
 * Filters attributes for Col element
 * Allows global attributes and validates span attribute
 */

/**
 * Extended Col attributes including reactive properties
 */
export type ColElementAttributes = TableColumnAttributes & {
	aria?: Record<string, Value>
	calculation?: Operand
	dataset?: Record<string, Value>
	display?: ComparatorConfig | LogicalConfig
	format?: OperatorConfig
	scripts?: string[]
	stylesheets?: string[]
	validation?: ComparatorConfig | LogicalConfig
}

export const filterAttributes = (attributes: TableColumnAttributes) => {
	const { id, span, ...otherAttributes } = attributes
	const globals = pickGlobalAttributes(otherAttributes)

	return {
		...getId(id),
		...globals,
		...filterAttribute(isInteger)("span")(span),
	}
}

/**
 * Creates a Col element configuration object
 *
 * The col element represents a column in a table.
 * It's a void element that doesn't contain content.
 *
 * @example
 * ```typescript
 * const col = Col({
 *   id: "column-1",
 *   span: 2
 * })
 * ```
 */
export const Col = FilteredEmpty("Col")(filterAttributes)

export default Col
