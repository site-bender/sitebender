import type { SubscriptAttributes } from "@engineSrc/constructors/elements/types/attributes/index.ts"
import type { ElementConfig } from "@engineSrc/constructors/elements/types/index.ts"
import type {
	ComparatorConfig,
	LogicalConfig,
	Operand,
	OperatorConfig,
	Value,
} from "@engineTypes/index.ts"

import GlobalOnly from "@engineSrc/constructors/abstracted/GlobalOnly/index.ts"
import isPhrasingContent from "@engineSrc/guards/isPhrasingContent/index.ts"

/**
 * Creates a Sub element configuration object
 *
 * The sub element represents a subscript.
 *
 * @example
 * ```typescript
 * const sub = Sub({
 *   id: "chemical-formula"
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
 * Extended Sub attributes including reactive properties
 */
export type SubElementAttributes = SubscriptAttributes & {
	aria?: Record<string, Value>
	calculation?: Operand
	dataset?: Record<string, Value>
	display?: ComparatorConfig | LogicalConfig
	format?: OperatorConfig
	scripts?: string[]
	stylesheets?: string[]
	validation?: ComparatorConfig | LogicalConfig
}

const Sub = GlobalOnly("sub")(phrasingContentFilter)

export default Sub
