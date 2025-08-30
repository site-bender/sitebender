import type {
	AdaptiveError,
	ComparatorConfig,
	Either,
	LocalValues,
	OperationFunction,
} from "../../../../types/index.ts"

import { isLeft } from "../../../../../types/index.ts"
import Error from "../../../../constructors/Error/index.ts"
import composeComparators from "../../../composers/composeComparators/index.ts"

const isMap = (op: ComparatorConfig): OperationFunction<boolean> =>
async (
	arg: unknown,
	localValues?: LocalValues,
): Promise<Either<Array<AdaptiveError>, boolean>> => {
	const operandFn = await composeComparators(op.operand as unknown as never)
	const operand = await operandFn(arg, localValues)

	if (isLeft(operand)) {
		return operand
	}

	try {
		new Map(operand.right as unknown as Iterable<readonly [unknown, unknown]>)

		return operand
	} catch (e) {
		return {
			left: [
				Error(op.tag)("IsMap")(
					`Error creating map from ${JSON.stringify(operand.right)}: ${e}.`,
				),
			],
		}
	}
}

export default isMap
