import type { TableHeaderCellAttributes } from "@engineSrc/constructors/elements/types/attributes/index.ts"
import type {
	ComparatorConfig,
	LogicalConfig,
	Operand,
	OperatorConfig,
	Value,
} from "@engineTypes/index.ts"
import filterAttributes from "./filterAttributes/index.ts"
import Filtered from "@engineSrc/constructors/abstracted/Filtered/index.ts"

/**
 * Filters attributes for Th element
 * Allows global attributes and validates th-specific attributes
 */

/**
 * Extended Th attributes including reactive properties
 */
export type ThElementAttributes = TableHeaderCellAttributes & {
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
 * Creates a Th element configuration object
 *
 * The th element represents a header cell in a table.
 * It can contain flow content.
 *
 * @example
 * ```typescript
 * const th = Th({
 *   id: "header-1",
 *   scope: "col",
 *   abbr: "Product Name",
 *   sorted: true
 * })([
 *   TextNode("Product")
 * ])
 * ```
 */
const Th = Filtered("Th")(filterAttributes)

export default Th
