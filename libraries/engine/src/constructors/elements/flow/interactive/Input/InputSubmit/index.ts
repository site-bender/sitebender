import type { InputSubmitAttributes } from "@engineSrc/constructors/elements/types/attributes/index.ts"
import type {
	ComparatorConfig,
	LogicalConfig,
	Operand,
	OperatorConfig,
	Value,
} from "@engineTypes/index.ts"
import filterAttributes from "./filterAttributes/index.ts"
import Input from "@engineSrc/constructors/elements/flow/interactive/Input/index.ts"

/**
 * Filters attributes for InputSubmit
 */

/**
 * Extended InputSubmit attributes including reactive properties
 */
export type InputSubmitElementAttributes = InputSubmitAttributes & {
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
 * Creates an InputSubmit element configuration object
 *
 * The submit input creates a button that submits the form.
 *
 * @example
 * ```typescript
 * const input = InputSubmit({
 *   value: "Submit Form",
 *   formaction: "/submit",
 *   formmethod: "post"
 * })
 * ```
 */
const InputSubmit = Input("submit")(filterAttributes as unknown as (
	a: Record<string, Value>,
) => Record<string, Value>)

export default InputSubmit
