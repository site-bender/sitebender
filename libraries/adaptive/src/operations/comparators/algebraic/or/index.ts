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

import { isRight } from "../../../../../types/index.ts"
import concat from "../../../../utilities/array/concat/index.ts"
import composeComparators from "../../../composers/composeComparators/index.ts"

const or = (op: ComparatorConfig): OperationFunction<boolean> =>
async (
	arg: unknown,
	localValues?: LocalValues,
): Promise<Either<Array<AdaptiveError>, boolean>> => {
	const results = await Promise.all(
		op.operands.map(
			async (operand) => await composeComparators(operand)(arg, localValues),
		),
	)

	const rights = results.filter(isRight)

	if (rights.length) {
		return rights[0]
	}

	return results.reduce(
		(out, left) => ({ left: concat(out.left)(left.left) }),
		{ left: [] },
	)
}

export default or
