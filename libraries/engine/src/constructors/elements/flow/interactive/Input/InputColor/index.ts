import type { InputColorAttributes } from "@engineSrc/constructors/elements/types/attributes/index.ts"
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
