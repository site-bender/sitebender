import type {
	ComparatorConfig,
	LogicalConfig,
	Operand,
	OperatorConfig,
	Value,
} from "@sitebender/architect-types/index.ts"
import type { FormAriaAttributes } from "@sitebender/architect/constructors/elements/types/aria/index.ts"
import type { FormAttributes } from "@sitebender/architect/constructors/elements/types/attributes/index.ts"
import type { ElementConfig } from "@sitebender/architect/constructors/elements/types/index.ts"

import TextNode from "@sitebender/architect/constructors/elements/TextNode/index.ts"
import ADVANCED_FILTERS from "@sitebender/architect/guards/createAdvancedFilters/index.ts"
import isString from "@sitebender/architect/guards/isString/index.ts"
import isDefined from "@sitebender/architect/utilities/isDefined/index.ts"

import filterAttributes from "./filterAttributes/index.ts"

/**
 * Extended Form attributes including reactive properties and ARIA
 */
export type FormElementAttributes = FormAttributes & FormAriaAttributes & {
	calculation?: Operand
	dataset?: Record<string, Value>
	display?: ComparatorConfig | LogicalConfig
	format?: OperatorConfig
	scripts?: string[]
	stylesheets?: string[]
	validation?: ComparatorConfig | LogicalConfig
}

/**
 * Filters attributes for Form element
 * Allows global attributes and validates form-specific attributes
 */

/**
 * Creates a Form element configuration object
 *
 * The form element represents a form for collecting user input.
 * It can contain flow content but excludes nested forms.
 *
 * @example
 * ```typescript
 * const form = Form({
 *   id: "contact-form",
 *   action: "/submit",
 *   method: "post",
 *   encType: "application/x-www-form-urlencoded"
 * })([
 *   Label()("Name: "),
 *   Input({ type: "text", name: "name" }),
 *   Button({ type: "submit" })("Submit")
 * ])
 * ```
 */
const Form = (attributes: FormElementAttributes = {}) =>
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

	// Convert string children to TextNode and filter for form content
	const kids = isString(children)
		? [TextNode(children)]
		: Array.isArray(children)
		? children.filter(ADVANCED_FILTERS.formContent)
		: ADVANCED_FILTERS.formContent(children)
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
		tag: "Form",
	}
}

export default Form
