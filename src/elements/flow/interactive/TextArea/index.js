import filterAttribute from "../../../../guards/filterAttribute"
import isBoolean from "../../../../guards/isBoolean"
import isInteger from "../../../../guards/isInteger"
import isMemberOf from "../../../../guards/isMemberOf"
import isString from "../../../../guards/isString"
import pickGlobalAttributes from "../../../../guards/pickGlobalAttributes"
import { AUTOCOMPLETES, WRAPS } from "../../../../rendering/constants"
import generateShortId from "../../../../utilities/generateShortId"
import isDefined from "../../../../utilities/isDefined"
import TextNode from "../../../TextNode"

export const filterAttributes = attributes => {
	const {
		autocomplete,
		cols,
		dirname,
		disabled,
		form,
		maxLength,
		minLength,
		name,
		placeholder,
		readOnly,
		required,
		rows,
		value,
		wrap,
		...attrs
	} = attributes || {}
	const globals = pickGlobalAttributes(attrs)

	return {
		...globals,
		...filterAttribute(isMemberOf(AUTOCOMPLETES))("autocomplete")(autocomplete),
		...filterAttribute(isInteger)("cols")(cols),
		...filterAttribute(isString)("dirname")(dirname),
		...filterAttribute(isBoolean)("disabled")(disabled),
		...filterAttribute(isString)("form")(form),
		...filterAttribute(isInteger)("maxLength")(maxLength),
		...filterAttribute(isInteger)("minLength")(minLength),
		...filterAttribute(isString)("name")(name),
		...filterAttribute(isString)("placeholder")(placeholder),
		...filterAttribute(isBoolean)("readOnly")(readOnly),
		...filterAttribute(isBoolean)("required")(required),
		...filterAttribute(isInteger)("rows")(rows),
		...filterAttribute(isString)("value")(value),
		...filterAttribute(isMemberOf(WRAPS))("wrap")(wrap),
	}
}

const TextArea =
	(attributes = {}) =>
	content => {
		const {
			calculation,
			dataset,
			display,
			scripts,
			stylesheets,
			validation,
			...attrs
		} = attributes
		const { id = generateShortId(), ...attribs } = filterAttributes(attrs)
		// This is why not using Filtered
		const kids = isString(content) ? [TextNode(content)] : undefined

		return {
			attributes: {
				id,
				...attribs,
			},
			children: kids,
			...(isDefined(calculation) ? { calculation } : {}),
			...(isDefined(dataset) ? { dataset } : {}),
			...(isDefined(display) ? { display } : {}),
			...(isDefined(scripts) ? { scripts } : {}),
			...(isDefined(stylesheets) ? { stylesheets } : {}),
			...(isDefined(validation) ? { validation } : {}),
			tag: "TextArea",
		}
	}

export default TextArea
