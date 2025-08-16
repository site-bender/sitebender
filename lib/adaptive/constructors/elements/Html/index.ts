import type {
	ComparatorConfig,
	LogicalConfig,
	Operand,
	OperatorConfig,
	Value,
} from "../../../../types/index.ts"
import type { NoAriaAttributes } from "../../types/aria/index.ts"
import type { HtmlAttributes } from "../../types/attributes/index.ts"
import type { ElementConfig } from "../../types/index.ts"

import TextNode from "../../../../constructors/elements/TextNode/index.ts"
import getId from "../../../../constructors/helpers/getId/index.ts"
import filterAttribute from "../../../../guards/filterAttribute/index.ts"
import isBoolean from "../../../../guards/isBoolean/index.ts"
import isString from "../../../../guards/isString/index.ts"
import pickGlobalAttributes from "../../../../guards/pickGlobalAttributes/index.ts"
import isDefined from "../../../utilities/isDefined/index.ts"

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
export const filterAttributes = (attributes: HtmlElementAttributes) => {
	const {
		id,
		manifest,
		xmlns,
		// ARIA attributes
		"aria-hidden": ariaHidden,
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

	// Add html-specific attributes
	if (isDefined(manifest)) {
		Object.assign(
			filteredAttrs,
			filterAttribute(isString)("manifest")(manifest),
		)
	}
	if (isDefined(xmlns)) {
		Object.assign(filteredAttrs, filterAttribute(isString)("xmlns")(xmlns))
	}

	// Add ARIA attributes
	if (isDefined(ariaHidden)) {
		Object.assign(
			filteredAttrs,
			filterAttribute(isBoolean)("aria-hidden")(ariaHidden),
		)
	}

	return filteredAttrs
}

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
export const Html = (attributes: HtmlElementAttributes = {}) =>
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
