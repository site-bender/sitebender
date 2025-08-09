import FilteredEmpty from "../../../../../constructors/abstracted/FilteredEmpty/index.ts"
import getId from "../../../../../constructors/helpers/getId/index.ts"
import filterAttribute from "../../../../../guards/filterAttribute/index.ts"
import isInteger from "../../../../../guards/isInteger/index.ts"
import isString from "../../../../../guards/isString/index.ts"
import pickGlobalAttributes from "../../../../../guards/pickGlobalAttributes/index.ts"

/**
 * Filters attributes for Embed element
 * Allows global attributes and validates embed-specific attributes
 */
export const filterAttributes = (attributes: Record<string, unknown>) => {
	const { id, height, src, type, width, ...otherAttributes } = attributes
	const globals = pickGlobalAttributes(otherAttributes)

	return {
		...getId(id),
		...globals,
		...filterAttribute(isInteger)("height")(height),
		...filterAttribute(isString)("src")(src),
		...filterAttribute(isString)("type")(type),
		...filterAttribute(isInteger)("width")(width),
	}
}

/**
 * Creates an Embed element configuration object
 *
 * The embed element embeds external content at the specified point in the document.
 *
 * @example
 * ```typescript
 * const embed = Embed({
 *   src: "media.swf",
 *   type: "application/x-shockwave-flash",
 *   width: 400,
 *   height: 300
 * })
 * ```
 */
export const Embed = FilteredEmpty("Embed")(filterAttributes)

export default Embed
