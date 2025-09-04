import type {
	ComparatorConfig,
	LogicalConfig,
	Operand,
	OperatorConfig,
	Value,
} from "@sitebender/engine-types/index.ts"
import type { SuperscriptAttributes } from "@sitebender/engine/constructors/elements/types/attributes/index.ts"
import type { ElementConfig } from "@sitebender/engine/constructors/elements/types/index.ts"

import GlobalOnly from "@sitebender/engine/constructors/abstracted/GlobalOnly/index.ts"
import isPhrasingContent from "@sitebender/engine/guards/isPhrasingContent/index.ts"

/**
 * Creates a Sup element configuration object
 *
 * The sup element represents a superscript.
 *
 * @example
 * ```typescript
 * const sup = Sup({
 *   id: "exponent"
 * })([
 *   TextNode("2")
 * ])
 * ```
 */
/**
 * Child filter that validates phrasing content
 */
const phrasingContentFilter = (child: ElementConfig): boolean => {
	if (typeof child === "object" && child !== null && "tag" in child) {
		return isPhrasingContent()(
			child as ElementConfig,
		)
	}
	// Accept text nodes and other primitive content
	return true
}

/**
 * Extended Sup attributes including reactive properties
 */
export type SupElementAttributes = SuperscriptAttributes & {
	aria?: Record<string, Value>
	calculation?: Operand
	dataset?: Record<string, Value>
	display?: ComparatorConfig | LogicalConfig
	format?: OperatorConfig
	scripts?: string[]
	stylesheets?: string[]
	validation?: ComparatorConfig | LogicalConfig
}

const Sup = GlobalOnly("sup")(phrasingContentFilter)

export default Sup
