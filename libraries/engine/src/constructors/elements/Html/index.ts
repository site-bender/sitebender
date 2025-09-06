import type {
	ComparatorConfig,
	LogicalConfig,
	Operand,
	OperatorConfig,
	Value,
} from "@sitebender/engine-types/index.ts"
import type { NoAriaAttributes } from "@sitebender/engine/constructors/elements/types/aria/index.ts"
import type { HtmlAttributes } from "@sitebender/engine/constructors/elements/types/attributes/index.ts"
import type { ElementConfig } from "@sitebender/engine/constructors/elements/types/index.ts"

import TextNode from "@sitebender/engine/constructors/elements/TextNode/index.ts"
import isString from "@sitebender/engine/guards/isString/index.ts"
import isDefined from "@sitebender/engine/utilities/isDefined/index.ts"

import filterAttributes from "./filterAttributes/index.ts"

/**
 * Extended Html attributes including reactive properties and ARIA
 */
export type HtmlElementAttributes = HtmlAttributes & NoAriaAttributes & {
	calculation?: Operand
	dataset?: Record<string, Value>
	display?: ComparatorConfig | LogicalConfig
	format?: OperatorConfig
	scripts?: string[]
	stylesheets?: string[]
	validation?: ComparatorConfig | LogicalConfig
}

/**
 * Filters attributes for Html element
 * Allows global attributes and validates html-specific attributes
 */

/**
 * Creates an Html element configuration object
 *
 * The html element represents the root of an HTML document.
 * It can contain metadata and flow content.
 *
 * @example
 * ```typescript
 * const html = Html({
 *   id: "root",
 *   lang: "en",
 *   manifest: "/app.manifest",
 *   xmlns: "http://www.w3.org/1999/xhtml"
 * })([
 *   Head()([Title()("Page Title")]),
 *   Body()([H1()("Welcome")])
 * ])
 * ```
 */
const Html = (attributes: HtmlElementAttributes = {}) =>
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
	// Html should typically only contain Head and Body, but we use flow content filter for flexibility
	const kids = isString(children)
		? [TextNode(children)]
		: Array.isArray(children)
		? children.filter((child) => {
			// Accept text nodes and other primitive content
			if (!child || typeof child !== "object" || !("tag" in child)) {
				return true
			}
			// For Html, we really only want Head and Body, but allow any flow content for flexibility
			return true
		})
		: [children]

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
		tag: "Html",
	}
}

export default Html
