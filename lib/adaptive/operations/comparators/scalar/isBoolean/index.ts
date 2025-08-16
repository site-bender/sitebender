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
import isBool from "../../../../guards/isBoolean/index.ts"
import { isLeft } from "../../../../types/index.ts"
import composeComparators from "../../../composers/composeComparators/index.ts"

const isBoolean = (op: ComparatorConfig): OperationFunction<boolean> =>
async (
	arg: unknown,
	localValues?: LocalValues,
): Promise<Either<Array<AdaptiveError>, boolean>> => {
	const operand = await composeComparators(op.operand)(arg, localValues)

	if (isLeft(operand)) {
		return operand
	}

	return isBool(operand.right) ? operand : {
		left: [
			Error(op)("IsBoolean")(
				`${operand.right} is not a boolean value (true/false).`,
			),
		],
	}
}

export default isBoolean
