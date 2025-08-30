import type {
	ComparatorConfig,
	LogicalConfig,
	Operand,
	OperatorConfig,
	Value,
} from "../../../../../types/index.ts"
import type { FormAriaAttributes } from "../../../types/aria/index.ts"
import type { FormAttributes } from "../../../types/attributes/index.ts"
import type { ElementConfig } from "../../../types/index.ts"

import isDefined from "@adaptiveSrc/utilities/isDefined/index.ts"
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
export const filterAttributes = (attributes: FormElementAttributes) => {
	const {
		id,
		action,
		method,
		encType,
		name,
		target,
		autocomplete,
		noValidate,
		acceptCharset,
		rel,
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

	// Add form-specific attributes
	if (isDefined(action)) {
		Object.assign(filteredAttrs, filterAttribute(isString)("action")(action))
	}
	if (isDefined(method)) {
		Object.assign(
			filteredAttrs,
			filterAttribute(isMemberOf(FORM_METHODS))("method")(method),
		)
	}
	if (isDefined(encType)) {
		Object.assign(
			filteredAttrs,
			filterAttribute(isMemberOf(FORM_ENCTYPES))("encType")(encType),
		)
	}
	if (isDefined(name)) {
		Object.assign(filteredAttrs, filterAttribute(isString)("name")(name))
	}
	if (isDefined(target)) {
		Object.assign(
			filteredAttrs,
			filterAttribute(isMemberOf(FORM_TARGETS))("target")(target),
		)
	}
	if (isDefined(autocomplete)) {
		Object.assign(
			filteredAttrs,
			filterAttribute(isMemberOf(FORM_AUTOCOMPLETE))("autocomplete")(
				autocomplete,
			),
		)
	}
	if (isDefined(noValidate)) {
		Object.assign(
			filteredAttrs,
			filterAttribute(isBoolean)("noValidate")(noValidate),
		)
	}
	if (isDefined(acceptCharset)) {
		Object.assign(
			filteredAttrs,
			filterAttribute(isString)("acceptCharset")(acceptCharset),
		)
	}
	if (isDefined(rel)) {
		Object.assign(filteredAttrs, filterAttribute(isString)("rel")(rel))
	}

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
			filterAttribute(isBoolean)("aria-hidden")(ariaHidden),
		)
	}
	if (isDefined(role)) {
		Object.assign(filteredAttrs, filterAttribute(isString)("role")(role))
	}

	return filteredAttrs
}

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
