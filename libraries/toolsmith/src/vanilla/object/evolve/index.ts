import type { Value } from "../../../types/index.ts"
import type {
	Transformation,
	TransformationSpec,
} from "../../../types/object/index.ts"

import isNotNullish from "../../validation/isNotNullish/index.ts"
import isNotUndefined from "../../validation/isNotUndefined/index.ts"
import isNullish from "../../validation/isNullish/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
const evolve = <T extends Record<string | symbol, Value>>(
	transformations: Record<string | symbol, TransformationSpec>,
) =>
(obj: T | null | undefined): T => {
	if (isNullish(obj) || typeof obj !== "object") {
		return {} as T
	}

	const evolveRecursive = (
		trans: TransformationSpec,
		target: Value | Record<string | symbol, Value> | Array<Value>,
	): Value | Record<string | symbol, Value> | Array<Value> => {
		// If target is not an object, return it unchanged
		if (isNullish(target) || typeof target !== "object") {
			return target
		}

		// If transformations is not an object, return target unchanged
		if (isNullish(trans) || typeof trans !== "object") {
			return target
		}

		// Handle arrays
		if (Array.isArray(target)) {
			return (target as Array<Value>).map((item, index) => {
				const transformation =
					(trans as Record<number, TransformationSpec>)[index]
				if (typeof transformation === "function") {
					return transformation(item)
				} else if (typeof transformation === "object") {
					return evolveRecursive(transformation, item)
				}
				return item
			})
		}

		// Handle objects - combine all keys
		const allKeys = [
			...Object.keys(target as Record<string, unknown>),
			...Object.keys(trans as Record<string, unknown>),
			...Object.getOwnPropertySymbols(target as object),
			...Object.getOwnPropertySymbols(trans as object),
		]

		// Use reduce to build the result object
		return allKeys.reduce((acc, key) => {
			const isSymbol = typeof key === "symbol"
			const targetValue = isSymbol
				? (target as Record<string | symbol, Value>)[key]
				: (target as Record<string, Value>)[key as string]
			const transformation = isSymbol
				? (trans as Record<string | symbol, TransformationSpec>)[key]
				: (trans as Record<string, TransformationSpec>)[key as string]

			// Determine the value for this key
			const newValue = (() => {
				if (
					typeof transformation === "function" &&
					isNotUndefined(targetValue)
				) {
					return (transformation as Transformation)(targetValue)
				} else if (
					isNotNullish(transformation) &&
					typeof transformation === "object"
				) {
					return evolveRecursive(transformation, targetValue || {})
				} else if (isNotUndefined(targetValue)) {
					return targetValue
				}
				return undefined
			})()

			// Only add to result if value is defined
			if (isNotUndefined(newValue)) {
				return {
					...acc,
					[key]: newValue as Value,
				}
			}
			return acc
		}, {} as Record<string | symbol, Value>)
	}

	return evolveRecursive(transformations, obj) as T
}

export default evolve
