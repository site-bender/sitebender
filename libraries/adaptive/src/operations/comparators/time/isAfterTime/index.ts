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
	(operand, test) => Temporal.PlainTime.compare(operand, test) > 0,
)

export default isAfterTime
