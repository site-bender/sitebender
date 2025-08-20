import Input from "../index.ts"
import filterTextAttributes from "../utilities/filterTextAttributes/index.ts"

/**
 * Creates an InputPassword element configuration object
 *
 * The password input field allows users to securely input passwords.
 *
 * @example
 * ```typescript
 * const input = InputPassword({
 *   name: "password",
 *   placeholder: "Enter your password",
 *   required: true
 * })
 * ```
 */
const InputPassword = Input("password")(filterTextAttributes)

export default InputPassword
