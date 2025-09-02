import filterDateTimeAttributes from "@engineSrc/constructors/elements/flow/interactive/Input/utilities/filterDateTimeAttributes/index.ts"

import Input from "../index.ts"

/**
 * Creates an InputTime element configuration object
 *
 * The time input allows users to select a time.
 *
 * @example
 * ```typescript
 * const input = InputTime({
 *   name: "appointment",
 *   min: "09:00",
 *   max: "17:00",
 *   step: "900"
 * })
 * ```
 */
const InputTime = Input("time")(filterDateTimeAttributes)

export default InputTime
