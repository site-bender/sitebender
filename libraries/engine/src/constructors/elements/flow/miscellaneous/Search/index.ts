import GlobalOnly from "../../../../../constructors/abstracted/GlobalOnly/index.ts"
import isFlowContent from "../../../../../guards/isFlowContent/index.ts"

/**
 * Creates a Search element configuration object
 *
 * The search element represents a section containing search functionality.
 * It can contain flow content.
 *
 * @example
 * ```typescript
 * const search = Search({ id: "site-search", class: "search-container" })([
 *   Form()([
 *     Input({ type: "search", placeholder: "Search..." }),
 *     Button({ type: "submit" })("Search")
 *   ])
 * ])
 * ```
 */
export const Search = GlobalOnly("Search")(isFlowContent())

export default Search
