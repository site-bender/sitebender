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

import { isLeft } from "../../../../../types/index.ts"
import Error from "../../../../constructors/Error/index.ts"
import isNum from "../../../../guards/isNumber/index.ts"
import composeComparators from "../../../composers/composeComparators/index.ts"

const isNumber = (op: ComparatorConfig): OperationFunction<boolean> =>
async (
	arg: unknown,
	localValues?: LocalValues,
): Promise<Either<Array<AdaptiveError>, boolean>> => {
	const operand = await composeComparators(op.operand)(arg, localValues)

	if (isLeft(operand)) {
		return operand
	}

	return isNum(operand.right) ? operand : {
		left: [Error(op)("IsNumber")(`${operand.right} is not a number.`)],
	}
}

export default isNumber
