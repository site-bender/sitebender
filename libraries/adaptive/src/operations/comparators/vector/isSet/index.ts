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
import { isLeft } from "../../../../types/index.ts"
import composeComparators from "../../../composers/composeComparators/index.ts"

const isSet = (op: ComparatorConfig): OperationFunction<boolean> =>
async (
	arg: unknown,
	localValues?: LocalValues,
): Promise<Either<Array<AdaptiveError>, boolean>> => {
	const operand = await composeComparators(op.operand)(arg, localValues)

	if (isLeft(operand)) {
		return operand
	}

	try {
		const set = new Set(operand.right)

		return set.size === [...operand.right].length ? operand : {
			left: [
				Error(op)("IsSet")(
					`${JSON.stringify(operand.right)} has duplicate members (not a set).`,
				),
			],
		}
	} catch (e) {
		return {
			left: [
				Error(op)("IsSet")(
					`Error creating set from ${JSON.stringify(operand.right)}: ${e}.`,
				),
			],
		}
	}
}

export default isSet
