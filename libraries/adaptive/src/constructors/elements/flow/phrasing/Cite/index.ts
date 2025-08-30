import type {
	ComparatorConfig,
	LogicalConfig,
	Operand,
	OperatorConfig,
	Value,
} from "../../../../../types/index.ts"
import type { AriaAttributes } from "../../../types/aria/index.ts"
import type { CitationAttributes } from "../../../types/attributes/index.ts"
import type { ElementConfig } from "../../../types/index.ts"

import isDefined from "@adaptiveSrc/utilities/isDefined/index.ts"
import TextNode from "../../../../../constructors/elements/TextNode/index.ts"
import getId from "../../../../../constructors/helpers/getId/index.ts"
import { ADVANCED_FILTERS } from "../../../../../guards/createAdvancedFilters/index.ts"
import filterAttribute from "../../../../../guards/filterAttribute/index.ts"
import isString from "../../../../../guards/isString/index.ts"
import pickGlobalAttributes from "../../../../../guards/pickGlobalAttributes/index.ts"

/**
 * Extended Cite attributes including reactive properties and ARIA
 */
export type CiteElementAttributes = CitationAttributes & AriaAttributes & {
	calculation?: Operand
	dataset?: Record<string, Value>
	display?: ComparatorConfig | LogicalConfig
	format?: OperatorConfig
	scripts?: string[]
	stylesheets?: string[]
	validation?: ComparatorConfig | LogicalConfig
}

/**
 * Filters attributes for Cite element
 * Allows global attributes and validates cite-specific attributes
 */
export const filterAttributes = (attributes: CiteElementAttributes) => {
	const {
		id,
		// ARIA attributes
		"aria-label": ariaLabel,
		"aria-labelledby": ariaLabelledby,
		"aria-describedby": ariaDescribedby,
		"aria-hidden": ariaHidden,
		role,
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
			filterAttribute(isString)("aria-hidden")(ariaHidden),
		)
	}
	if (isDefined(role)) {
		Object.assign(filteredAttrs, filterAttribute(isString)("role")(role))
	}

	return filteredAttrs
}

/**
 * Creates a Cite element configuration object
 *
 * The cite element represents the title of a creative work.
 * It can contain phrasing content.
 *
 * @example
 * ```typescript
 * const cite = Cite({
 *   id: "book-title",
 *   class: "citation"
 * })([
 *   TextNode("The Great Gatsby")
 * ])
 * ```
 */
export const Cite = (attributes: CiteElementAttributes = {}) =>
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
		? children.filter(ADVANCED_FILTERS.phrasingContent)
		: ADVANCED_FILTERS.phrasingContent(children)
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
		tag: "cite",
	}
}

export default Cite
