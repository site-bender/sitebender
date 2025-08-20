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
import type { TableHeaderCellAttributes } from "../../types/attributes/index.ts"

import Filtered from "../../../../../../constructors/abstracted/Filtered/index.ts"
import { SCOPES } from "../../../../../../constructors/elements/constants/index.ts"
import getId from "../../../../../../constructors/helpers/getId/index.ts"
import filterAttribute from "../../../../../../guards/filterAttribute/index.ts"
import isBoolean from "../../../../../../guards/isBoolean/index.ts"
import isInteger from "../../../../../../guards/isInteger/index.ts"
import isMemberOf from "../../../../../../guards/isMemberOf/index.ts"
import isString from "../../../../../../guards/isString/index.ts"
import pickGlobalAttributes from "../../../../../../guards/pickGlobalAttributes/index.ts"
import { TH_ROLES } from "../../../../constants/aria-roles.ts"

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

export const filterAttributes = (attributes: TableHeaderCellAttributes) => {
	const {
		id,
		abbr,
		colSpan,
		headers,
		rowSpan,
		scope,
		sorted,
		role,
		...otherAttributes
	} = attributes
	const globals = pickGlobalAttributes(otherAttributes)

	return {
		...getId(id),
		...globals,
		...filterAttribute(isString)("abbr")(abbr),
		...filterAttribute(isInteger)("colSpan")(colSpan),
		...filterAttribute(isString)("headers")(headers),
		...filterAttribute(isInteger)("rowSpan")(rowSpan),
		...filterAttribute(isMemberOf(SCOPES))("scope")(scope),
		...filterAttribute(isBoolean)("sorted")(sorted),
		...filterAttribute(isMemberOf(TH_ROLES))("role")(role),
	}
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
export const Th = Filtered("Th")(filterAttributes)

export default Th
