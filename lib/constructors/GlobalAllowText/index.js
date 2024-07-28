import TextNode from "../../elements/TextNode"
import isString from "../../guards/isString"
import pickGlobalAttributes from "../../guards/pickGlobalAttributes"
import generateShortId from "../../utilities/generateShortId"
import isDefined from "../../utilities/isDefined"

const GlobalAllowText =
	(tag = "Span") =>
	(attributes = {}) =>
	(children = []) => {
		const { calculation, dataset, display, scripts, stylesheets, ...attrs } =
			attributes
		const { id = generateShortId(), ...attribs } = pickGlobalAttributes(attrs)
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

export default GlobalAllowText
