import type {
	ElementConfig,
	GlobalAttributes,
	Value,
} from "../../../../../types/index.ts"
import type {
	ComparatorConfig,
	LogicalConfig,
	Operand,
	OperatorConfig,
} from "../../../../../types/index.ts"
import type { DialogAttributes } from "../types/attributes/index.ts"

import Filtered from "../../../../../constructors/abstracted/Filtered/index.ts"
import getId from "../../../../../constructors/helpers/getId/index.ts"
import filterAttribute from "../../../../../guards/filterAttribute/index.ts"
import isBoolean from "../../../../../guards/isBoolean/index.ts"
import isFlowContent from "../../../../../guards/isFlowContent/index.ts"
import pickGlobalAttributes from "../../../../../guards/pickGlobalAttributes/index.ts"

/**
 * Filters attributes for Dialog element
 * Allows global attributes and validates the open boolean attribute
 */

/**
 * Extended Dialog attributes including reactive properties
 */
export type DialogElementAttributes = DialogAttributes & {
	aria?: Record<string, Value>
	calculation?: Operand
	dataset?: Record<string, Value>
	display?: ComparatorConfig | LogicalConfig
	format?: OperatorConfig
	scripts?: string[]
	stylesheets?: string[]
	validation?: ComparatorConfig | LogicalConfig
}

export const filterAttributes = (attributes: DialogAttributes) => {
	const { id, open, ...otherAttributes } = attributes
	const globals = pickGlobalAttributes(otherAttributes)

	return {
		...getId(id),
		...globals,
		...filterAttribute(isBoolean)("open")(open),
	}
}

/**
 * Creates a Dialog element configuration object
 *
 * The dialog element represents a dialog box or other interactive component.
 * It can contain flow content and has an optional open attribute.
 *
 * @example
 * ```typescript
 * const dialog = Dialog({
 *   id: "confirmation-dialog",
 *   open: true
 * })([
 *   H2()("Confirm Action"),
 *   P()("Are you sure you want to delete this item?"),
 *   Footer()([
 *     Button()("Cancel"),
 *     Button()("Delete")
 *   ])
 * ])
 * ```
 */
export const Dialog = Filtered("Dialog")(filterAttributes)

export default Dialog
