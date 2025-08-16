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
import type { BlockQuotationAttributes } from "../types/attributes/index.ts"

import Filtered from "../../../../../constructors/abstracted/Filtered/index.ts"
import getId from "../../../../../constructors/helpers/getId/index.ts"
import filterAttribute from "../../../../../guards/filterAttribute/index.ts"
import isFlowContent from "../../../../../guards/isFlowContent/index.ts"
import isString from "../../../../../guards/isString/index.ts"
import pickGlobalAttributes from "../../../../../guards/pickGlobalAttributes/index.ts"

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
export const BlockQuote = Filtered("BlockQuote")(filterAttributes)(
	isFlowContent(),
)

export default BlockQuote
