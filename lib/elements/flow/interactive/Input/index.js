import generateShortId from "../../../../utilities/generateShortId"
import isDefined from "../../../../utilities/isDefined"

const getInputMode = type => attribs => {
	switch (type) {
		case "Email":
			return { inputmode: "email" }
		case "Number":
			return attribs.step == 1
				? { inputmode: "numeric" }
				: { inputmode: "decimal" }
		case "Search":
			return { inputmode: "search" }
		case "Tel":
			return { inputmode: "tel" }
		case "Url":
			return { inputmode: "url" }
		default:
			return {}
	}
}

const Input =
	(type = "Text") =>
	(filterAttributes = a => a) =>
	(attributes = {}) => {
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
		const { id = generateShortId(), ...attribs } = filterAttributes(attrs)

		return {
			attributes: {
				id,
				...attribs,
				...getInputMode(type, attribs),
				type,
			},
			...(isDefined(calculation) ? { calculation } : {}),
			...(isDefined(dataset) ? { dataset } : {}),
			...(isDefined(display) ? { display } : {}),
			...(isDefined(format) ? { format } : {}),
			...(isDefined(scripts) ? { scripts } : {}),
			...(isDefined(stylesheets) ? { stylesheets } : {}),
			...(isDefined(validation) ? { validation } : {}),
			tag: "Input",
		}
	}

export default Input
