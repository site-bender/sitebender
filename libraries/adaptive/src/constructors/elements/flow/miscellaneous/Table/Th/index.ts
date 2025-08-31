import type { TableHeaderCellAttributes } from "@adaptiveSrc/constructors/elements/types/attributes/index.ts"
import type {
	ComparatorConfig,
	LogicalConfig,
	Operand,
	OperatorConfig,
} from "@adaptiveTypes/index.ts"
import type { Value } from "@adaptiveTypes/index.ts"

import Filtered from "@adaptiveSrc/constructors/abstracted/Filtered/index.ts"
import { TH_ROLES } from "@adaptiveSrc/constructors/elements/constants/aria-roles.ts"
import { SCOPES } from "@adaptiveSrc/constructors/elements/constants/index.ts"
import getId from "@adaptiveSrc/constructors/helpers/getId/index.ts"
import filterAttribute from "@adaptiveSrc/guards/filterAttribute/index.ts"
import isInteger from "@adaptiveSrc/guards/isInteger/index.ts"
import isMemberOf from "@adaptiveSrc/guards/isMemberOf/index.ts"
import isString from "@adaptiveSrc/guards/isString/index.ts"
import pickGlobalAttributes from "@adaptiveSrc/guards/pickGlobalAttributes/index.ts"

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
