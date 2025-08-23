import type {
	AdaptiveError,
	ComparatorConfig,
	Either,
	GlobalAttributes,
	LocalValues,
	Operand,
	OperationFunction,
	Value,
} from "../../../../types/index.ts"

import Error from "../../../../constructors/Error/index.ts"
import isInt from "../../../../guards/isInteger/index.ts"
import { isLeft } from "../../../../types/index.ts"
import composeComparators from "../../../composers/composeComparators/index.ts"

const isInteger = (op: ComparatorConfig): OperationFunction<boolean> =>
async (
	arg: unknown,
	localValues?: LocalValues,
): Promise<Either<Array<AdaptiveError>, boolean>> => {
	const operand = await composeComparators(op.operand)(arg, localValues)

	if (isLeft(operand)) {
		return operand
	}

	return isInt(operand.right) ? operand : {
		left: [Error(op)("IsInteger")(`${operand.right} is not an integer.`)],
	}
}

export default isInteger
