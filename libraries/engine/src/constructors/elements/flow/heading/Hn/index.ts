import FilteredAllowText from "../../../../../constructors/abstracted/FilteredAllowText/index.ts"
import filterAttributes from "./filterAttributes/index.ts"

/**
 * Filters attributes for Hn element
 * Allows global attributes and validates role attribute against HEADING_ROLES
 */


/**
 * Creates an Hn element configuration object for dynamic heading levels
 *
 * @example
 * ```typescript
 * const hn = Hn({ id: "dynamic-heading", role: "tab" })([
 *   TextNode("Dynamic Heading")
 * ])
 * ```
 */
const Hn = FilteredAllowText("Hn")(filterAttributes)

export default Hn
