import GlobalOnly from "../../../../../../constructors/abstracted/GlobalOnly/index.ts"

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
export const Rp = GlobalOnly("Rp")(
	(child: any) => child.tag?.toLowerCase() === "textnode",
)

export default Rp
