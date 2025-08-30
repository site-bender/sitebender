import type { AdaptiveError, ComparatorConfig, Either, LocalValues, OperationFunction } from "@adaptiveTypes/index.ts"
import { isLeft } from "@adaptiveTypes/index.ts"
import Error from "../../../../constructors/Error/index.ts"
import composeComparators from "../../../composers/composeComparators/index.ts"

const isPlainDateTime =
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
			const YMDTHMS = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?$/
			return YMDTHMS.test(s)
				? { right: true }
				: { left: [Error(op.tag)("IsPlainDateTime")(`${JSON.stringify(operand.right)} is not a plain date-time.`)] }
		} catch (e) {
			return { left: [Error(op.tag)("IsPlainDateTime")(`${JSON.stringify(operand.right)} is not a plain date-time: ${e}.`)] }
		}
	}

export default isPlainDateTime
