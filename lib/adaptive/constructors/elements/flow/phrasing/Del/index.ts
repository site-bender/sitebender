import Filtered from "../../../../../constructors/abstracted/Filtered/index.ts"
import getId from "../../../../../constructors/helpers/getId/index.ts"
import filterAttribute from "../../../../../guards/filterAttribute/index.ts"
import isString from "../../../../../guards/isString/index.ts"
import pickGlobalAttributes from "../../../../../guards/pickGlobalAttributes/index.ts"

/**
 * Filters attributes for Del element
 * Allows global attributes and validates del-specific attributes
 */
export const filterAttributes = (attributes: Record<string, unknown>) => {
	const { id, cite, datetime, ...otherAttributes } = attributes
	const globals = pickGlobalAttributes(otherAttributes)

	return {
		...getId(id),
		...globals,
		...filterAttribute(isString)("cite")(cite),
		...filterAttribute(isString)("datetime")(datetime),
	}
}

/**
 * Creates a Del element configuration object
 *
 * The del element represents text that has been deleted from a document.
 *
 * @example
 * ```typescript
 * const del = Del({
 *   cite: "https://example.com/edit-log",
 *   datetime: "2023-12-25T10:00:00Z"
 * })([
 *   TextNode("This text was deleted")
 * ])
 * ```
 */
export const Del = (attributes: any = {}) => (children: any = []) => {
	const filteredChildren = Array.isArray(children) ? children : [children]

	return Filtered("Del")(filterAttributes)(attributes)(filteredChildren)
}

export default Del
