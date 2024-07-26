import generateShortId from "../../utilities/generateShortId"
import isDefined from "../../utilities/isDefined"

const FilteredEmpty =
	(tag = "Img") =>
	(filterAttributes = a => a) =>
	(attributes = {}) => {
		const { calculation, dataset, display, scripts, stylesheets, ...attrs } =
			attributes
		const { id = generateShortId(), ...attribs } = filterAttributes(attrs)

		return {
			attributes: {
				id,
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

export default FilteredEmpty
