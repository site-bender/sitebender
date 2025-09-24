import type {
	ComparatorConfig,
	LogicalConfig,
	Operand,
	OperatorConfig,
	Value,
} from "@sitebender/architect-types/index.ts"
import type { InputRangeAttributes } from "@sitebender/architect/constructors/elements/types/attributes/index.ts"

import Input from "@sitebender/architect/constructors/elements/flow/interactive/Input/index.ts"

import filterAttributes from "./filterAttributes/index.ts"

/**
 * Filters attributes for InputRange
 */

/**
 * Extended InputRange attributes including reactive properties
 */
export type InputRangeElementAttributes = InputRangeAttributes & {
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
 * Creates an InputRange element configuration object
 *
 * The range input allows users to select a numeric value from a range.
 *
 * @example
 * ```typescript
 * const input = InputRange({
 *   name: "volume",
 *   min: 0,
 *   max: 100,
 *   step: 1,
 *   value: 50
 * })
 * ```
 */
const InputRange = Input("range")(
	filterAttributes as unknown as (
		a: Record<string, Value>,
	) => Record<string, Value>,
)

export default InputRange
