import type { TypeInfo } from "../../types/index.ts"

import { TypeKind } from "../../types/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
export default function generateInvalidInputs(type: TypeInfo): Array<unknown> {
	const invalid: Array<unknown> = []

	// Generate wrong type inputs
	if (type.kind === TypeKind.Primitive) {
		switch (type.raw) {
			case "string":
				invalid.push(123) // number instead of string
				invalid.push(true) // boolean instead of string
				invalid.push({}) // object instead of string
				break
			case "number":
				invalid.push("123") // string instead of number
				invalid.push(true) // boolean instead of number
				invalid.push([]) // array instead of number
				break
			case "boolean":
				invalid.push(1) // truthy number instead of boolean
				invalid.push("true") // string instead of boolean
				break
		}
	}

	return invalid
}
