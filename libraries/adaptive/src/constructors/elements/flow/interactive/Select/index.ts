import type {
	ComparatorConfig,
	LogicalConfig,
	Operand,
	OperatorConfig,
} from "../../../../../types/index.ts"
import type {
	ElementConfig,
	GlobalAttributes,
	SpecialProperties,
	Value,
} from "../../../../../types/index.ts"
import type { SelectAttributes } from "../types/attributes/index.ts"

import isDefined from "../../../../../../utilities/isDefined/index.ts"
import { getSelectAllowedRoles } from "../../../../../constructors/elements/constants/aria-roles.ts"
import { AUTOCOMPLETES } from "../../../../../constructors/elements/constants/index.ts"
import getId from "../../../../../constructors/helpers/getId/index.ts"
import filterAttribute from "../../../../../guards/filterAttribute/index.ts"
import isBoolean from "../../../../../guards/isBoolean/index.ts"
import isInteger from "../../../../../guards/isInteger/index.ts"
import isMemberOf from "../../../../../guards/isMemberOf/index.ts"
import isString from "../../../../../guards/isString/index.ts"
import pickGlobalAttributes from "../../../../../guards/pickGlobalAttributes/index.ts"

/**
 * Filters attributes for Select element
 * Allows global attributes and validates select-specific attributes
 */

/**
 * Extended Select attributes including reactive properties
 */
export type SelectElementAttributes = SelectAttributes & {
	aria?: Record<string, Value>
	calculation?: Operand
	dataset?: Record<string, Value>
	display?: ComparatorConfig | LogicalConfig
	format?: OperatorConfig
	scripts?: string[]
	stylesheets?: string[]
	validation?: ComparatorConfig | LogicalConfig
}

export const filterAttributes = (attributes: SelectAttributes) => {
	const {
		autoComplete,
		disabled,
		form,
		multiple,
		name,
		required,
		role,
		size,
		value,
		...attrs
	} = attributes
	const globals = pickGlobalAttributes(attrs)

	// Get allowed roles based on multiple attribute
	const allowedRoles = getSelectAllowedRoles(Boolean(multiple))

	return {
		...globals,
		...filterAttribute(isMemberOf(AUTOCOMPLETES))("autoComplete")(autoComplete),
		...filterAttribute(isBoolean)("disabled")(disabled),
		...filterAttribute(isString)("form")(form),
		...filterAttribute(isBoolean)("multiple")(multiple),
		...filterAttribute(isString)("name")(name),
		...filterAttribute(isBoolean)("required")(required),
		...filterAttribute(isMemberOf(allowedRoles))("role")(role),
		...filterAttribute(isInteger)("size")(size),
		...filterAttribute(isString)("value")(value),
	}
}

/**
 * Creates a Select element configuration object
 *
 * The select element represents a control that provides a menu of options.
 *
 * @param attributes - Element attributes
 * @param children - Child elements (typically Option and OptGroup elements)
 * @returns Element configuration object
 *
 * @example
 * ```typescript
 * const select = Select({
 *   name: "color",
 *   required: true
 * })([
 *   Option({ value: "red" })("Red"),
 *   Option({ value: "blue" })("Blue")
 * ])
 * ```
 */
const Select =
	(attributes: Record<string, Value> = {}) =>
	(children: Array<ElementConfig> | ElementConfig | string = []) => {
		const {
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

		return {
			attributes: {
				...getId(id),
				...attribs,
			},
			children,
			...(isDefined(calculation) ? { calculation } : {}),
			...(isDefined(dataset) ? { dataset } : {}),
			...(isDefined(display) ? { display } : {}),
			...(isDefined(format) ? { format } : {}),
			...(isDefined(scripts) ? { scripts } : {}),
			...(isDefined(stylesheets) ? { stylesheets } : {}),
			...(isDefined(validation) ? { validation } : {}),
			tag: "select",
		}
	}

export default Select
