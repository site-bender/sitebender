import isDefined from "../../../../../../utilities/isDefined/index.ts"
import FilteredAllowText from "../../../../../constructors/abstracted/FilteredAllowText/index.ts"
import {
	BUTTON_ROLES,
	BUTTON_TYPES,
	FORM_METHODS,
	FORM_TARGETS,
	POPOVER_TARGET_ACTIONS,
} from "../../../../../constructors/elements/constants/index.ts"
import TextNode from "../../../../../constructors/elements/TextNode/index.ts"
import getAriaAttributes from "../../../../../constructors/helpers/getAriaAttributes/index.ts"
import getId from "../../../../../constructors/helpers/getId/index.ts"
import { ADVANCED_FILTERS } from "../../../../../guards/createAdvancedFilters/index.ts"
import filterAttribute from "../../../../../guards/filterAttribute/index.ts"
import isBoolean from "../../../../../guards/isBoolean/index.ts"
import isMemberOf from "../../../../../guards/isMemberOf/index.ts"
import isString from "../../../../../guards/isString/index.ts"
import pickGlobalAttributes from "../../../../../guards/pickGlobalAttributes/index.ts"

/**
 * Filters attributes for Button element
 * Allows global attributes and validates button-specific attributes
 */
export const filterAttributes = (attributes: Record<string, unknown>) => {
	const {
		id,
		autofocus,
		disabled,
		form,
		formAction,
		formEncType,
		formMethod,
		formNoValidate,
		formTarget,
		name,
		popoverTarget,
		popoverTargetAction,
		role,
		type,
		value,
		...otherAttributes
	} = attributes
	const globals = pickGlobalAttributes(otherAttributes)

	return {
		...getId(id),
		...globals,
		...filterAttribute(isBoolean)("autofocus")(autofocus),
		...filterAttribute(isBoolean)("disabled")(disabled),
		...filterAttribute(isString)("form")(form),
		...filterAttribute(isString)("formAction")(formAction),
		...filterAttribute(isString)("formEncType")(formEncType),
		...filterAttribute(isMemberOf(FORM_METHODS))("formMethod")(formMethod),
		...filterAttribute(isBoolean)("formNoValidate")(formNoValidate),
		...filterAttribute(isMemberOf(FORM_TARGETS))("formTarget")(formTarget),
		...filterAttribute(isString)("name")(name),
		...filterAttribute(isString)("popoverTarget")(popoverTarget),
		...filterAttribute(isMemberOf(POPOVER_TARGET_ACTIONS))(
			"popoverTargetAction",
		)(popoverTargetAction),
		...filterAttribute(isMemberOf(BUTTON_ROLES))("role")(role),
		...filterAttribute(isMemberOf(BUTTON_TYPES))("type")(type),
		...filterAttribute(isString)("value")(value),
	}
}

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
export const Button =
	(attributes: any = {}) => (children: unknown = []): any => {
		const {
			aria,
			calculation,
			dataset,
			display,
			format,
			scripts,
			stylesheets,
			validation,
			...attrs
		} = attributes
		const { id, ...attribs } = filterAttributes(attrs)

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
				...getId(id),
				...getAriaAttributes(aria),
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
