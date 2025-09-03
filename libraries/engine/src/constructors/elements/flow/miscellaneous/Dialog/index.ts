import type { DialogAttributes } from "@engineSrc/constructors/elements/types/attributes/index.ts"

import type {
import filterAttributes from "./filterAttributes/index.ts"
	ComparatorConfig,
	LogicalConfig,
	Operand,
	OperatorConfig,
} from "../../../../../types/index.ts"
import type { Value } from "../../../../../types/index.ts"

import Filtered from "../../../../../constructors/abstracted/Filtered/index.ts"
import getId from "../../../../../constructors/helpers/getId/index.ts"
import filterAttribute from "../../../../../guards/filterAttribute/index.ts"
import isBoolean from "../../../../../guards/isBoolean/index.ts"
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

export { default as filterAttributes } from "./filterAttributes/index.ts"
