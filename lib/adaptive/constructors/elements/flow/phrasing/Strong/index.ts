import type {
	ElementConfig,
	GlobalAttributes,
	Value,
} from "../../../../../types/index.ts"
import type {
	ComparatorConfig,
	LogicalConfig,
	Operand,
	OperatorConfig,
} from "../../../../../types/index.ts"
import type { StrongImportanceAttributes } from "../types/attributes/index.ts"

import GlobalOnly from "../../../../../constructors/abstracted/GlobalOnly/index.ts"
import isPhrasingContent from "../../../../../guards/isPhrasingContent/index.ts"

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
 * Creates a Strong element configuration object
 *
 * @example
 * ```typescript
 * const strong = Strong({ id: "important", class: "highlight" })([
 *   TextNode("Important text")
 * ])
 * ```
 */

/**
 * Extended Strong attributes including reactive properties
 */
export type StrongElementAttributes = StrongImportanceAttributes & {
	aria?: Record<string, Value>
	calculation?: Operand
	dataset?: Record<string, Value>
	display?: ComparatorConfig | LogicalConfig
	format?: OperatorConfig
	scripts?: string[]
	stylesheets?: string[]
	validation?: ComparatorConfig | LogicalConfig
}

export const Strong = GlobalOnly("Strong")(phrasingContentFilter)

export default Strong
