import type { Value } from "@sitebender/architect-types/index.ts"

const isSubsetOf = <T>(options: readonly T[]) => (value: Value): boolean => {
	if (typeof value !== "string") {
		return options.includes(value as T)
	}

	const tokens = value.split(/[,\s]+/).filter((token) => token.length > 0)

	return tokens.every((token) => options.includes(token as T))
}

export default isSubsetOf
