import type {
	ElementConfig,
	GlobalAttributes,
	Value,
} from "../../../../../../types/index.ts"
import type {
	ComparatorConfig,
	LogicalConfig,
	Operand,
	OperatorConfig,
} from "../../../../../types/index.ts"
import type { InputFileAttributes } from "../../types/attributes/index.ts"

import filterAttribute from "../../../../../../guards/filterAttribute/index.ts"
import isBoolean from "../../../../../../guards/isBoolean/index.ts"
import isString from "../../../../../../guards/isString/index.ts"
import pickGlobalAttributes from "../../../../../../guards/pickGlobalAttributes/index.ts"
import Input from "../index.ts"

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

export const filterAttributes = (attributes: InputFileAttributes) => {
	const {
		accept,
		autofocus,
		capture,
		disabled,
		form,
		multiple,
		name,
		required,
		...attrs
	} = attributes
	const globals = pickGlobalAttributes(attrs)

	return {
		...globals,
		...filterAttribute(isString)("accept")(accept),
		...filterAttribute(isBoolean)("autofocus")(autofocus),
		...filterAttribute(isString)("capture")(capture),
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
