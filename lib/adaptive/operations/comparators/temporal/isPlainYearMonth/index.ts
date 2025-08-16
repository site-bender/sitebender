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
import { isLeft } from "../../../../types/index.ts"
import composeComparators from "../../../composers/composeComparators/index.ts"

const isPlainYearMonth =
	(op: ComparatorConfig): OperationFunction<boolean> =>
	async (
		arg: unknown,
		localValues?: LocalValues,
	): Promise<Either<Array<AdaptiveError>, boolean>> => {
		const operand = await composeComparators(op.operand)(arg, localValues)

		if (isLeft(operand)) {
			return operand
		}

		try {
			const _ = Temporal.PlainYearMonth.from(operand.right)
			return operand
		} catch (e) {
			return {
				left: [
					Error(op)("IsPlainYearMonth")(
						`${operand.right} is not a plain year-month: ${e}.`,
					),
				],
			}
		}
	}

export default isPlainYearMonth
