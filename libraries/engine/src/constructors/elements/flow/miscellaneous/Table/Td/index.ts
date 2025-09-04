import type {
	ComparatorConfig,
	LogicalConfig,
	Operand,
	OperatorConfig,
	Value,
} from "@sitebender/engine-types/index.ts"
import type { TableDataCellAttributes } from "@sitebender/engine/constructors/elements/types/attributes/index.ts"

import Filtered from "@sitebender/engine/constructors/abstracted/Filtered/index.ts"

import filterAttributes from "./filterAttributes/index.ts"

/**
 * Filters attributes for Td element
 * Allows global attributes and validates colSpan, headers, and rowSpan
 */

/**
 * Extended Td attributes including reactive properties
 */
export type TdElementAttributes = TableDataCellAttributes & {
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
 * Creates a Td element configuration object
 *
 * The td element represents a data cell in a table.
 * It can contain flow content.
 *
 * @example
 * ```typescript
 * const td = Td({
 *   id: "cell-1",
 *   colSpan: 2,
 *   headers: "header1 header2"
 * })([
 *   TextNode("Cell content")
 * ])
 * ```
 */
const Td = Filtered("Td")(filterAttributes)

export default Td
