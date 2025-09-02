import type {
	EngineError,
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
	): Promise<Either<Array<EngineError>, boolean>> => {
		const operandFn = await composeComparators(op.operand as unknown as never)
		const operand = await operandFn(arg, localValues)
		const precision =
			(op as unknown as { precision?: number; decimalPlaces?: number })
				.precision ??
				(op as unknown as { precision?: number; decimalPlaces?: number })
					.decimalPlaces
		const pattern = new RegExp(
			`^([-+]?)(?:0|[1-9][0-9]*)([.][0-9]{0,${precision}})?$`,
		)

		if (isLeft(operand)) {
			return operand
		}

		const oright = (operand as { right: unknown }).right
		const ok = isNumber(oright as never) && pattern.test(String(oright))
		return ok
			? ({ right: true } as unknown as Either<Array<EngineError>, boolean>)
			: {
				left: [
					Error(op.tag)("IsPrecisionNumber")(
						`${
							String(oright)
						} is not a precision number of up to ${precision} decimal places.`,
					),
				],
			}
	}

export default isPrecisionNumber
