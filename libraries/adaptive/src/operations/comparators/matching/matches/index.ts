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

import Error from "../../../../constructors/Error/index.ts"
import { isLeft } from "../../../../../types/index.ts"
import composeComparators from "../../../composers/composeComparators/index.ts"

const matches = (op: ComparatorConfig): OperationFunction<boolean> =>
async (
	arg: unknown,
	localValues?: LocalValues,
): Promise<Either<Array<AdaptiveError>, boolean>> => {
	const operand = await composeComparators(op.operand)(arg, localValues)

	if (isLeft(operand)) {
		return operand
	}

	try {
		const pattern = new RegExp(op.pattern, op.flags)

		return pattern.test(operand.right) ? { right: true } : {
			left: [
				Error(op)("Matches")(`${operand.right} does not match ${pattern}.`),
			],
		}
	} catch (e) {
		return { left: Error(op)("Matches")(`Bad regular expression: ${e}.`) }
	}
}

export default matches
