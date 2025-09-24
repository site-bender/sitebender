import type {
	ComparatorConfig,
	LogicalConfig,
	Operand,
	OperatorConfig,
	Value,
} from "@sitebender/architect-types/index.ts"
import type { InputColorAttributes } from "@sitebender/architect/constructors/elements/types/attributes/index.ts"

import Input from "@sitebender/architect/constructors/elements/flow/interactive/Input/index.ts"

import filterAttributes from "./filterAttributes/index.ts"

/**
 * Filters attributes for InputColor
 */

/**
 * Extended InputColor attributes including reactive properties
 */
export type InputColorElementAttributes = InputColorAttributes & {
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
 * Creates an InputColor element configuration object
 *
 * The color input allows users to select a color.
 *
 * @example
 * ```typescript
 * const input = InputColor({
 *   name: "background",
 *   value: "#ff0000",
 *   required: true
 * })
 * ```
 */
const InputColor = Input("color")(filterAttributes)

export default InputColor
