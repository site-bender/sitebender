import Filtered from "../../../../../constructors/abstracted/Filtered/index.ts"
import {
	FORM_METHODS,
	FORM_TARGETS,
} from "../../../../../constructors/elements/constants/index.ts"
import getId from "../../../../../constructors/helpers/getId/index.ts"
import { ADVANCED_FILTERS } from "../../../../../guards/createAdvancedFilters/index.ts"
import filterAttribute from "../../../../../guards/filterAttribute/index.ts"
import isBoolean from "../../../../../guards/isBoolean/index.ts"
import isFlowContent from "../../../../../guards/isFlowContent/index.ts"
import isMemberOf from "../../../../../guards/isMemberOf/index.ts"
import isString from "../../../../../guards/isString/index.ts"
import pickGlobalAttributes from "../../../../../guards/pickGlobalAttributes/index.ts"

/**
 * Filters attributes for Form element
 * Allows global attributes and validates form-specific attributes
 */
export const filterAttributes = (attributes: Record<string, unknown>) => {
	const {
		id,
		action,
		method,
		enctype,
		name,
		target,
		autocomplete,
		novalidate,
		...otherAttributes
	} = attributes
	const globals = pickGlobalAttributes(otherAttributes)

	return {
		...getId(id),
		...globals,
		...filterAttribute(isString)("action")(action),
		...filterAttribute(isMemberOf(FORM_METHODS))("method")(method),
		...filterAttribute(isMemberOf(FORM_ENCTYPES))("enctype")(enctype),
		...filterAttribute(isString)("name")(name),
		...filterAttribute(isMemberOf(FORM_TARGETS))("target")(target),
		...filterAttribute(isMemberOf(FORM_AUTOCOMPLETE))("autocomplete")(
			autocomplete,
		),
		...filterAttribute(isBoolean)("novalidate")(novalidate),
	}
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
 *   enctype: "application/x-www-form-urlencoded"
 * })([
 *   Label()("Name: "),
 *   Input({ type: "text", name: "name" }),
 *   Button({ type: "submit" })("Submit")
 * ])
 * ```
 */
export const Form = (attributes: any = {}) => (children: any = []) => {
	const filteredChildren = Array.isArray(children)
		? children.filter(ADVANCED_FILTERS.formContent)
		: ADVANCED_FILTERS.formContent(children)
		? [children]
		: []

	return Filtered("Form")(filterAttributes)(attributes)(filteredChildren)
}

export default Form
