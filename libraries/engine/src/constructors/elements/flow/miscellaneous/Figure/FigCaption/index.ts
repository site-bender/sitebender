import GlobalOnly from "../../../../../../constructors/abstracted/GlobalOnly/index.ts"
import isFlowContent from "../../../../../../guards/isFlowContent/index.ts"

/**
 * Creates a FigCaption element configuration object
 *
 * The figcaption element represents a caption or legend for the
 * rest of the contents of the figure element.
 *
 * @example
 * ```typescript
 * const figcaption = FigCaption({
 *   id: "chart-caption"
 * })([
 *   TextNode("Figure 1: Sales growth over time")
 * ])
 * ```
 */
export const FigCaption = GlobalOnly("FigCaption")(isFlowContent())

export default FigCaption
