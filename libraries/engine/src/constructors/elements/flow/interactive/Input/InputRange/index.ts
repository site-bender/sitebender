import type { InputRangeAttributes } from "@engineSrc/constructors/elements/types/attributes/index.ts"
import type {
import filterAttributes from "./filterAttributes/index.ts"
	ComparatorConfig,
	LogicalConfig,
	Operand,
	OperatorConfig,
} from "@engineTypes/index.ts"
import type { Value } from "@engineTypes/index.ts"

import { AUTOCOMPLETES } from "@engineSrc/constructors/elements/constants/index.ts"
import Input from "@engineSrc/constructors/elements/flow/interactive/Input/index.ts"
import filterAttribute from "@engineSrc/guards/filterAttribute/index.ts"
import isBoolean from "@engineSrc/guards/isBoolean/index.ts"
import isMemberOf from "@engineSrc/guards/isMemberOf/index.ts"
import isNumber from "@engineSrc/guards/isNumber/index.ts"
import isString from "@engineSrc/guards/isString/index.ts"
import pickGlobalAttributes from "@engineSrc/guards/pickGlobalAttributes/index.ts"

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
const InputRange = Input("range")(filterAttributes)

export default InputRange

export { default as filterAttributes } from "./filterAttributes/index.ts"
