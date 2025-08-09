import Input from "../index.ts"
import filterTextAttributes from "../utilities/filterTextAttributes/index.ts"

/**
 * Creates an InputText element configuration object
 *
 * The text input field allows users to input and edit text.
 *
 * @example
 * ```typescript
 * const input = InputText({
 *   name: "username",
 *   placeholder: "Enter your username",
 *   required: true
 * })
 * ```
 */
const InputText = Input("text")(filterTextAttributes)

export default InputText
