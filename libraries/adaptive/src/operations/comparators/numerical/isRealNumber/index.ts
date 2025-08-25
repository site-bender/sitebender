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
import isNumber from "../../../../guards/isNumber/index.ts"
import { isLeft } from "../../../../../types/index.ts"
import composeComparators from "../../../composers/composeComparators/index.ts"

const isRealNumber =
	(op: ComparatorConfig): OperationFunction<boolean> =>
	async (
		arg: unknown,
		localValues?: LocalValues,
	): Promise<Either<Array<AdaptiveError>, boolean>> => {
		const operand = await composeComparators(op.operand)(arg, localValues)

		if (isLeft(operand)) {
			return operand
		}

		return isNumber(operand.right) ? operand : {
			left: [
				Error(op)("IsRealNumber")(`${operand.right} is not a real number.`),
			],
		}
	}

export default isRealNumber
