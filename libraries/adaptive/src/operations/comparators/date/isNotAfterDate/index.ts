import type {
	AdaptiveError,
	ComparatorConfig,
	Either,
	LocalValues,
	OperationFunction,
	Value,
} from "../../../../types/index.ts"

import compare from "../../compare.ts"

const isNotAfterDate = compare(
	(operand, test) => Temporal.PlainDate.compare(operand, test) <= 0,
)

export default isNotAfterDate
