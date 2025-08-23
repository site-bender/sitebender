import Input from "../index.ts"
import { filterAttributes } from "../InputButton/index.ts"

/**
 * Creates an InputReset element configuration object
 *
 * The reset input creates a button that resets the form.
 *
 * @example
 * ```typescript
 * const input = InputReset({
 *   value: "Reset Form"
 * })
 * ```
 */
const InputReset = Input("reset")(filterAttributes)

export default InputReset
