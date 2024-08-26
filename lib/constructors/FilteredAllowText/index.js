import TextNode from "../../elements/TextNode"
import isString from "../../guards/isString"
import generateShortId from "../../utilities/generateShortId"
import getAriaAttributes from "../../utilities/getAriaAttributes"
import isDefined from "../../utilities/isDefined"

const FilteredAllowText =
	(tag = "Img") =>
	filterAttributes =>
	(attributes = {}) =>
	(children = []) => {
		const {
			aria,
			calculation,
			dataset,
			display,
			format,
			scripts,
			stylesheets,
			...attrs
		} = attributes
		const { id = generateShortId(), ...attribs } = filterAttributes(attrs)
		const kids = isString(children)
			? [TextNode(children)]
			: Array.isArray(children)
				? children
				: [children]

		return {
			attributes: {
				id,
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
			tag,
		}
	}

export default FilteredAllowText
