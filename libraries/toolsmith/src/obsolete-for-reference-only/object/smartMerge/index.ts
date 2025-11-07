import isNotNull from "../../validation/isNotNull/index.ts"
import isNullish from "../../validation/isNullish/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
type MergeStrategy = {
	arrays?: "concat" | "replace" | "union"
	depth?: number
	resolver?: (key: string, left: unknown, right: unknown) => unknown
}

const smartMerge =
	(strategy: MergeStrategy = {}) =>
	(...sources: Array<Record<string, unknown>>): Record<string, unknown> => {
		const {
			arrays = "concat",
			depth = 10,
			resolver = (_key: string, _left: unknown, right: unknown) => right,
		} = strategy

		const mergeTwo = (
			left: unknown,
			right: unknown,
			currentDepth: number = 0,
		): unknown => {
			// Handle null/undefined
			if (isNullish(left)) return right
			if (isNullish(right)) return left

			// Check depth limit
			if (currentDepth >= depth) {
				return right
			}

			// Handle arrays based on strategy
			if (Array.isArray(left) && Array.isArray(right)) {
				switch (arrays) {
					case "replace":
						return [...right]
					case "union":
						return [...new Set<unknown>([...left, ...right])]
					case "concat":
					default:
						return [...left, ...right]
				}
			}

			// Handle objects (deep merge)
			if (
				typeof left === "object" &&
				typeof right === "object" &&
				!Array.isArray(left) &&
				!Array.isArray(right)
			) {
				// Get all keys from both objects
				const lObj = left as Record<string, unknown>
				const rObj = right as Record<string, unknown>
				const allKeys = [
					...new Set([...Object.keys(lObj), ...Object.keys(rObj)]),
				]

				return allKeys.reduce<Record<string, unknown>>(
					(result, key) => {
						const leftValue = lObj[key]
						const rightValue = rObj[key]

						const value = !(key in right)
							? leftValue
							: !(key in left)
							? rightValue
							: (typeof leftValue === "object" &&
									typeof rightValue === "object" &&
									isNotNull(leftValue) &&
									isNotNull(rightValue) &&
									!Array.isArray(leftValue) &&
									!Array.isArray(rightValue))
							? mergeTwo(leftValue, rightValue, currentDepth + 1)
							: (Array.isArray(leftValue) &&
									Array.isArray(rightValue))
							? mergeTwo(leftValue, rightValue, currentDepth)
							: resolver(key, leftValue, rightValue)

						return { ...result, [key]: value }
					},
					{} as Record<string, unknown>,
				)
			}

			// For primitives and type mismatches, right wins
			return right
		}

		// Merge all sources from left to right
		return sources.reduce<Record<string, unknown>>(
			(acc, source) => mergeTwo(acc, source, 0) as Record<string, unknown>,
			{},
		)
	}

export default smartMerge
