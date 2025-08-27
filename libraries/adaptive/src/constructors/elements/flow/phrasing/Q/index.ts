import type { ComparatorConfig, LogicalConfig, Operand, OperatorConfig, Value } from "@adaptiveTypes/index.ts"
import type { ElementConfig } from "@adaptiveSrc/constructors/elements/types/index.ts"
import type { QuotationAttributes } from "@adaptiveSrc/constructors/elements/types/attributes/index.ts"

import Filtered from "@adaptiveSrc/constructors/abstracted/Filtered/index.ts"
import getId from "@adaptiveSrc/constructors/helpers/getId/index.ts"
import filterAttribute from "@adaptiveSrc/guards/filterAttribute/index.ts"
import isPhrasingContent from "@adaptiveSrc/guards/isPhrasingContent/index.ts"
import isString from "@adaptiveSrc/guards/isString/index.ts"
import pickGlobalAttributes from "@adaptiveSrc/guards/pickGlobalAttributes/index.ts"
import TextNode from "@adaptiveSrc/constructors/elements/TextNode/index.ts"

/**
 * Filters attributes for Q element
 * Allows global attributes and validates q-specific attributes
 */

/**
 * Extended Q attributes including reactive properties
 */
export type QElementAttributes = QuotationAttributes & {
	aria?: Record<string, Value>
	calculation?: Operand
	dataset?: Record<string, Value>
	display?: ComparatorConfig | LogicalConfig
	format?: OperatorConfig
	scripts?: string[]
	stylesheets?: string[]
	validation?: ComparatorConfig | LogicalConfig
}

export const filterAttributes = (attributes: QuotationAttributes) => {
	const { id, cite, ...otherAttributes } = attributes
	const globals = pickGlobalAttributes(otherAttributes)

	return {
		...getId(id),
		...globals,
		...filterAttribute(isString)("cite")(cite),
	}
}

/**
 * Creates a Q element configuration object
 *
 * The q element represents some phrasing content quoted from
 * another source.
 *
 * @example
 * ```typescript
 * const q = Q({
 *   cite: "https://example.com/quote-source",
 *   id: "famous-quote"
 * })([
 *   TextNode("To be or not to be")
 * ])
 * ```
 */
/**
 * Child filter that validates phrasing content
 */
const isValidQChild = (child: ElementConfig): boolean => {
	// Accept text nodes and other primitive content
	if (!child || typeof child !== "object" || !child.tag) {
		return true
	}

	// For element configs, check if they're valid phrasing content
	return isPhrasingContent()(child)
}

export const Q =
	(attributes: Record<string, Value> = {}) =>
	(children: Array<ElementConfig> | ElementConfig | string = []) => {
		const kids = isString(children)
			? [TextNode(children) as unknown as ElementConfig]
			: Array.isArray(children)
			? children.filter(isValidQChild)
			: isValidQChild(children)
			? [children]
			: []

		return Filtered("q")(filterAttributes)(attributes)(kids as Array<ElementConfig>)
	}

export default Q
