import type { Value } from "@adaptiveTypes/index.ts"
import type {
	ComparatorConfig,
	LogicalConfig,
	Operand,
	OperatorConfig,
} from "@adaptiveTypes/index.ts"
import type { InputFileAttributes } from "@adaptiveSrc/constructors/elements/types/attributes/index.ts"

import filterAttribute from "@adaptiveSrc/guards/filterAttribute/index.ts"
import isBoolean from "@adaptiveSrc/guards/isBoolean/index.ts"
import isString from "@adaptiveSrc/guards/isString/index.ts"
import pickGlobalAttributes from "@adaptiveSrc/guards/pickGlobalAttributes/index.ts"
import Input from "@adaptiveSrc/constructors/elements/flow/interactive/Input/index.ts"

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

export const filterAttributes = (attributes: Record<string, Value>) => {
	const {
		accept,
		autofocus,
		disabled,
		form,
		multiple,
		name,
		required,
		...attrs
	} = attributes as unknown as InputFileAttributes
	const globals = pickGlobalAttributes(attrs)

	return {
		...globals,
		...filterAttribute(isString)("accept")(accept),
		...filterAttribute(isBoolean)("autofocus")(autofocus),
		...filterAttribute(isBoolean)("disabled")(disabled),
		...filterAttribute(isString)("form")(form),
		...filterAttribute(isBoolean)("multiple")(multiple),
		...filterAttribute(isString)("name")(name),
		...filterAttribute(isBoolean)("required")(required),
	}
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
