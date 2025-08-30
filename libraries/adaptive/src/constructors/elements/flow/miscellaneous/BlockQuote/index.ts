import type { ComparatorConfig, LogicalConfig, Operand, OperatorConfig, Value } from "@adaptiveTypes/index.ts"
import type { ElementConfig } from "@adaptiveSrc/constructors/elements/types/index.ts"
import type { BlockQuotationAttributes } from "@adaptiveSrc/constructors/elements/types/attributes/index.ts"

import Filtered from "@adaptiveSrc/constructors/abstracted/Filtered/index.ts"
import getId from "@adaptiveSrc/constructors/helpers/getId/index.ts"
import filterAttribute from "@adaptiveSrc/guards/filterAttribute/index.ts"
import isFlowContent from "@adaptiveSrc/guards/isFlowContent/index.ts"
import isString from "@adaptiveSrc/guards/isString/index.ts"
import pickGlobalAttributes from "@adaptiveSrc/guards/pickGlobalAttributes/index.ts"

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

export const filterAttributes = (attributes: BlockQuotationAttributes) => {
	const { id, cite, ...otherAttributes } = attributes
	const globals = pickGlobalAttributes(otherAttributes)

	return {
		...getId(id),
		...globals,
		...filterAttribute(isString)("cite")(cite),
	}
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
			: (!children || typeof children !== "object" || !("tag" in children) || isFlowContent()(children as ElementConfig))
			? [children as ElementConfig]
			: []
		return Filtered("BlockQuote")(filterAttributes)(attributes)(kids as Array<ElementConfig>)
	}

export default BlockQuote
