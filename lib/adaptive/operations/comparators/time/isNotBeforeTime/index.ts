import type {
	AdaptiveError,
	ComparatorConfig,
	Either,
	LocalValues,
	OperationFunction,
	Value,
} from "../../../../types/index.ts"

import compare from "../../compare.ts"

const isNotBeforeTime = compare(
	(operand, test) => Temporal.PlainTime.compare(operand, test) >= 0,
)

export default isNotBeforeTime
