import isNullish from "../../validation/isNullish/index.ts"

//++ Returns the value with the smaller mapped result; returns NaN on invalid mapping
//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
export default function minBy<T>(
	fn: (value: T) => number,
) {
	return function minByWithMapper(
		a: T,
	) {
		return function compareMinimum(
			b: T,
		): T {
			if (typeof fn !== "function") {
				return (NaN as unknown) as T
			}

			const aValue = fn(a)
			const bValue = fn(b)

			// Check if mapped values are valid numbers
			if (isNullish(aValue) || typeof aValue !== "number" || isNaN(aValue)) {
				return (NaN as unknown) as T
			}

			if (isNullish(bValue) || typeof bValue !== "number" || isNaN(bValue)) {
				return (NaN as unknown) as T
			}

			// Return the value with smaller mapped result
			// If equal, return the second value
			return aValue <= bValue ? a : b
		}
	}
}

//?? [EXAMPLE] minBy(Math.abs)(-5)(3) // 3
//?? [EXAMPLE] minBy(() => NaN)(1)(2) // NaN
