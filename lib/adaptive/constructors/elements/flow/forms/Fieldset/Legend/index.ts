import GlobalOnly from "../../../../../../constructors/abstracted/GlobalOnly/index.ts"
import { ADVANCED_FILTERS } from "../../../../../../guards/createAdvancedFilters/index.ts"

/**
 * Creates a Legend element configuration object
 *
 * The legend element represents a caption for the rest of the contents
 * of the legend element's parent fieldset element.
 *
 * @example
 * ```typescript
 * const legend = Legend({
 *   id: "personal-info-legend"
 * })([
 *   TextNode("Personal Information")
 * ])
 * ```
 */
export const Legend = GlobalOnly("Legend")(ADVANCED_FILTERS.legendContent)

export default Legend
