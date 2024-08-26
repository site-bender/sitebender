import pickGlobalAttributes from "../../guards/pickGlobalAttributes"
import generateShortId from "../../utilities/generateShortId"
import getAriaAttributes from "../../utilities/getAriaAttributes"
import isDefined from "../../utilities/isDefined"

const GlobalOnly =
	(tag = "Span") =>
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
		const { id = generateShortId(), ...attribs } = pickGlobalAttributes(attrs)
		const kids = Array.isArray(children) ? children : [children]

		return {
			attributes: {
				id,
				...attribs,
				...getAriaAttributes(aria),
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

export default GlobalOnly
