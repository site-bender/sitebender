import type {
	ComparatorConfig,
	LogicalConfig,
	Operand,
	OperatorConfig,
	Value,
} from "../../../../types/index.ts"
import type { NoAriaAttributes } from "../../types/aria/index.ts"
import type { StyleAttributes } from "../../types/attributes/index.ts"
import type { ElementConfig } from "../../types/index.ts"

import { BLOCKINGS } from "../../../../constructors/elements/constants/index.ts"
import TextNode from "../../../../constructors/elements/TextNode/index.ts"
import getId from "../../../../constructors/helpers/getId/index.ts"
import filterAttribute from "../../../../guards/filterAttribute/index.ts"
import isBoolean from "../../../../guards/isBoolean/index.ts"
import isMemberOf from "../../../../guards/isMemberOf/index.ts"
import isString from "../../../../guards/isString/index.ts"
import pickGlobalAttributes from "../../../../guards/pickGlobalAttributes/index.ts"
import isDefined from "../../../../utilities/isDefined/index.ts"

/**
 * Filters attributes for Style element
 * Allows global attributes and validates style-specific attributes
 */

/**
 * Extended Style attributes including reactive properties and ARIA
 */
export type StyleElementAttributes = StyleAttributes & NoAriaAttributes & {
	calculation?: Operand
	dataset?: Record<string, Value>
	display?: ComparatorConfig | LogicalConfig
	format?: OperatorConfig
	scripts?: string[]
	stylesheets?: string[]
	validation?: ComparatorConfig | LogicalConfig
}

/**
 * Filters attributes for Style element
 * Allows global attributes and validates style-specific attributes
 */
export const filterAttributes = (attributes: StyleElementAttributes) => {
	const {
		id,
		blocking,
		media,
		scoped,
		title,
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

	// Add style-specific attributes
	if (isDefined(blocking)) {
		Object.assign(
			filteredAttrs,
			filterAttribute(isMemberOf(BLOCKINGS))("blocking")(blocking),
		)
	}
	if (isDefined(media)) {
		Object.assign(filteredAttrs, filterAttribute(isString)("media")(media))
	}
	if (isDefined(scoped)) {
		Object.assign(filteredAttrs, filterAttribute(isBoolean)("scoped")(scoped))
	}
	if (isDefined(title)) {
		Object.assign(filteredAttrs, filterAttribute(isString)("title")(title))
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
export const Style = (attributes: StyleElementAttributes = {}) =>
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

	// Convert string children to TextNode
	const kids = isString(children)
		? [TextNode(children)]
		: Array.isArray(children)
		? children
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
		tag: "Style",
	}
}

export default Style
