import type { TableDataCellAttributes } from "@engineSrc/constructors/elements/types/attributes/index.ts"
import type {
	ComparatorConfig,
	LogicalConfig,
	Operand,
	OperatorConfig,
} from "@engineTypes/index.ts"
import type { Value } from "@engineTypes/index.ts"

import Filtered from "@engineSrc/constructors/abstracted/Filtered/index.ts"
import { TD_ROLES } from "@engineSrc/constructors/elements/constants/aria-roles.ts"
import getId from "@engineSrc/constructors/helpers/getId/index.ts"
import filterAttribute from "@engineSrc/guards/filterAttribute/index.ts"
import isInteger from "@engineSrc/guards/isInteger/index.ts"
import isMemberOf from "@engineSrc/guards/isMemberOf/index.ts"
import isString from "@engineSrc/guards/isString/index.ts"
import pickGlobalAttributes from "@engineSrc/guards/pickGlobalAttributes/index.ts"

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

export const filterAttributes = (attributes: TableDataCellAttributes) => {
	const { id, colSpan, headers, rowSpan, role, ...otherAttributes } = attributes
	const globals = pickGlobalAttributes(otherAttributes)

	return {
		...getId(id),
		...globals,
		...filterAttribute(isInteger)("colSpan")(colSpan),
		...filterAttribute(isString)("headers")(headers),
		...filterAttribute(isInteger)("rowSpan")(rowSpan),
		...filterAttribute(isMemberOf(TD_ROLES))("role")(role),
	}
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
export const Td = Filtered("Td")(filterAttributes)

export default Td
