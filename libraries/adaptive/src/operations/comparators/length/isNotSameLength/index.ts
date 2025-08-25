import type {
	AdaptiveError,
	ComparatorConfig,
	Either,
	LocalValues,
	OperationFunction,
	Value,
} from "../../../../types/index.ts"

import compare from "../../comparator/index.ts"

const isNotSameLength = compare(
	(operand, test) => operand.length !== test.length,
)

export default isNotSameLength
