import Filtered from "../../../../../constructors/abstracted/Filtered/index.ts"
import getId from "../../../../../constructors/helpers/getId/index.ts"
import filterAttribute from "../../../../../guards/filterAttribute/index.ts"
import isBoolean from "../../../../../guards/isBoolean/index.ts"
import isInteger from "../../../../../guards/isInteger/index.ts"
import isMemberOf from "../../../../../guards/isMemberOf/index.ts"
import pickGlobalAttributes from "../../../../../guards/pickGlobalAttributes/index.ts"

/**
 * Valid type values for ordered lists
 */
const OL_TYPES = ["1", "a", "A", "i", "I"]

/**
 * Child filter for Ol element - allows li, script, and template elements
 */
const isValidOlChild = (child: any): boolean => {
	if (!child || typeof child !== "object" || !child.tag) {
		return false
	}
	return ["Li", "Script", "Template"].includes(child.tag)
}

/**
 * Filters attributes for Ol element
 * Allows global attributes and validates ol-specific attributes
 */
export const filterAttributes = (attributes: Record<string, unknown>) => {
	const { id, start, reversed, type, ...otherAttributes } = attributes
	const globals = pickGlobalAttributes(otherAttributes)

	return {
		...getId(id),
		...globals,
		...filterAttribute(isInteger)("start")(start),
		...filterAttribute(isBoolean)("reversed")(reversed),
		...filterAttribute(isMemberOf(OL_TYPES))("type")(type),
	}
}

/**
 * Creates an Ol element configuration object
 *
 * The ol element represents an ordered list of items.
 * It can only contain li, script, and template elements.
 *
 * @example
 * ```typescript
 * const ol = Ol({
 *   id: "ordered-list",
 *   start: 5,
 *   type: "i"
 * })([
 *   Li()("First item"),
 *   Li()("Second item"),
 *   Li()("Third item")
 * ])
 * ```
 */
export const Ol = (attributes = {}) => (children = []) => {
	const filteredChildren = Array.isArray(children)
		? children.filter(isValidOlChild)
		: isValidOlChild(children)
		? [children]
		: []

	return Filtered("Ol")(filterAttributes)(attributes)(filteredChildren)
}

export default Ol
