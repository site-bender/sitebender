import Filtered from "../../../../../constructors/abstracted/Filtered/index.ts"
import getId from "../../../../../constructors/helpers/getId/index.ts"
import filterAttribute from "../../../../../guards/filterAttribute/index.ts"
import isPhrasingContent from "../../../../../guards/isPhrasingContent/index.ts"
import isString from "../../../../../guards/isString/index.ts"
import pickGlobalAttributes from "../../../../../guards/pickGlobalAttributes/index.ts"

/**
 * Filters attributes for Time element
 * Allows global attributes and validates time-specific attributes
 */
export const filterAttributes = (attributes: Record<string, unknown>) => {
	const { id, datetime, ...otherAttributes } = attributes
	const globals = pickGlobalAttributes(otherAttributes)

	return {
		...getId(id),
		...globals,
		...filterAttribute(isString)("datetime")(datetime),
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
const isValidTimeChild = (child: any): boolean => {
	// Accept text nodes and other primitive content
	if (!child || typeof child !== "object" || !child.tag) {
		return true
	}

	// For element configs, check if they're valid phrasing content
	return isPhrasingContent()(child)
}

export const Time = (attributes: any = {}) => (children: any = []) => {
	const filteredChildren = Array.isArray(children)
		? children.filter(isValidTimeChild)
		: isValidTimeChild(children)
		? [children]
		: []

	return Filtered("Time")(filterAttributes)(attributes)(filteredChildren)
}

export default Time
