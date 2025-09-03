import type {
	ComparatorConfig,
	LogicalConfig,
	Operand,
	OperatorConfig,
	Value,
} from "@engineTypes/index.ts"
import filterAttributes from "./filterAttributes/index.ts"

// Filtering is delegated to filterAttributes; no local guards needed
import type { InputNumberAriaAttributes } from "@engineSrc/constructors/elements/types/aria/index.ts"
import type { InputNumberAttributes } from "@engineSrc/constructors/elements/types/attributes/index.ts"

import Input from "../index.ts"

/**
 * Extended InputNumber attributes including reactive properties and ARIA
 */
export type InputNumberElementAttributes =
	& InputNumberAttributes
	& InputNumberAriaAttributes
	& {
		calculation?: Operand
		dataset?: Record<string, Value>
		display?: ComparatorConfig | LogicalConfig
		format?: OperatorConfig
		scripts?: string[]
		stylesheets?: string[]
		validation?: ComparatorConfig | LogicalConfig
	}

/**
 * Filters attributes for InputNumber element
 */


/**
 * Creates an InputNumber element configuration object
 *
 * The number input allows users to input numeric values.
 *
 * @example
 * ```typescript
 * const input = InputNumber({
 *   name: "quantity",
 *   min: 1,
 *   max: 100,
 *   step: 1,
 *   placeholder: "Enter quantity"
 * })
 * ```
 */
const InputNumber = Input("number")(filterAttributes as unknown as (
	a: Record<string, Value>,
) => Record<string, Value>)

export default InputNumber


