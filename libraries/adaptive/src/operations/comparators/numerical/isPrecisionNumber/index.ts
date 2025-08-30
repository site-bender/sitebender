import type {
	AdaptiveError,
	ComparatorConfig,
	Either,
	LocalValues,
	OperationFunction,
} from "../../../../types/index.ts"

import { isLeft } from "../../../../../types/index.ts"
import Error from "../../../../constructors/Error/index.ts"
import isNumber from "../../../../guards/isNumber/index.ts"
import composeComparators from "../../../composers/composeComparators/index.ts"

const isPrecisionNumber =
	(op: ComparatorConfig): OperationFunction<boolean> =>
	async (
		arg: unknown,
		localValues?: LocalValues,
	): Promise<Either<Array<AdaptiveError>, boolean>> => {
		const operandFn = await composeComparators(op.operand as unknown as never)
		const operand = await operandFn(arg, localValues)
		const precision = (op as any).precision ?? (op as any).decimalPlaces
		const pattern = new RegExp(
			`^([-+]?)(?:0|[1-9][0-9]*)([.][0-9]{0,${precision}})?$`,
		)

		if (isLeft(operand)) {
			return operand
		}

		return isNumber(operand.right) && pattern.test(String(operand.right))
			? operand
			: {
				left: [
					Error(op.tag)("IsPrecisionNumber")(
						`${operand.right} is not a precision number of up to ${precision} decimal places.`,
					),
				],
			}
	}

export default isPrecisionNumber
