import type { AdaptiveError, ComparatorConfig, Either, LocalValues, OperationFunction } from "@adaptiveTypes/index.ts"
import { isLeft } from "@adaptiveTypes/index.ts"
import Error from "../../../../constructors/Error/index.ts"
import composeComparators from "../../../composers/composeComparators/index.ts"

const isPlainTime =
	(op: ComparatorConfig): OperationFunction<boolean> =>
	async (
		arg: unknown,
		localValues?: LocalValues,
	): Promise<Either<Array<AdaptiveError>, boolean>> => {
		const operandFn = await composeComparators((op as unknown as { operand: unknown }).operand as never)
		const operand = await operandFn(arg, localValues)

		if (isLeft(operand)) return operand

		try {
			const s = String(operand.right)
			const HMS = /^\d{2}:\d{2}:\d{2}(?:\.\d+)?$/
			return HMS.test(s) ? { right: true } : { left: [Error(op.tag)("IsPlainTime")(`${JSON.stringify(operand.right)} is not a plain time.`)] }
		} catch (e) {
			return { left: [Error(op.tag)("IsPlainTime")(`${JSON.stringify(operand.right)} is not a plain time: ${e}.`)] }
		}
	}

export default isPlainTime
