import type {
	ComparatorConfig,
	Either,
	EngineError,
	LocalValues,
	OperationFunction,
} from "@sitebender/engine-types/index.ts"

import { isLeft } from "@sitebender/engine-types/index.ts"

import Error from "../../../../constructors/Error/index.ts"
import composeComparators from "../../../composers/composeComparators/index.ts"

const isPlainYearMonth =
	(op: ComparatorConfig): OperationFunction<boolean> =>
	async (
		arg: unknown,
		localValues?: LocalValues,
	): Promise<Either<Array<EngineError>, boolean>> => {
		const operandFn = await composeComparators(
			(op as unknown as { operand: unknown }).operand as never,
		)
		const operand = await operandFn(arg, localValues)

		if (isLeft(operand)) return operand

		try {
			const s = String(operand.right)
			const YM = /^\d{4}-(0[1-9]|1[0-2])$/
			return YM.test(s) ? { right: true } : {
				left: [
					Error(op.tag)("IsPlainYearMonth")(
						`${JSON.stringify(operand.right)} is not a plain year-month.`,
					),
				],
			}
		} catch (e) {
			return {
				left: [
					Error(op.tag)("IsPlainYearMonth")(
						`${JSON.stringify(operand.right)} is not a plain year-month: ${e}.`,
					),
				],
			}
		}
	}

export default isPlainYearMonth
