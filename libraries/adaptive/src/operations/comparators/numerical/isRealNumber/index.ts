import type {
	AdaptiveError,
	ComparatorConfig,
	Either,
	LocalValues,
	OperationFunction,
} from "../../../../types/index.ts"
import type { Value } from "../../../../types/index.ts"

import { isLeft } from "../../../../../types/index.ts"
import Error from "../../../../constructors/Error/index.ts"
import isNumber from "../../../../guards/isNumber/index.ts"
import composeComparators from "../../../composers/composeComparators/index.ts"

const isRealNumber =
	(op: ComparatorConfig): OperationFunction<boolean> =>
	async (
		arg: unknown,
		localValues?: LocalValues,
	): Promise<Either<Array<AdaptiveError>, boolean>> => {
		const operandFn = await composeComparators(op.operand as unknown as never)
		const operand = await operandFn(arg, localValues)

		if (isLeft(operand)) {
			return operand
		}

		return isNumber(operand.right as Value) ? { right: true } : {
			left: [
				Error(op.tag)("IsRealNumber")(`${operand.right} is not a real number.`),
			],
		}
	}

export default isRealNumber
