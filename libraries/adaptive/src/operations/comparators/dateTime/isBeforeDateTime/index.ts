import type {
	AdaptiveError,
	ComparatorConfig,
	Either,
	LocalValues,
	OperationFunction,
	Value,
} from "../../../../types/index.ts"

import compare from "../../compare.ts"

const comparator = (operand, test) =>
	Temporal.PlainDateTime.compare(operand, test) < 0

const isBeforeDateTime = compare(comparator)

export default isBeforeDateTime
