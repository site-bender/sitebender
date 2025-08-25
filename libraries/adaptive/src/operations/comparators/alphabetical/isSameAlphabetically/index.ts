import type {
	AdaptiveError,
	ComparatorConfig,
	Either,
	LocalValues,
	OperationFunction,
	Value,
} from "../../../../types/index.ts"

import Error from "../../../../constructors/Error/index.ts"
import { isLeft } from "../../../../../types/index.ts"

const isSameAlphabetically =
	({ left, right, ...op }) => async (arg, localValues) => {
		// Resolve the operands (they come as functions from composeComparators)
		const leftResult = await left(arg, localValues)
		const rightResult = await right(arg, localValues)

		// Check for errors in operand resolution
		if (isLeft(leftResult)) {
			return leftResult
		}
		if (isLeft(rightResult)) {
			return rightResult
		}

		// Compare the resolved values
		const leftValue = leftResult.right
		const rightValue = rightResult.right

		return leftValue === rightValue ? { right: leftValue } : {
			left: [
				Error(op)("IsSameAlphabetically")(
					`"${leftValue}" is not the same as "${rightValue}" alphabetically.`,
				),
			],
		}
	}

export default isSameAlphabetically
