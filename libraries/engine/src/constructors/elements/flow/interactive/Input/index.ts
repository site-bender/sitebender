import type { Value } from "@engineTypes/index.ts"

import getId from "@engineSrc/constructors/helpers/getId/index.ts"
import { isValue } from "@engineTypes/index.ts"
import isDefined from "@toolkit/simple/validation/isDefined/index.ts"

import type { ElementAttributes } from "../../../types/index.ts"
import type { ElementConfig } from "../../../types/index.ts"

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
	(type: string) => (role: Value | undefined): Record<string, unknown> => {
		if (!isDefined(role)) {
			return {}
		}

		const allowedRoles = getInputAllowedRoles(type)
		return filterAttribute<Value, string>(isMemberOf(allowedRoles))("role")(
			role,
		)
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
	filterAttributes: (
		attributes: Record<string, Value>,
	) => Record<string, Value> = (a) => a,
) =>
(
	attributes: ElementAttributes<Record<string, Value>> =
		{} as ElementAttributes<Record<string, Value>>,
): ElementConfig => {
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

	const datasetOut = typeof dataset === "object" && dataset !== null
		? (Object.fromEntries(
			Object.entries(dataset as Record<string, unknown>).filter(([, v]) =>
				isValue(v)
			),
		) as Record<string, Value>)
		: undefined

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
		...(isDefined(datasetOut) ? { dataset: datasetOut } : {}),
		...(isDefined(display) ? { display } : {}),
		...(isDefined(format) ? { format } : {}),
		...(isDefined(scripts) ? { scripts } : {}),
		...(isDefined(stylesheets) ? { stylesheets } : {}),
		...(isDefined(validation) ? { validation } : {}),
		tag: "input",
	}
}

export default Input
