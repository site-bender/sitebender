import GlobalOnly from "../../../../../constructors/abstracted/GlobalOnly/index.ts"
import isPhrasingContent from "../../../../../guards/isPhrasingContent/index.ts"

/**
 * Creates a U element configuration object
 *
 * The u element represents a span of text with an unarticulated annotation.
 * It can contain phrasing content.
 *
 * @example
 * ```typescript
 * const u = U({
 *   id: "spelling-error",
 *   class: "misspelled"
 * })([
 *   TextNode("teh")
 * ])
 * ```
 */
export const U = GlobalOnly("U")(isPhrasingContent())

export default U
