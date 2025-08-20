import Input from "../index.ts"
import filterCheckedAttributes from "../utilities/filterCheckedAttributes/index.ts"

/**
 * Creates an InputRadio element configuration object
 *
 * The radio input allows users to select one option from a group.
 *
 * @example
 * ```typescript
 * const input = InputRadio({
 *   name: "size",
 *   value: "medium",
 *   checked: true
 * })
 * ```
 */
const InputRadio = Input("radio")(filterCheckedAttributes)

export default InputRadio
