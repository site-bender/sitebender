import Filtered from "../../../../../constructors/abstracted/Filtered/index.ts"
import getId from "../../../../../constructors/helpers/getId/index.ts"
import filterAttribute from "../../../../../guards/filterAttribute/index.ts"
import isString from "../../../../../guards/isString/index.ts"
import pickGlobalAttributes from "../../../../../guards/pickGlobalAttributes/index.ts"

/**
 * Filters attributes for Ins element
 * Allows global attributes and validates ins-specific attributes
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
 * Creates an Ins element configuration object
 *
 * The ins element represents text that has been inserted into a document.
 *
 * @example
 * ```typescript
 * const ins = Ins({
 *   cite: "https://example.com/edit-log",
 *   datetime: "2023-12-25T10:00:00Z"
 * })([
 *   TextNode("This text was inserted")
 * ])
 * ```
 */
export const Ins = (attributes: any = {}) => (children: any = []) => {
	const filteredChildren = Array.isArray(children) ? children : [children]

	return Filtered("Ins")(filterAttributes)(attributes)(filteredChildren)
}

export default Ins
