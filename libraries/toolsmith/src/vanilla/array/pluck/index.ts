import isNotNullish from "../../validation/isNotNullish/index.ts"
import isNullish from "../../validation/isNullish/index.ts"

//++ Extracts property values from objects
const pluck = <T, K extends keyof T>(
	key: K,
) =>
(
	array: ReadonlyArray<T> | null | undefined,
): Array<T[K] | undefined> => {
	if (isNullish(array)) {
		return []
	}

	return array.map((item) => {
		if (isNotNullish(item) && typeof item === "object") {
			return (item as Record<string | number | symbol, unknown>)[
				key as unknown as string
			] as T[K] | undefined
		}
		return undefined
	})
}

export default pluck
