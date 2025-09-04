import type {
	ComparatorConfig,
	LogicalConfig,
	Operand,
	OperatorConfig,
	Value,
} from "@sitebender/engine-types/index.ts"
import type { TableColumnAttributes } from "@sitebender/engine/constructors/elements/types/attributes/index.ts"

import FilteredEmpty from "@sitebender/engine/constructors/abstracted/FilteredEmpty/index.ts"

import filterAttributes from "./filterAttributes/index.ts"

// no local guards needed here; handled in filterAttributes

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
const Col = FilteredEmpty("Col")(filterAttributes)

export default Col
