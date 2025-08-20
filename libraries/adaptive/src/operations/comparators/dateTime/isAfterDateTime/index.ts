import type {
	AdaptiveError,
	ComparatorConfig,
	Either,
	LocalValues,
	OperationFunction,
	Value,
} from "../../../../types/index.ts"

import compare from "../../compare.ts"

const isAfterDateTime = compare(
	(operand, test) => Temporal.PlainDateTime.compare(operand, test) > 0,
)

export default isAfterDateTime
