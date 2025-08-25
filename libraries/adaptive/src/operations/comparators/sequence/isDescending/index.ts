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

import { isLeft } from "../../../../../types/index.ts"
import Error from "../../../../constructors/Error/index.ts"
import composeComparators from "../../../composers/composeComparators/index.ts"

const isDescending =
	(op: ComparatorConfig): OperationFunction<boolean> =>
	async (
		arg: unknown,
		localValues?: LocalValues,
	): Promise<Either<Array<AdaptiveError>, boolean>> => {
		const operand = await composeComparators(op.operand)(arg, localValues)

		if (isLeft(operand)) {
			return operand
		}

		const list = operand.right
		const sorted = [...list].sort().reverse()

		return JSON.stringify(list) === JSON.stringify(sorted) ? operand : {
			left: [
				Error(op)("IsDescending")(`JSON.stringify(list) is not descending.`),
			],
		}
	}

export default isDescending
