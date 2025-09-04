import type {
	ComparatorConfig,
	LogicalConfig,
	Operand,
	OperatorConfig,
	Value,
} from "@sitebender/engine-types/index.ts"
import type { InputButtonAttributes } from "@sitebender/engine/constructors/elements/types/attributes/index.ts"

import Input from "@sitebender/engine/constructors/elements/flow/interactive/Input/index.ts"

import filterAttributes from "./filterAttributes/index.ts"

/**
 * Filters attributes for InputButton
 */

/**
 * Extended InputButton attributes including reactive properties
 */
export type InputButtonElementAttributes = InputButtonAttributes & {
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
 * Creates an InputButton element configuration object
 *
 * The button input creates a clickable button.
 *
 * @example
 * ```typescript
 * const input = InputButton({
 *   name: "action",
 *   value: "Click me",
 *   disabled: false
 * })
 * ```
 */
const InputButton = Input("button")(filterAttributes)

export default InputButton
