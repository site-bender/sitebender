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

const isPlainDate =
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
			const YMD = /^\d{4}-\d{2}-\d{2}$/
			return YMD.test(s) ? { right: true } : {
				left: [
					Error(op.tag)("IsPlainDate")(
						`${JSON.stringify(operand.right)} is not a plain date.`,
					),
				],
			}
		} catch (e) {
			return {
				left: [
					Error(op.tag)("IsPlainDate")(
						`${
							JSON.stringify(operand.right)
						} is not a plain date: ${e}.`,
					),
				],
			}
		}
	}

export default isPlainDate
