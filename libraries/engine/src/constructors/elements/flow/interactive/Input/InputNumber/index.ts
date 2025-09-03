import type {
import filterAttributes from "./filterAttributes/index.ts"
	ComparatorConfig,
	LogicalConfig,
	Operand,
	OperatorConfig,
	Value,
} from "@engineTypes/index.ts"

import { AUTOCOMPLETES } from "@engineSrc/constructors/elements/constants/index.ts"
import getId from "@engineSrc/constructors/helpers/getId/index.ts"
import filterAttribute from "@engineSrc/guards/filterAttribute/index.ts"
import isBoolean from "@engineSrc/guards/isBoolean/index.ts"
import isMemberOf from "@engineSrc/guards/isMemberOf/index.ts"
import isNumber from "@engineSrc/guards/isNumber/index.ts"
import isString from "@engineSrc/guards/isString/index.ts"
import pickGlobalAttributes from "@engineSrc/guards/pickGlobalAttributes/index.ts"
// ElementConfig not needed here

import isDefined from "@toolkit/simple/validation/isDefined/index.ts"

import type { InputNumberAriaAttributes } from "../../../../types/aria/index.ts"
import type { InputNumberAttributes } from "../../../../types/attributes/index.ts"

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
const InputNumber = Input("number")(filterAttributes)

export default InputNumber

export { default as filterAttributes } from "./filterAttributes/index.ts"
