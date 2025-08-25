import type {
	AdaptiveError,
	ComparatorConfig,
	Either,
	LocalValues,
	OperationFunction,
	Value,
} from "../../../../types/index.ts"

import compare from "../../comparator/index.ts"

const isNotSameDate = compare(
	(operand, test) => Temporal.PlainDate.compare(operand, test) !== 0,
)

export default isNotSameDate
