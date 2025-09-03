import type { BlockQuotationAttributes } from "@engineSrc/constructors/elements/types/attributes/index.ts"
import type { ElementConfig } from "@engineSrc/constructors/elements/types/index.ts"
import type {
import filterAttributes from "./filterAttributes/index.ts"
	ComparatorConfig,
	LogicalConfig,
	Operand,
	OperatorConfig,
	Value,
} from "@engineTypes/index.ts"

import Filtered from "@engineSrc/constructors/abstracted/Filtered/index.ts"
import getId from "@engineSrc/constructors/helpers/getId/index.ts"
import filterAttribute from "@engineSrc/guards/filterAttribute/index.ts"
import isFlowContent from "@engineSrc/guards/isFlowContent/index.ts"
import isString from "@engineSrc/guards/isString/index.ts"
import pickGlobalAttributes from "@engineSrc/guards/pickGlobalAttributes/index.ts"

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
export const BlockQuote =
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

export { default as filterAttributes } from "./filterAttributes/index.ts"
