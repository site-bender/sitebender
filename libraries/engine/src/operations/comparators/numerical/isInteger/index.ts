import type {
	ComparatorConfig,
	Either,
	EngineError,
	LocalValues,
	OperationFunction,
} from "../../../../types/index.ts"
import type { Value } from "../../../../types/index.ts"

import { isLeft } from "../../../../../types/index.ts"
import Error from "../../../../constructors/Error/index.ts"
import isInt from "../../../../guards/isInteger/index.ts"
import composeComparators from "../../../composers/composeComparators/index.ts"

const isInteger = (op: ComparatorConfig): OperationFunction<boolean> =>
async (
	arg: unknown,
	localValues?: LocalValues,
): Promise<Either<Array<EngineError>, boolean>> => {
	const operandFn = await composeComparators(op.operand as unknown as never)
	const operand = await operandFn(arg, localValues)

	if (isLeft(operand)) {
		return operand
	}

	return isInt(operand.right as Value) ? { right: true } : {
		left: [Error(op.tag)("IsInteger")(`${operand.right} is not an integer.`)],
	}
}

export default isInteger
