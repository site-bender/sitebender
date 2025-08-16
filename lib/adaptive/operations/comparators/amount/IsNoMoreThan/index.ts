import type {
	AdaptiveError,
	ComparatorConfig,
	Either,
	LocalValues,
	OperationFunction,
	Value,
} from "../../../../types/index.ts"

import compare from "../../compare.ts"

const isNoMoreThan = compare((operand, test) => operand <= test)

export default isNoMoreThan
