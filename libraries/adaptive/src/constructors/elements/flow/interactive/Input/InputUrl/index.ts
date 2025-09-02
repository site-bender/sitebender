import filterTextAttributes from "@adaptiveSrc/constructors/elements/flow/interactive/Input/utilities/filterTextAttributes/index.ts"

import Input from "../index.ts"

/**
 * Creates an InputUrl element configuration object
 *
 * The URL input field allows users to input and edit URLs.
 *
 * @example
 * ```typescript
 * const input = InputUrl({
 *   name: "website",
 *   placeholder: "https://example.com",
 *   required: true
 * })
 * ```
 */
const InputUrl = Input("url")(filterTextAttributes)

export default InputUrl
