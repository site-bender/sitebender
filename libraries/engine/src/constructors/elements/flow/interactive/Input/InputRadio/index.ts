import filterCheckedAttributes from "@sitebender/engine/constructors/elements/flow/interactive/Input/utilities/filterCheckedAttributes/index.ts"

import Input from "../index.ts"

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
