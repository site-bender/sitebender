// Use native Set; avoid external polyfills

import type {
	AdaptiveError,
	ComparatorConfig,
	Either,
	LocalValues,
	OperationFunction,
	Value,
} from "../../../../types/index.ts"

import { isLeft } from "../../../../../types/index.ts"
import Error from "../../../../constructors/Error/index.ts"
import composeComparators from "../../../composers/composeComparators/index.ts"

const IsSubset = (op) => async (arg, localValues) => {
	const operand = await composeComparators(op.operand)(arg, localValues)
	const test = await composeComparators(op.test)(arg, localValues)

	if (isLeft(operand)) {
		operand.left.push(test)
		return operand
	}

	if (isLeft(test)) {
		return { left: [operand, ...test.left] }
	}

	try {
		const left = new Set(operand.right as Iterable<unknown>)
		const right = new Set(test.right as Iterable<unknown>)

		const subset = Array.from(left.values()).every((v) => right.has(v))

		return subset ? operand : {
			left: [
				Error(op)("IsSubset")(
					`${JSON.stringify(operand.right)} is not a subset of ${
						JSON.stringify(test.right)
					}`,
				),
			],
		}
	} catch (e) {
		return {
			left: [Error(op)("IsSubset")(`Error creating sets: ${e}`)],
		}
	}
}

export default IsSubset
