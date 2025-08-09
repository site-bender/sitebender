import isDefined from "../../../../../../utilities/isDefined/index.ts"
import TextNode from "../../../../../constructors/elements/TextNode/index.ts"
import getAriaAttributes from "../../../../../constructors/helpers/getAriaAttributes/index.ts"
import getId from "../../../../../constructors/helpers/getId/index.ts"
import pickGlobalAttributes from "../../../../../guards/pickGlobalAttributes/index.ts"

/**
 * Creates a Title element configuration object
 *
 * The title element represents the title of the document.
 * It can only contain text content.
 *
 * @example
 * ```typescript
 * const title = Title({
 *   id: "page-title"
 * })("Page Title")
 * ```
 */
export const Title =
	(attributes: Record<string, unknown> = {}) => (content: unknown) => {
		const { dataset, aria, id, ...attrs } = attributes
		const attribs = pickGlobalAttributes(attrs)
		const children = typeof content === "string"
			? [TextNode(content)]
			: content && typeof content === "object" && "tag" in content
			? [content]
			: []

		return {
			attributes: {
				...getId(id),
				...attribs,
				...getAriaAttributes(aria as Record<string, unknown> | undefined),
			},
			children,
			...(isDefined(dataset) ? { dataset } : {}),
			tag: "Title",
		}
	}

export default Title
