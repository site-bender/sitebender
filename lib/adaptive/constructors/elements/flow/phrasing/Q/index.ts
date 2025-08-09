import Filtered from "../../../../../constructors/abstracted/Filtered/index.ts"
import getId from "../../../../../constructors/helpers/getId/index.ts"
import filterAttribute from "../../../../../guards/filterAttribute/index.ts"
import isPhrasingContent from "../../../../../guards/isPhrasingContent/index.ts"
import isString from "../../../../../guards/isString/index.ts"
import pickGlobalAttributes from "../../../../../guards/pickGlobalAttributes/index.ts"

/**
 * Filters attributes for Q element
 * Allows global attributes and validates q-specific attributes
 */
export const filterAttributes = (attributes: Record<string, unknown>) => {
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
const isValidQChild = (child: any): boolean => {
	// Accept text nodes and other primitive content
	if (!child || typeof child !== "object" || !child.tag) {
		return true
	}

	// For element configs, check if they're valid phrasing content
	return isPhrasingContent()(child)
}

export const Q = (attributes: any = {}) => (children: any = []) => {
	const filteredChildren = Array.isArray(children)
		? children.filter(isValidQChild)
		: isValidQChild(children)
		? [children]
		: []

	return Filtered("Q")(filterAttributes)(attributes)(filteredChildren)
}

export default Q
