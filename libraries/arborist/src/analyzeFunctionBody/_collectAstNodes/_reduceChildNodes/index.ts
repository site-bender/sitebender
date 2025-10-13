//++ Reduces child nodes by accumulating AST nodes from object properties
import reduce from "@sitebender/toolsmith/array/reduce/index.ts"
import getOrElse from "@sitebender/toolsmith/monads/result/getOrElse/index.ts"
import isEqual from "@sitebender/toolsmith/validation/isEqual/index.ts"
import and from "@sitebender/toolsmith/logic/and/index.ts"
import _collectAstNodes from "../index.ts"
import _reduceArrayValues from "../_reduceArrayValues/index.ts"

export default function _reduceChildNodes(accumulator: ReadonlyArray<unknown>) {
	return function _reduceChildNodesWithAccumulator(value: unknown): ReadonlyArray<unknown> {
		if (Array.isArray(value)) {
			const arrayResult = reduce(_reduceArrayValues)(accumulator)(value)
			return getOrElse([] as ReadonlyArray<unknown>)(arrayResult)
		} else if (and(isEqual(typeof value)("object"))(value !== null)) {
			return [...accumulator, ..._collectAstNodes(value)]
		}
		return accumulator
	}
}
