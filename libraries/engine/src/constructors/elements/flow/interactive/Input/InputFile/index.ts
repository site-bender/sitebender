import type {
	ComparatorConfig,
	LogicalConfig,
	Operand,
	OperatorConfig,
	Value,
} from "@sitebender/engine-types/index.ts"
import type { InputFileAttributes } from "@sitebender/engine/constructors/elements/types/attributes/index.ts"

import Input from "@sitebender/engine/constructors/elements/flow/interactive/Input/index.ts"

import filterAttributes from "./filterAttributes/index.ts"

// No local guards used; filtering delegated to filterAttributes

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
const InputFile = Input("file")(
	filterAttributes as unknown as (
		a: Record<string, Value>,
	) => Record<string, Value>,
)

export default InputFile
