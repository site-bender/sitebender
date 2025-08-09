import isDefined from "../../../../../../utilities/isDefined/index.ts"
import getId from "../../../../../constructors/helpers/getId/index.ts"

/**
 * Gets the appropriate inputMode for the given input type
 */
const getInputMode =
	(type: string) => (attribs: Record<string, any>): Record<string, any> => {
		switch (type.toLowerCase()) {
			case "email":
				return { inputmode: "email" }
			case "number":
				return attribs["step"] === 1
					? { inputmode: "numeric" }
					: { inputmode: "decimal" }
			case "search":
				return { inputmode: "search" }
			case "tel":
				return { inputmode: "tel" }
			case "url":
				return { inputmode: "url" }
			default:
				return {}
		}
	}

/**
 * Base Input constructor that creates input elements of specified type
 *
 * @param type - The input type (e.g., "Text", "Email", "Password")
 * @param filterAttributes - Function to filter and validate attributes for this input type
 * @returns A function that creates an input element configuration
 */
const Input = (type: string = "Text") =>
(
	filterAttributes: (attributes: Record<string, any>) => Record<string, any> = (
		a,
	) => a,
) =>
(attributes: Record<string, any> = {}): any => {
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
	const { id, ...attribs } = filterAttributes(attrs)

	return {
		attributes: {
			...getId(id),
			...attribs,
			...getInputMode(type)(attribs),
			type: type.toLowerCase(),
		},
		children: [],
		...(isDefined(calculation) ? { calculation } : {}),
		...(isDefined(dataset) ? { dataset } : {}),
		...(isDefined(display) ? { display } : {}),
		...(isDefined(format) ? { format } : {}),
		...(isDefined(scripts) ? { scripts } : {}),
		...(isDefined(stylesheets) ? { stylesheets } : {}),
		...(isDefined(validation) ? { validation } : {}),
		tag: "input",
	}
}

export default Input
