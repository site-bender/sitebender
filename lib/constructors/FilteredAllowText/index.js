import TextNode from "../../elements/TextNode"
import isString from "../../guards/isString"
import generateShortId from "../../utilities/generateShortId"
import isDefined from "../../utilities/isDefined"

const FilteredAllowText =
	(tag = "Img") =>
	(filterAttributes = a => a) =>
	(attributes = {}) =>
	(children = []) => {
		const { calculation, dataset, display, scripts, stylesheets, ...attrs } =
			attributes
		const { id = generateShortId(), ...attribs } = filterAttributes(attrs)
		const kids = isString(children)
			? [TextNode(children)]
			: Array.isArray(children)
				? children
				: [children]

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

export default FilteredAllowText
