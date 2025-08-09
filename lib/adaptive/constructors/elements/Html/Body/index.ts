import type { BodyAttributes } from "../../../../constructors/elements/types/attributes/index.ts"
import type {
	ElementAttributes,
	ElementConfig,
} from "../../../../constructors/elements/types/index.ts"

import GlobalOnly from "../../../../constructors/abstracted/GlobalOnly/index.ts"
import isFlowContent from "../../../../guards/isFlowContent/index.ts"

/**
 * Creates a Body element configuration object
 *
 * The body element represents the content of an HTML document.
 * It can contain flow content.
 *
 * @example
 * ```typescript
 * const body = Body({
 *   id: "main-body",
 *   class: "page-content"
 * })([
 *   Header()([H1()("Welcome")]),
 *   Main()([P()("Page content")]),
 *   Footer()([P()("Copyright info")])
 * ])
 * ```
 */
export const Body: (
	attributes: ElementAttributes<BodyAttributes>,
) => (children: Array<unknown>) => ElementConfig<BodyAttributes> = GlobalOnly(
	"Body",
)(isFlowContent())

export default Body
