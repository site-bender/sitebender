import filterAttribute from "../../../../../../guards/filterAttribute/index.ts"
import isString from "../../../../../../guards/isString/index.ts"
import pickGlobalAttributes from "../../../../../../guards/pickGlobalAttributes/index.ts"
import Input from "../index.ts"

/**
 * Filters attributes for InputHidden
 */
export const filterAttributes = (attributes: Record<string, any>) => {
	const { form, name, value, ...attrs } = attributes
	const globals = pickGlobalAttributes(attrs)

	return {
		...globals,
		...filterAttribute(isString)("form")(form),
		...filterAttribute(isString)("name")(name),
		...filterAttribute(isString)("value")(value),
	}
}

/**
 * Creates an InputHidden element configuration object
 *
 * The hidden input stores data that should be submitted with the form but not displayed.
 *
 * @example
 * ```typescript
 * const input = InputHidden({
 *   name: "token",
 *   value: "abc123"
 * })
 * ```
 */
const InputHidden = Input("hidden")(filterAttributes)

export default InputHidden
