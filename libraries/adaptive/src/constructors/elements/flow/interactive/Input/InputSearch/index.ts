import Input from "../index.ts"
import filterTextAttributes from "@adaptiveSrc/constructors/elements/flow/interactive/Input/utilities/filterTextAttributes/index.ts"

/**
 * Creates an InputSearch element configuration object
 *
 * The search input field allows users to input search queries.
 *
 * @example
 * ```typescript
 * const input = InputSearch({
 *   name: "query",
 *   placeholder: "Search...",
 *   autocomplete: "off"
 * })
 * ```
 */
const InputSearch = Input("search")(filterTextAttributes)

export default InputSearch
