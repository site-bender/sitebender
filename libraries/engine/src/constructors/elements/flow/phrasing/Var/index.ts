import GlobalOnly from "@engineSrc/constructors/abstracted/GlobalOnly/index.ts"
import isPhrasingContent from "@engineSrc/guards/isPhrasingContent/index.ts"

/**
 * Creates a Var element configuration object
 *
 * The var element represents a variable in a mathematical expression or programming context.
 * It can contain phrasing content.
 *
 * @example
 * ```typescript
 * const var_ = Var({
 *   id: "variable-x",
 *   class: "math-variable"
 * })([
 *   TextNode("x")
 * ])
 * ```
 */
const Var = GlobalOnly("var")(isPhrasingContent())

export default Var
