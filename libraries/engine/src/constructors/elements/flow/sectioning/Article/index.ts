import type { ArticleAriaAttributes } from "@adaptiveSrc/constructors/elements/types/aria/index.ts"
import type { ArticleAttributes } from "@adaptiveSrc/constructors/elements/types/attributes/index.ts"
import type { ElementConfig } from "@adaptiveSrc/constructors/elements/types/index.ts"
import type {
	ComparatorConfig,
	LogicalConfig,
	Operand,
	OperatorConfig,
	Value,
} from "@adaptiveTypes/index.ts"

import { ARTICLE_ROLES } from "@adaptiveSrc/constructors/elements/constants/aria-roles.ts"
import TextNode from "@adaptiveSrc/constructors/elements/TextNode/index.ts"
import getId from "@adaptiveSrc/constructors/helpers/getId/index.ts"
import filterAttribute from "@adaptiveSrc/guards/filterAttribute/index.ts"
import isBoolean from "@adaptiveSrc/guards/isBoolean/index.ts"
import isFlowContent from "@adaptiveSrc/guards/isFlowContent/index.ts"
import isMemberOf from "@adaptiveSrc/guards/isMemberOf/index.ts"
import isNumber from "@adaptiveSrc/guards/isNumber/index.ts"
import isString from "@adaptiveSrc/guards/isString/index.ts"
import pickGlobalAttributes from "@adaptiveSrc/guards/pickGlobalAttributes/index.ts"
import isDefined from "@toolkit/simple/validation/isDefined/index.ts"

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
export const filterAttributes = (attributes: ArticleElementAttributes) => {
	const {
		id,
		// ARIA attributes
		role,
		"aria-label": ariaLabel,
		"aria-labelledby": ariaLabelledby,
		"aria-describedby": ariaDescribedby,
		"aria-hidden": ariaHidden,
		"aria-posinset": ariaPosinset,
		"aria-setsize": ariaSetsize,
		// Reactive properties (to be excluded from HTML attributes)
		calculation: _calculation,
		dataset: _dataset,
		display: _display,
		format: _format,
		scripts: _scripts,
		stylesheets: _stylesheets,
		validation: _validation,
		...otherAttributes
	} = attributes
	const globals = pickGlobalAttributes(otherAttributes)

	// Build the filtered attributes object step by step to avoid union type complexity
	const filteredAttrs: Record<string, unknown> = {}

	// Add ID if present
	Object.assign(filteredAttrs, getId(id))

	// Add global attributes
	Object.assign(filteredAttrs, globals)

	// Add ARIA attributes
	if (isDefined(role)) {
		Object.assign(
			filteredAttrs,
			filterAttribute(isMemberOf(ARTICLE_ROLES))("role")(role),
		)
	}
	if (isDefined(ariaLabel)) {
		Object.assign(
			filteredAttrs,
			filterAttribute(isString)("aria-label")(ariaLabel),
		)
	}
	if (isDefined(ariaLabelledby)) {
		Object.assign(
			filteredAttrs,
			filterAttribute(isString)("aria-labelledby")(ariaLabelledby),
		)
	}
	if (isDefined(ariaDescribedby)) {
		Object.assign(
			filteredAttrs,
			filterAttribute(isString)("aria-describedby")(ariaDescribedby),
		)
	}
	if (isDefined(ariaHidden)) {
		Object.assign(
			filteredAttrs,
			filterAttribute(isBoolean)("aria-hidden")(ariaHidden),
		)
	}
	if (isDefined(ariaPosinset)) {
		Object.assign(
			filteredAttrs,
			filterAttribute(isNumber)("aria-posinset")(ariaPosinset),
		)
	}
	if (isDefined(ariaSetsize)) {
		Object.assign(
			filteredAttrs,
			filterAttribute(isNumber)("aria-setsize")(ariaSetsize),
		)
	}

	return filteredAttrs
}

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
export const Article = (attributes: ArticleElementAttributes = {}) =>
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
		tag: "Article",
	}
}

export default Article
