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
import { isLeft } from "../../../../types/index.ts"
import composeComparators from "../../../composers/composeComparators/index.ts"

const isPrecisionNumber =
	(op: ComparatorConfig): OperationFunction<boolean> =>
	async (
		arg: unknown,
		localValues?: LocalValues,
	): Promise<Either<Array<AdaptiveError>, boolean>> => {
		const operand = await composeComparators(op.operand)(arg, localValues)
		const { decimalPlaces } = op
		const pattern = new RegExp(
			`^([-+]?)(?:0|[1-9][0-9]*)([.][0-9]{0,${decimalPlaces}})?$`,
		)

		if (isLeft(operand)) {
			return operand
		}

		return isNumber(operand.right) && pattern.test(String(operand.right))
			? operand
			: {
				left: [
					Error(op)("IsPrecisionNumber")(
						`${operand.right} is not a precision number of up to ${decimalPlaces} decimal places.`,
					),
				],
			}
	}

export default isPrecisionNumber
