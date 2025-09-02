import filterDateTimeAttributes from "@engineSrc/constructors/elements/flow/interactive/Input/utilities/filterDateTimeAttributes/index.ts"

import Input from "../index.ts"

/**
 * Creates an InputDateTimeLocal element configuration object
 *
 * The datetime-local input allows users to select a date and time.
 *
 * @example
 * ```typescript
 * const input = InputDateTimeLocal({
 *   name: "schedule",
 *   min: "2023-01-01T00:00",
 *   max: "2023-12-31T23:59",
 *   required: true
 * })
 * ```
 */
const InputDateTimeLocal = Input("datetime-local")(filterDateTimeAttributes)

export default InputDateTimeLocal
