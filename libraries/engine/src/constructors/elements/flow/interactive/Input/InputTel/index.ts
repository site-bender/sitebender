import filterTextAttributes from "@adaptiveSrc/constructors/elements/flow/interactive/Input/utilities/filterTextAttributes/index.ts"

import Input from "../index.ts"

/**
 * Creates an InputTel element configuration object
 *
 * The telephone input field allows users to input and edit telephone numbers.
 *
 * @example
 * ```typescript
 * const input = InputTel({
 *   name: "phone",
 *   placeholder: "+1 (555) 123-4567",
 *   required: true
 * })
 * ```
 */
const InputTel = Input("tel")(filterTextAttributes)

export default InputTel
