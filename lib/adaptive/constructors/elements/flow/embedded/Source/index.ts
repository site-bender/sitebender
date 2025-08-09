import FilteredEmpty from "../../../../../constructors/abstracted/FilteredEmpty/index.ts"
import getId from "../../../../../constructors/helpers/getId/index.ts"
import filterAttribute from "../../../../../guards/filterAttribute/index.ts"
import isInteger from "../../../../../guards/isInteger/index.ts"
import isString from "../../../../../guards/isString/index.ts"
import pickGlobalAttributes from "../../../../../guards/pickGlobalAttributes/index.ts"

/**
 * Filters attributes for Source element
 * Allows global attributes and validates source-specific attributes
 */
export const filterAttributes = (attributes: Record<string, unknown>) => {
	const {
		id,
		height,
		media,
		sizes,
		src,
		srcset,
		type,
		width,
		...otherAttributes
	} = attributes
	const globals = pickGlobalAttributes(otherAttributes)

	return {
		...getId(id),
		...globals,
		...filterAttribute(isInteger)("height")(height),
		...filterAttribute(isString)("media")(media),
		...filterAttribute(isString)("sizes")(sizes),
		...filterAttribute(isString)("src")(src),
		...filterAttribute(isString)("srcset")(srcset),
		...filterAttribute(isString)("type")(type),
		...filterAttribute(isInteger)("width")(width),
	}
}

/**
 * Creates a Source element configuration object
 *
 * The source element allows authors to specify multiple alternative source sets
 * for img elements or multiple alternative media resources for media elements.
 *
 * @example
 * ```typescript
 * const source = Source({
 *   media: "(min-width: 800px)",
 *   srcset: "large.jpg 1x, large-2x.jpg 2x",
 *   type: "image/jpeg"
 * })
 * ```
 */
export const Source = FilteredEmpty("Source")(filterAttributes)

export default Source
