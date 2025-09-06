import type {
	ComparatorConfig,
	LogicalConfig,
	Operand,
	OperatorConfig,
	Value,
} from "@sitebender/engine-types/index.ts"
import type { BlockQuotationAttributes } from "@sitebender/engine/constructors/elements/types/attributes/index.ts"
import type { ElementConfig } from "@sitebender/engine/constructors/elements/types/index.ts"

import Filtered from "@sitebender/engine/constructors/abstracted/Filtered/index.ts"
import isFlowContent from "@sitebender/engine/guards/isFlowContent/index.ts"

import filterAttributes from "./filterAttributes/index.ts"

/**
 * Filters attributes for BlockQuote element
 * Allows global attributes and validates the cite attribute
 */

/**
 * Extended BlockQuote attributes including reactive properties
 */
export type BlockQuoteElementAttributes = BlockQuotationAttributes & {
	aria?: Record<string, Value>
	calculation?: Operand
	dataset?: Record<string, Value>
	display?: ComparatorConfig | LogicalConfig
	format?: OperatorConfig
	scripts?: string[]
	stylesheets?: string[]
	validation?: ComparatorConfig | LogicalConfig
}

/**
 * Creates a BlockQuote element configuration object
 *
 * The blockquote element represents content that is quoted from another source.
 * It can contain flow content and optionally cite the source.
 *
 * @example
 * ```typescript
 * const blockquote = BlockQuote({
 *   id: "famous-quote",
 *   cite: "https://example.com/source"
 * })([
 *   P()("To be or not to be, that is the question."),
 *   Footer()([P()("— Shakespeare")])
 * ])
 * ```
 */
const BlockQuote =
	(attributes: Record<string, Value> = {}) =>
	(children: Array<ElementConfig> | ElementConfig | string = []) => {
		const kids = Array.isArray(children)
			? children.filter((c) => !c?.tag || isFlowContent()(c as ElementConfig))
			: (!children || typeof children !== "object" || !("tag" in children) ||
					isFlowContent()(children as ElementConfig))
			? [children as ElementConfig]
			: []
		return Filtered("BlockQuote")(filterAttributes)(attributes)(
			kids as Array<ElementConfig>,
		)
	}

export default BlockQuote
