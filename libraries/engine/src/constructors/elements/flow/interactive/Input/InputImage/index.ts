import type { InputImageAttributes } from "@engineSrc/constructors/elements/types/attributes/index.ts"
import type {
import filterAttributes from "./filterAttributes/index.ts"
	ComparatorConfig,
	LogicalConfig,
	Operand,
	OperatorConfig,
} from "@engineTypes/index.ts"
import type { Value } from "@engineTypes/index.ts"

import {
	FORM_METHODS,
	FORM_TARGETS,
	POPOVER_TARGET_ACTIONS,
} from "@engineSrc/constructors/elements/constants/index.ts"
import Input from "@engineSrc/constructors/elements/flow/interactive/Input/index.ts"
import filterAttribute from "@engineSrc/guards/filterAttribute/index.ts"
import isBoolean from "@engineSrc/guards/isBoolean/index.ts"
import isInteger from "@engineSrc/guards/isInteger/index.ts"
import isMemberOf from "@engineSrc/guards/isMemberOf/index.ts"
import isString from "@engineSrc/guards/isString/index.ts"
import pickGlobalAttributes from "@engineSrc/guards/pickGlobalAttributes/index.ts"

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
const InputImage = Input("image")(filterAttributes)

export default InputImage

export { default as filterAttributes } from "./filterAttributes/index.ts"
