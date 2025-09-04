import type {
	ComparatorConfig,
	LogicalConfig,
	Operand,
	OperatorConfig,
	Value,
} from "@sitebender/engine-types/index.ts"
import type { SideCommentAttributes } from "@sitebender/engine/constructors/elements/types/attributes/index.ts"
import type { ElementConfig } from "@sitebender/engine/constructors/elements/types/index.ts"

import GlobalOnly from "@sitebender/engine/constructors/abstracted/GlobalOnly/index.ts"
import isPhrasingContent from "@sitebender/engine/guards/isPhrasingContent/index.ts"

/**
 * Creates a Small element configuration object
 *
 * The small element represents side comments such as small print.
 *
 * @example
 * ```typescript
 * const small = Small({
 *   id: "fine-print"
 * })([
 *   TextNode("Terms and conditions apply")
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
 * Extended Small attributes including reactive properties
 */
export type SmallElementAttributes = SideCommentAttributes & {
	aria?: Record<string, Value>
	calculation?: Operand
	dataset?: Record<string, Value>
	display?: ComparatorConfig | LogicalConfig
	format?: OperatorConfig
	scripts?: string[]
	stylesheets?: string[]
	validation?: ComparatorConfig | LogicalConfig
}

const Small = GlobalOnly("small")(phrasingContentFilter)

export default Small
