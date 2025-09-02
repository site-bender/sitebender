import type {
	AdaptiveError,
	ComparatorConfig,
	Either,
	LocalValues,
	OperationFunction,
} from "@adaptiveTypes/index.ts"

import { isLeft } from "@adaptiveTypes/index.ts"

import Error from "../../../../constructors/Error/index.ts"
import composeComparators from "../../../composers/composeComparators/index.ts"

const isPlainMonthDay =
	(op: ComparatorConfig): OperationFunction<boolean> =>
	async (
		arg: unknown,
		localValues?: LocalValues,
	): Promise<Either<Array<AdaptiveError>, boolean>> => {
		const operandFn = await composeComparators(
			(op as unknown as { operand: unknown }).operand as never,
		)
		const operand = await operandFn(arg, localValues)

		if (isLeft(operand)) return operand

		try {
			const s = String(operand.right)
			const MD = /^(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/
			return MD.test(s) ? { right: true } : {
				left: [
					Error(op.tag)("IsPlainMonthDay")(
						`${JSON.stringify(operand.right)} is not a plain month-day.`,
					),
				],
			}
		} catch (e) {
			return {
				left: [
					Error(op.tag)("IsPlainMonthDay")(
						`${JSON.stringify(operand.right)} is not a plain month-day: ${e}`,
					),
				],
			}
		}
	}

export default isPlainMonthDay
