import type {
	EngineError,
	ComparatorConfig,
	Either,
	LocalValues,
	OperationFunction,
} from "../../../../types/index.ts"

import { isLeft } from "../../../../../types/index.ts"
import Error from "../../../../constructors/Error/index.ts"
import composeComparators from "../../../composers/composeComparators/index.ts"

const isAscending =
	(op: ComparatorConfig): OperationFunction<boolean> =>
	async (
		arg: unknown,
		localValues?: LocalValues,
	): Promise<Either<Array<EngineError>, boolean>> => {
		const operandFn = await composeComparators(op.operand as unknown as never)
		const operand = await operandFn(arg, localValues)

		if (isLeft(operand)) {
			return operand
		}

		const list = JSON.parse(String(operand.right)) as Array<unknown>
		const sorted = [...list].sort()

		return JSON.stringify(list) === JSON.stringify(sorted) ? { right: true } : {
			left: [
				Error(op.tag)("IsAscending")(`JSON.stringify(list) is not ascending.`),
			],
		}
	}
export default isAscending
