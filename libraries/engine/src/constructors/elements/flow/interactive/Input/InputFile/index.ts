import type { InputFileAttributes } from "@engineSrc/constructors/elements/types/attributes/index.ts"
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
import isBoolean from "@engineSrc/guards/isBoolean/index.ts"
import isString from "@engineSrc/guards/isString/index.ts"
import pickGlobalAttributes from "@engineSrc/guards/pickGlobalAttributes/index.ts"

/**
 * Filters attributes for InputFile
 */

/**
 * Extended InputFile attributes including reactive properties
 */
export type InputFileElementAttributes = InputFileAttributes & {
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
 * Creates an InputFile element configuration object
 *
 * The file input allows users to select files from their device.
 *
 * @example
 * ```typescript
 * const input = InputFile({
 *   name: "upload",
 *   accept: "image/*",
 *   multiple: true,
 *   required: true,
 *   capture: "camera"
 * })
 * ```
 */
const InputFile = Input("file")(filterAttributes)

export default InputFile

export { default as filterAttributes } from "./filterAttributes/index.ts"
