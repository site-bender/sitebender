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
import isNum from "../../../../guards/isNumber/index.ts"
import composeComparators from "../../../composers/composeComparators/index.ts"

const isNumber = (op: ComparatorConfig): OperationFunction<boolean> =>
async (
	arg: unknown,
	localValues?: LocalValues,
): Promise<Either<Array<EngineError>, boolean>> => {
	const operandFn = await composeComparators(op.operand as unknown as never)
	const operand = await operandFn(arg, localValues)

	if (isLeft(operand)) {
		return operand
	}

	return isNum(operand.right as Value)
		? { right: true }
		: { left: [Error(op.tag)("IsNumber")(`${operand.right} is not a number.`)] }
}

export default isNumber
