import type { PreformattedTextAttributes } from "@adaptiveSrc/constructors/elements/types/attributes/index.ts"
import type { ElementConfig } from "@adaptiveSrc/constructors/elements/types/index.ts"
import type {
	ComparatorConfig,
	LogicalConfig,
	Operand,
	OperatorConfig,
} from "@adaptiveTypes/index.ts"
import type { Value } from "@adaptiveTypes/index.ts"

import GlobalOnly from "@adaptiveSrc/constructors/abstracted/GlobalOnly/index.ts"
import isPhrasingContent from "@adaptiveSrc/guards/isPhrasingContent/index.ts"

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
 * Creates a Pre element configuration object
 *
 * The pre element represents preformatted text where whitespace is significant.
 * It can only contain phrasing content.
 *
 * @example
 * ```typescript
 * const pre = Pre({ id: "code-block", class: "syntax-highlight" })([
 *   Code()("function hello() {\n  console.log('Hello World!');\n}")
 * ])
 * ```
 */

/**
 * Extended Pre attributes including reactive properties
 */
export type PreElementAttributes = PreformattedTextAttributes & {
	aria?: Record<string, Value>
	calculation?: Operand
	dataset?: Record<string, Value>
	display?: ComparatorConfig | LogicalConfig
	format?: OperatorConfig
	scripts?: string[]
	stylesheets?: string[]
	validation?: ComparatorConfig | LogicalConfig
}

export const Pre = GlobalOnly("Pre")(phrasingContentFilter)

export default Pre
