import type {
	ComparatorConfig,
	Either,
	EngineError,
	LocalValues,
	OperationFunction,
} from "../../../../types/index.ts"

import { isLeft } from "../../../../../types/index.ts"
import Error from "../../../../constructors/Error/index.ts"
import composeComparators from "../../../composers/composeComparators/index.ts"

const isDescending =
	(op: ComparatorConfig): OperationFunction<boolean> =>
	async (
		arg: unknown,
		localValues?: LocalValues,
	): Promise<Either<Array<EngineError>, boolean>> => {
		const operandFn = await composeComparators(
			op.operand as unknown as never,
		)
		const operand = await operandFn(arg, localValues)

		if (isLeft(operand)) {
			return operand
		}

		const list = JSON.parse(String(operand.right)) as Array<unknown>
		const sorted = [...list].sort().reverse()

		return JSON.stringify(list) === JSON.stringify(sorted)
			? { right: true }
			: {
				left: [
					Error(op.tag)("IsDescending")(
						`JSON.stringify(list) is not descending.`,
					),
				],
			}
	}

export default isDescending
