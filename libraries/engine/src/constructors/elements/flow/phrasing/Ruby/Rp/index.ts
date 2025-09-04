import type { ElementConfig } from "@sitebender/engine/constructors/elements/types/index.ts"

import GlobalOnly from "@sitebender/engine/constructors/abstracted/GlobalOnly/index.ts"

/**
 * Creates an Rp element configuration object
 *
 * The rp element provides fallback parentheses for browsers that don't
 * support ruby annotations. It typically contains only text content.
 *
 * @example
 * ```typescript
 * const rp = Rp({
 *   id: "ruby-fallback"
 * })([
 *   TextNode("(")
 * ])
 * ```
 */
const Rp = GlobalOnly("rp")(
	(child: ElementConfig) => child.tag?.toLowerCase() === "textnode",
)

export default Rp
