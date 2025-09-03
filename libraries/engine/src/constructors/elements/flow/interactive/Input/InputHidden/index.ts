import type { InputHiddenAttributes } from "@engineSrc/constructors/elements/types/attributes/index.ts"
import type {
	ComparatorConfig,
	LogicalConfig,
	Operand,
	OperatorConfig,
	Value,
} from "@engineTypes/index.ts"
import filterAttributes from "./filterAttributes/index.ts"

import Input from "@engineSrc/constructors/elements/flow/interactive/Input/index.ts"
// No local guards here; filtering delegated to filterAttributes

/**
 * Filters attributes for InputHidden
 */

/**
 * Extended InputHidden attributes including reactive properties
 */
export type InputHiddenElementAttributes = InputHiddenAttributes & {
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
 * Creates an InputHidden element configuration object
 *
 * The hidden input stores data that should be submitted with the form but not displayed.
 *
 * @example
 * ```typescript
 * const input = InputHidden({
 *   name: "token",
 *   value: "abc123"
 * })
 * ```
 */
const InputHidden = Input("hidden")(filterAttributes as unknown as (
	a: Record<string, Value>,
) => Record<string, Value>)

export default InputHidden
