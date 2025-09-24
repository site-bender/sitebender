import type {
	ComparatorConfig,
	Either,
	ArchitectError,
	LocalValues,
	OperationFunction,
} from "../../../../types/index.ts"

import { isLeft } from "../../../../../types/index.ts"
import composeComparators from "../../../composers/composeComparators/index.ts"

const ternary = (op: ComparatorConfig): OperationFunction<boolean> =>
async (
	arg: unknown,
	localValues?: LocalValues,
): Promise<Either<Array<ArchitectError>, boolean>> => {
	const condFn = await composeComparators(
		(op as unknown as { condition: unknown }).condition as never,
	)
	const falseFn = await composeComparators(
		(op as unknown as { ifFalse: unknown }).ifFalse as never,
	)
	const trueFn = await composeComparators(
		(op as unknown as { ifTrue: unknown }).ifTrue as never,
	)

	const condition = await condFn(arg, localValues)
	if (isLeft(condition)) return condition

	const ifFalse = await falseFn(arg, localValues)
	if (isLeft(ifFalse)) return ifFalse

	const ifTrue = await trueFn(arg, localValues)
	if (isLeft(ifTrue)) return ifTrue

	// Coerce branch results to boolean by truthiness; comparator contract expects boolean
	return { right: Boolean((condition.right ? ifTrue : ifFalse).right) }
}

export default ternary
