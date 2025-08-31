import type { TimeAttributes } from "@adaptiveSrc/constructors/elements/types/attributes/index.ts"
import type { ElementConfig } from "@adaptiveSrc/constructors/elements/types/index.ts"
import type {
	ComparatorConfig,
	LogicalConfig,
	Operand,
	OperatorConfig,
	Value,
} from "@adaptiveTypes/index.ts"

import Filtered from "@adaptiveSrc/constructors/abstracted/Filtered/index.ts"
import TextNode from "@adaptiveSrc/constructors/elements/TextNode/index.ts"
import getId from "@adaptiveSrc/constructors/helpers/getId/index.ts"
import filterAttribute from "@adaptiveSrc/guards/filterAttribute/index.ts"
import isPhrasingContent from "@adaptiveSrc/guards/isPhrasingContent/index.ts"
import isString from "@adaptiveSrc/guards/isString/index.ts"
import pickGlobalAttributes from "@adaptiveSrc/guards/pickGlobalAttributes/index.ts"

/**
 * Filters attributes for Time element
 * Allows global attributes and validates time-specific attributes
 */

/**
 * Extended Time attributes including reactive properties
 */
export type TimeElementAttributes = TimeAttributes & {
	aria?: Record<string, Value>
	calculation?: Operand
	dataset?: Record<string, Value>
	display?: ComparatorConfig | LogicalConfig
	format?: OperatorConfig
	scripts?: string[]
	stylesheets?: string[]
	validation?: ComparatorConfig | LogicalConfig
}

export const filterAttributes = (attributes: TimeAttributes) => {
	const { id, dateTime, ...otherAttributes } = attributes
	const globals = pickGlobalAttributes(otherAttributes)

	return {
		...getId(id),
		...globals,
		...filterAttribute(isString)("dateTime")(dateTime),
	}
}

/**
 * Creates a Time element configuration object
 *
 * The time element represents a specific period in time.
 *
 * @example
 * ```typescript
 * const time = Time({
 *   datetime: "2023-12-25T10:30:00Z",
 *   id: "event-time"
 * })([
 *   TextNode("December 25, 2023 at 10:30 AM")
 * ])
 * ```
 */
/**
 * Child filter that validates phrasing content
 */
const isValidTimeChild = (child: ElementConfig): boolean => {
	// Accept text nodes and other primitive content
	if (!child || typeof child !== "object" || !child.tag) {
		return true
	}

	// For element configs, check if they're valid phrasing content
	return isPhrasingContent()(child)
}

export const Time =
	(attributes: Record<string, Value> = {}) =>
	(children: Array<ElementConfig> | ElementConfig | string = []) => {
		const filteredChildren = isString(children)
			? [TextNode(children) as unknown as ElementConfig]
			: Array.isArray(children)
			? children.filter(isValidTimeChild)
			: isValidTimeChild(children)
			? [children]
			: []

		return Filtered("time")(
			filterAttributes as (
				a: Record<string, unknown>,
			) => Record<string, unknown>,
		)(attributes)(filteredChildren as Array<ElementConfig>)
	}

export default Time
