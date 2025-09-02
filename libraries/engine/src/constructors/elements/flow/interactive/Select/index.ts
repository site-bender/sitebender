import type { SelectAttributes } from "@adaptiveSrc/constructors/elements/types/attributes/index.ts"
import type { ElementConfig } from "@adaptiveSrc/constructors/elements/types/index.ts"
import type {
	ComparatorConfig,
	LogicalConfig,
	Operand,
	OperatorConfig,
	Value,
} from "@adaptiveTypes/index.ts"

import { getSelectAllowedRoles } from "@adaptiveSrc/constructors/elements/constants/aria-roles.ts"
import { AUTOCOMPLETES } from "@adaptiveSrc/constructors/elements/constants/index.ts"
import getId from "@adaptiveSrc/constructors/helpers/getId/index.ts"
import filterAttribute from "@adaptiveSrc/guards/filterAttribute/index.ts"
import isBoolean from "@adaptiveSrc/guards/isBoolean/index.ts"
import isInteger from "@adaptiveSrc/guards/isInteger/index.ts"
import isMemberOf from "@adaptiveSrc/guards/isMemberOf/index.ts"
import isString from "@adaptiveSrc/guards/isString/index.ts"
import pickGlobalAttributes from "@adaptiveSrc/guards/pickGlobalAttributes/index.ts"
import isDefined from "@toolkit/simple/validation/isDefined/index.ts"

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

export const filterAttributes = (
	attributes: Record<string, Value>,
): Record<string, Value> => {
	const {
		autocomplete,
		disabled,
		form,
		multiple,
		name,
		required,
		role,
		size,
		...attrs
	} = attributes
	const globals = pickGlobalAttributes(attrs)

	// Get allowed roles based on multiple attribute
	const allowedRoles = getSelectAllowedRoles(Boolean(multiple))

	const out: Record<string, Value> = {
		...globals,
		...filterAttribute(isMemberOf(AUTOCOMPLETES))("autocomplete")(
			autocomplete as Value,
		),
		...filterAttribute(isBoolean)("disabled")(disabled as Value),
		...filterAttribute(isString)("form")(form as Value),
		...filterAttribute(isBoolean)("multiple")(multiple as Value),
		...filterAttribute(isString)("name")(name as Value),
		...filterAttribute(isBoolean)("required")(required as Value),
		...filterAttribute(isMemberOf(allowedRoles))("role")(role as Value),
		...filterAttribute(isInteger)("size")(size as Value),
	} as Record<string, Value>

	return out
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
