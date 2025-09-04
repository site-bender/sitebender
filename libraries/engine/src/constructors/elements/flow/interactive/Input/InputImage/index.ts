import type {
	ComparatorConfig,
	LogicalConfig,
	Operand,
	OperatorConfig,
	Value,
} from "@sitebender/engine-types/index.ts"
import type { InputImageAttributes } from "@sitebender/engine/constructors/elements/types/attributes/index.ts"

import Input from "@sitebender/engine/constructors/elements/flow/interactive/Input/index.ts"

import filterAttributes from "./filterAttributes/index.ts"

/**
 * Filters attributes for InputImage
 */

/**
 * Extended InputImage attributes including reactive properties
 */
export type InputImageElementAttributes = InputImageAttributes & {
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
 * Creates an InputImage element configuration object
 *
 * The image input creates a clickable image that submits the form.
 *
 * @example
 * ```typescript
 * const input = InputImage({
 *   name: "submit",
 *   src: "submit-button.png",
 *   alt: "Submit",
 *   width: 100,
 *   height: 40,
 *   disabled: false
 * })
 * ```
 */
const InputImage = Input("image")(filterAttributes as unknown as (
	a: Record<string, Value>,
) => Record<string, Value>)

export default InputImage


