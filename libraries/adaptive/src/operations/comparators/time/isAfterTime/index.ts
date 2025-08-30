import type {
	AdaptiveError,
	ComparatorConfig,
	Either,
	LocalValues,
	OperationFunction,
	Value,
} from "../../../../types/index.ts"

import compare from "../../comparator/index.ts"

const isAfterTime = compare(
	(operand, test) => String(operand) > String(test),
)

export default isAfterTime
