import filterDateTimeAttributes from "@engineSrc/constructors/elements/flow/interactive/Input/utilities/filterDateTimeAttributes/index.ts"

import Input from "../index.ts"

/**
 * Creates an InputDate element configuration object
 *
 * The date input allows users to select a date.
 *
 * @example
 * ```typescript
 * const input = InputDate({
 *   name: "birthdate",
 *   min: "1900-01-01",
 *   max: "2023-12-31",
 *   required: true
 * })
 * ```
 */
const InputDate = Input("date")(filterDateTimeAttributes)

export default InputDate
