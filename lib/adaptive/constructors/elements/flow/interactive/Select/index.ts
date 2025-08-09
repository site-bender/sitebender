import isDefined from "../../../../../../utilities/isDefined/index.ts"
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
export const filterAttributes = (attributes: Record<string, unknown>) => {
	const {
		autoComplete,
		disabled,
		form,
		multiple,
		name,
		required,
		size,
		value,
		...attrs
	} = attributes
	const globals = pickGlobalAttributes(attrs)

	return {
		...globals,
		...filterAttribute(isMemberOf(AUTOCOMPLETES))("autoComplete")(autoComplete),
		...filterAttribute(isBoolean)("disabled")(disabled),
		...filterAttribute(isString)("form")(form),
		...filterAttribute(isBoolean)("multiple")(multiple),
		...filterAttribute(isString)("name")(name),
		...filterAttribute(isBoolean)("required")(required),
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
	(attributes: Record<string, unknown> = {}) => (children: unknown[] = []) => {
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
