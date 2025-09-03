import isDefined from "@engineSrc/utilities/isDefined/index.ts"

import type {
import filterAttributes from "./filterAttributes/index.ts"
	ComparatorConfig,
	LogicalConfig,
	Operand,
	OperatorConfig,
	Value,
} from "../../../../../types/index.ts"
import type { FormAriaAttributes } from "../../../types/aria/index.ts"
import type { FormAttributes } from "../../../types/attributes/index.ts"
import type { ElementConfig } from "../../../types/index.ts"

import {
	FORM_ENCTYPES,
	FORM_METHODS,
	FORM_TARGETS,
} from "../../../../../constructors/elements/constants/index.ts"
import TextNode from "../../../../../constructors/elements/TextNode/index.ts"
import getId from "../../../../../constructors/helpers/getId/index.ts"
import { ADVANCED_FILTERS } from "../../../../../guards/createAdvancedFilters/index.ts"
import filterAttribute from "../../../../../guards/filterAttribute/index.ts"
import isBoolean from "../../../../../guards/isBoolean/index.ts"
import isMemberOf from "../../../../../guards/isMemberOf/index.ts"
import isString from "../../../../../guards/isString/index.ts"
import pickGlobalAttributes from "../../../../../guards/pickGlobalAttributes/index.ts"

// Form autocomplete constants
const FORM_AUTOCOMPLETE = ["on", "off"]

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
export const Form = (attributes: FormElementAttributes = {}) =>
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

export { default as filterAttributes } from "./filterAttributes/index.ts"
