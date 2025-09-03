import type { ArticleAriaAttributes } from "@engineSrc/constructors/elements/types/aria/index.ts"
import type { ArticleAttributes } from "@engineSrc/constructors/elements/types/attributes/index.ts"
import type { ElementConfig } from "@engineSrc/constructors/elements/types/index.ts"
import filterAttributes from "./filterAttributes/index.ts"
import type {
	ComparatorConfig,
	LogicalConfig,
	Operand,
	OperatorConfig,
	Value,
} from "@engineTypes/index.ts"
import TextNode from "@engineSrc/constructors/elements/TextNode/index.ts"
import isFlowContent from "@engineSrc/guards/isFlowContent/index.ts"
import isString from "@engineSrc/guards/isString/index.ts"
import isDefined from "@engineSrc/utilities/isDefined/index.ts"

/**
 * Extended Article attributes including reactive properties and ARIA
 */
export type ArticleElementAttributes =
	& ArticleAttributes
	& ArticleAriaAttributes
	& {
		calculation?: Operand
		dataset?: Record<string, Value>
		display?: ComparatorConfig | LogicalConfig
		format?: OperatorConfig
		scripts?: string[]
		stylesheets?: string[]
		validation?: ComparatorConfig | LogicalConfig
	}

/**
 * Filters attributes for Article element
 * Allows global attributes and validates article-specific attributes
 */


/**
 * Creates an Article element configuration object
 *
 * The article element represents a complete, or self-contained, composition
 * in a document, page, application, or site. This could be a magazine or
 * newspaper article, a blog or forum post, a product card, a user-submitted
 * comment, an interactive widget or gadget, or any other independent item.
 *
 * @example
 * ```typescript
 * const article = Article({
 *   id: "main-article",
 *   "aria-labelledby": "article-title"
 * })([
 *   H1({ id: "article-title" })("Article Title"),
 *   P()("Article content...")
 * ])
 * ```
 */
const Article = (attributes: ArticleElementAttributes = {}) =>
(
	children: Array<ElementConfig> | ElementConfig | string = [],
): ElementConfig => {
	const { id, ...attribs } = filterAttributes(attributes)
	const {
		calculation,
		dataset,
		display,
		format,
		scripts,
		stylesheets,
		validation,
	} = attributes

	// Convert string children to TextNode and filter children
	const kids = isString(children)
		? [TextNode(children)]
		: Array.isArray(children)
		? children.filter((child) => {
			if (typeof child === "object" && child !== null && "tag" in child) {
				return isFlowContent()(child as ElementConfig)
			}
			return true
		})
		: (typeof children === "object" && children !== null &&
				"tag" in children && isFlowContent()(children as ElementConfig))
		? [children]
		: []

	return {
		attributes: {
			id,
			...attribs,
		},
		children: kids,
		...(isDefined(calculation) ? { calculation } : {}),
		...(isDefined(dataset) ? { dataset } : {}),
		...(isDefined(display) ? { display } : {}),
		...(isDefined(format) ? { format } : {}),
		...(isDefined(scripts) ? { scripts } : {}),
		...(isDefined(stylesheets) ? { stylesheets } : {}),
		...(isDefined(validation) ? { validation } : {}),
		tag: "article",
	}
}

export default Article
