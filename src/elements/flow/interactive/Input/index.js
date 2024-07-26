import generateShortId from "../../../../utilities/generateShortId"
import isDefined from "../../../../utilities/isDefined"

const Input =
	(type = "Text") =>
	(filterAttributes = a => a) =>
	(attributes = {}) => {
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

		return {
			attributes: {
				id,
				...attribs,
				type,
			},
			...(isDefined(calculation) ? { calculation } : {}),
			...(isDefined(dataset) ? { dataset } : {}),
			...(isDefined(display) ? { display } : {}),
			...(isDefined(scripts) ? { scripts } : {}),
			...(isDefined(stylesheets) ? { stylesheets } : {}),
			...(isDefined(validation) ? { validation } : {}),
			tag: "Input",
		}
	}

export default Input
