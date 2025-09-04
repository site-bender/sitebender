import isDefined from "@sitebender/engine/utilities/isDefined/index.ts"

import type {
	ComparatorConfig,
	LogicalConfig,
	Operand,
	OperatorConfig,
	Value,
} from "../../../../../types/index.ts"
import type { ButtonAriaAttributes } from "../../../types/aria/index.ts"
import type { ButtonAttributes } from "../../../types/attributes/index.ts"
import type { ElementConfig } from "../../../types/index.ts"

import TextNode from "../../../../../constructors/elements/TextNode/index.ts"
import ADVANCED_FILTERS from "../../../../../guards/createAdvancedFilters/index.ts"
import isString from "../../../../../guards/isString/index.ts"
import filterAttributes from "./filterAttributes/index.ts"

// Button-specific attribute filtering is handled in ./filterAttributes

/**
 * Extended Button attributes including reactive properties and ARIA
 */
export type ButtonElementAttributes =
	& ButtonAttributes
	& ButtonAriaAttributes
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
 * Filters attributes for Button element
 * Allows global attributes and validates button-specific attributes
 */


/**
 * Creates a Button element configuration object
 *
 * The button element represents a clickable button.
 * It can contain phrasing content and text, but not interactive elements.
 *
 * @example
 * ```typescript
 * const button = Button({
 *   id: "submit-btn",
 *   type: "submit",
 *   disabled: false
 * })([
 *   TextNode("Submit Form")
 * ])
 * ```
 */
const Button = (attributes: ButtonElementAttributes = {}) =>
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
		? children.filter(ADVANCED_FILTERS.buttonContent)
		: ADVANCED_FILTERS.buttonContent(children)
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
		tag: "Button",
	}
}

export default Button
