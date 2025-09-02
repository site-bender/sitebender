import GlobalOnly from "@engineSrc/constructors/abstracted/GlobalOnly/index.ts"
import isPhrasingContent from "@engineSrc/guards/isPhrasingContent/index.ts"

/**
 * Creates a Samp element configuration object
 *
 * The samp element represents sample output from a computer program.
 * It can contain phrasing content.
 *
 * @example
 * ```typescript
 * const samp = Samp({
 *   id: "program-output",
 *   class: "console-output"
 * })([
 *   TextNode("Hello, World!")
 * ])
 * ```
 */
export const Samp = GlobalOnly("samp")(isPhrasingContent())

export default Samp
