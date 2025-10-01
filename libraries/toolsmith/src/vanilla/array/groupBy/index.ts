import isNullish from "../../validation/isNullish/index.ts"

//++ Groups elements by a key function
const groupBy = <T, K extends string | number>(
	keyFn: (element: T) => K,
) =>
(
	array: ReadonlyArray<T> | null | undefined,
): Record<string, Array<T>> => {
	if (isNullish(array)) {
		return {}
	}

	return array.reduce((acc: Record<string, Array<T>>, element: T) => {
		const key = String(keyFn(element))
		const existing = Object.hasOwn(acc, key) ? acc[key] : []

		return {
			...acc,
			[key]: [...existing, element],
		}
	}, Object.create(null))
}


export default groupBy
