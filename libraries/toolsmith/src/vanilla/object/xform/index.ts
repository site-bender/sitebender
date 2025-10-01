import isNull from "../../validation/isNull/index.ts"
import isUndefined from "../../validation/isUndefined/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
const xform = <T extends Record<string | symbol, unknown>>(
	transformer: (
		obj: Record<string | symbol, unknown>,
	) => Record<string | symbol, unknown>,
) =>
(
	obj: T,
): unknown => {
	const transformRecursive = (current: unknown): unknown => {
		// Handle primitives
		if (
			isNull(current) || isUndefined(current) ||
			typeof current !== "object"
		) {
			return current
		}

		// Handle arrays - traverse but don't transform the array itself
		if (Array.isArray(current)) {
			return current.map(transformRecursive)
		}

		// Transform the current object first
		const transformed = transformer(
			current as Record<string | symbol, unknown>,
		)

		// Recursively transform nested values
		return Object.entries(transformed).reduce(
			(acc, [key, value]) => ({
				...acc,
				[key]: transformRecursive(value),
			}),
			{},
		)
	}

	return transformRecursive(obj)
}

export default xform
