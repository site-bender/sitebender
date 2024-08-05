import pickGlobalAttributes from "../../guards/pickGlobalAttributes"
import generateShortId from "../../utilities/generateShortId"
import getAriaAttributes from "../../utilities/getAriaAttributes"
import isDefined from "../../utilities/isDefined"

const GlobalEmpty =
	(tag = "Span") =>
	(attributes = {}) => {
		const {
			aria,
			calculation,
			dataset,
			display,
			scripts,
			stylesheets,
			...attrs
		} = attributes
		const { id = generateShortId(), ...attribs } = pickGlobalAttributes(attrs)

		return {
			attributes: {
				id,
				...getAriaAttributes(aria),
				...attribs,
			},
			...(isDefined(calculation) ? { calculation } : {}),
			...(isDefined(dataset) ? { dataset } : {}),
			...(isDefined(display) ? { display } : {}),
			...(isDefined(scripts) ? { scripts } : {}),
			...(isDefined(stylesheets) ? { stylesheets } : {}),
			tag,
		}
	}

export default GlobalEmpty
