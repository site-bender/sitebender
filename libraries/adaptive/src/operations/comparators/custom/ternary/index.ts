import type {
	AdaptiveError,
	ComparatorConfig,
	Either,
	GlobalAttributes,
	LocalValues,
	OperationFunction,
	Value,
} from "../../../../types/index.ts"

import { isLeft } from "../../../../../types/index.ts"
import composeComparators from "../../../composers/composeComparators/index.ts"

const ternary = (op: ComparatorConfig): OperationFunction<boolean> =>
async (
	arg: unknown,
	localValues?: LocalValues,
): Promise<Either<Array<AdaptiveError>, boolean>> => {
	const condition = await composeComparators(op.condition)(arg, localValues)
	const ifFalse = await composeComparators(op.ifFalse)(arg, localValues)
	const ifTrue = await composeComparators(op.ifTrue)(arg, localValues)

	if (isLeft(condition)) {
		condition.left.push(ifFalse)
		condition.left.push(ifTrue)

		return condition
	}

	if (isLeft(ifFalse)) {
		ifFalse.left.push(condition)
		ifFalse.left.push(ifTrue)

		return ifFalse
	}

	if (isLeft(ifTrue)) {
		ifTrue.left.push(ifFalse)
		ifTrue.left.push(condition)

		return ifTrue
	}

	return condition.right ? ifTrue : ifFalse
}

export default ternary
