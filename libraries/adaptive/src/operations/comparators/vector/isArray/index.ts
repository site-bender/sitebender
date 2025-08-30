import type {
	AdaptiveError,
	ComparatorConfig,
	Either,
	LocalValues,
	OperationFunction,
} from "../../../../types/index.ts"

import { isLeft } from "../../../../../types/index.ts"
import Error from "../../../../constructors/Error/index.ts"
import composeComparators from "../../../composers/composeComparators/index.ts"

const isArray = (op: ComparatorConfig): OperationFunction<boolean> =>
async (
	arg: unknown,
	localValues?: LocalValues,
): Promise<Either<Array<AdaptiveError>, boolean>> => {
	const operandFn = await composeComparators(op.operand as unknown as never)
	const operand = await operandFn(arg, localValues)

	if (isLeft(operand)) {
		return operand
	}

	return Array.isArray(operand.right) ? operand : {
		left: [
			Error(op.tag)("IsArray")(
				`${JSON.stringify(operand.right)} is not an array.`,
			),
		],
	}
}

export default isArray
