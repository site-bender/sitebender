import GlobalOnly from "../../../../../constructors/abstracted/GlobalOnly/index.ts"
import isFlowContent from "../../../../../guards/isFlowContent/index.ts"

/**
 * Creates a Figure element configuration object
 *
 * The figure element represents self-contained content, potentially with an
 * optional caption (figcaption), that is referenced as a single unit.
 *
 * @example
 * ```typescript
 * const figure = Figure({ id: "chart-1", class: "chart" })([
 *   Img({ src: "chart.png", alt: "Sales chart" }),
 *   FigCaption()("Figure 1: Monthly sales data")
 * ])
 * ```
 */
const Figure = GlobalOnly("Figure")(isFlowContent())

export default Figure
