import type { InputHiddenAttributes } from "@engineSrc/constructors/elements/types/attributes/index.ts"
import type {
import filterAttributes from "./filterAttributes/index.ts"
	ComparatorConfig,
	LogicalConfig,
	Operand,
	OperatorConfig,
} from "@engineTypes/index.ts"
import type { Value } from "@engineTypes/index.ts"

import Input from "@engineSrc/constructors/elements/flow/interactive/Input/index.ts"
import filterAttribute from "@engineSrc/guards/filterAttribute/index.ts"
import isString from "@engineSrc/guards/isString/index.ts"
import pickGlobalAttributes from "@engineSrc/guards/pickGlobalAttributes/index.ts"

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
const InputHidden = Input("hidden")(filterAttributes)

export default InputHidden

export { default as filterAttributes } from "./filterAttributes/index.ts"
