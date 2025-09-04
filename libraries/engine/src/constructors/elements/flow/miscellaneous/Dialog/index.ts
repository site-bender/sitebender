import type {
	ComparatorConfig,
	LogicalConfig,
	Operand,
	OperatorConfig,
	Value,
} from "@sitebender/engine-types/index.ts"
import type { DialogAttributes } from "@sitebender/engine/constructors/elements/types/attributes/index.ts"

import Filtered from "@sitebender/engine/constructors/abstracted/Filtered/index.ts"

import filterAttributes from "./filterAttributes/index.ts"

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
const Dialog = Filtered("Dialog")(filterAttributes)

export default Dialog
