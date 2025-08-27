import Input from "../index.ts"
import filterCheckedAttributes from "@adaptiveSrc/constructors/elements/flow/interactive/Input/utilities/filterCheckedAttributes/index.ts"

/**
 * Creates an InputCheckbox element configuration object
 *
 * The checkbox input allows users to select multiple options.
 *
 * @example
 * ```typescript
 * const input = InputCheckbox({
 *   name: "preferences",
 *   value: "newsletter",
 *   checked: true
 * })
 * ```
 */
const InputCheckbox = Input("checkbox")(filterCheckedAttributes)

export default InputCheckbox
