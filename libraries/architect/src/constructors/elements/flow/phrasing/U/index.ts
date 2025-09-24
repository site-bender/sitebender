import GlobalOnly from "@sitebender/architect/constructors/abstracted/GlobalOnly/index.ts"
import isPhrasingContent from "@sitebender/architect/guards/isPhrasingContent/index.ts"

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
const U = GlobalOnly("u")(isPhrasingContent())

export default U
