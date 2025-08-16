import type { ElementAttributes } from "../../../types/index.ts"
import type { ElementConfig } from "../../../types/index.ts"

import isDefined from "../../../../../../utilities/isDefined/index.ts"
import getId from "../../../../../constructors/helpers/getId/index.ts"
import filterAttribute from "../../../../../guards/filterAttribute/index.ts"
import isMemberOf from "../../../../../guards/isMemberOf/index.ts"
import { getInputAllowedRoles } from "../../../constants/aria-roles.ts"

/**
 * Gets the appropriate inputMode for the given input type
 */
const getInputMode =
	(type: string) =>
	(attribs: Record<string, unknown>): Record<string, unknown> => {
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
 * Validates and filters the role attribute for the given input type
 */
const validateInputRole =
	(type: string) => (role: unknown): Record<string, unknown> => {
		if (!isDefined(role)) {
			return {}
		}

		const allowedRoles = getInputAllowedRoles(type)
		return filterAttribute(isMemberOf(allowedRoles))("role")(role)
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
	filterAttributes: (attributes: ElementAttributes) => Record<string, unknown> =
		(
			a,
		) => a,
) =>
(attributes: ElementAttributes = {}): ElementConfig => {
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

	// Extract role for validation before filtering other attributes
	const { role, ...attrsWithoutRole } = attrs
	const { id, ...attribs } = filterAttributes(attrsWithoutRole)

	return {
		attributes: {
			...getId(id),
			...attribs,
			...validateInputRole(type)(role),
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
