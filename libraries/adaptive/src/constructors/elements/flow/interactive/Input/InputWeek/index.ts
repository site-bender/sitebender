import Input from "../index.ts"
import filterDateTimeAttributes from "../utilities/filterDateTimeAttributes/index.ts"

/**
 * Creates an InputWeek element configuration object
 *
 * The week input allows users to select a week and year.
 *
 * @example
 * ```typescript
 * const input = InputWeek({
 *   name: "schedule",
 *   min: "2023-W01",
 *   max: "2023-W52",
 *   required: true
 * })
 * ```
 */
const InputWeek = Input("week")(filterDateTimeAttributes)

export default InputWeek
