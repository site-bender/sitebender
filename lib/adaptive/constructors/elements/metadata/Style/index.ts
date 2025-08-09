import Filtered from "../../../../constructors/abstracted/Filtered/index.ts"
import { BLOCKINGS } from "../../../../constructors/elements/constants/index.ts"
import getId from "../../../../constructors/helpers/getId/index.ts"
import filterAttribute from "../../../../guards/filterAttribute/index.ts"
import isBoolean from "../../../../guards/isBoolean/index.ts"
import isMemberOf from "../../../../guards/isMemberOf/index.ts"
import isString from "../../../../guards/isString/index.ts"
import pickGlobalAttributes from "../../../../guards/pickGlobalAttributes/index.ts"

/**
 * Filters attributes for Style element
 * Allows global attributes and validates style-specific attributes
 */
export const filterAttributes = (attributes: Record<string, unknown>) => {
	const { id, blocking, media, scoped, title, ...otherAttributes } = attributes
	const globals = pickGlobalAttributes(otherAttributes)

	return {
		...getId(id),
		...globals,
		...filterAttribute(isMemberOf(BLOCKINGS))("blocking")(blocking),
		...filterAttribute(isString)("media")(media),
		...filterAttribute(isBoolean)("scoped")(scoped),
		...filterAttribute(isString)("title")(title),
	}
}

/**
 * Creates a Style element configuration object
 *
 * The style element allows authors to embed style information in their documents.
 * It can contain CSS text content.
 *
 * @example
 * ```typescript
 * const style = Style({
 *   media: "screen",
 *   title: "Main styles"
 * })([TextNode("body { margin: 0; }")])
 * ```
 */
export const Style = Filtered("Style")(filterAttributes)

export default Style
