import type { Value } from "../../../types/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
const transform =
	<S extends Record<string, (obj: Record<string, unknown>) => Value>>(
		spec: S,
	) =>
	<T extends Record<string | symbol, Value>>(
		obj: T,
	): { [K in keyof S]: ReturnType<S[K]> } => {
		// Handle null/undefined
		const safeObj = (!obj || typeof obj !== "object") ? {} as T : obj

		// Apply each transformation in the spec
		return Object.keys(spec).reduce((result, key) => {
			const transformer = spec[key]
			return {
				...result,
				[key]: transformer(
					safeObj as unknown as Record<string, unknown>,
				),
			}
		}, {} as { [K in keyof S]: ReturnType<S[K]> })
	}

export default transform
