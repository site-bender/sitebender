import generateShortId from "../../utilities/generateShortId"
import isDefined from "../../utilities/isDefined"

const Filtered =
	(tag = "A") =>
	(filterAttributes = a => a) =>
	(attributes = {}) =>
	(children = []) => {
		const { calculation, dataset, display, scripts, stylesheets, ...attrs } =
			attributes
		const { id = generateShortId(), ...attribs } = filterAttributes(attrs)
		const kids = Array.isArray(children) ? children : [children]

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
			tag,
		}
	}

export default Filtered
