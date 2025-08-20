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
import type { TableDataCellAttributes } from "../../types/attributes/index.ts"

import Filtered from "../../../../../../constructors/abstracted/Filtered/index.ts"
import getId from "../../../../../../constructors/helpers/getId/index.ts"
import filterAttribute from "../../../../../../guards/filterAttribute/index.ts"
import isInteger from "../../../../../../guards/isInteger/index.ts"
import isMemberOf from "../../../../../../guards/isMemberOf/index.ts"
import isString from "../../../../../../guards/isString/index.ts"
import pickGlobalAttributes from "../../../../../../guards/pickGlobalAttributes/index.ts"
import { TD_ROLES } from "../../../../constants/aria-roles.ts"

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
