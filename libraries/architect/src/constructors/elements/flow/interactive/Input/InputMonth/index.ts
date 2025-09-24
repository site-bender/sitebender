import filterDateTimeAttributes from "@sitebender/architect/constructors/elements/flow/interactive/Input/utilities/filterDateTimeAttributes/index.ts"

import Input from "../index.ts"

/**
 * Creates an InputMonth element configuration object
 *
 * The month input allows users to select a month and year.
 *
 * @example
 * ```typescript
 * const input = InputMonth({
 *   name: "expiry",
 *   min: "2023-01",
 *   max: "2030-12",
 *   required: true
 * })
 * ```
 */
const InputMonth = Input("month")(filterDateTimeAttributes)

export default InputMonth
