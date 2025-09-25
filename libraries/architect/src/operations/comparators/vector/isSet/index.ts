import type {
	ArchitectError,
	ComparatorConfig,
	Either,
	LocalValues,
	OperationFunction,
} from "../../../../types/index.ts"

import { isLeft } from "../../../../../types/index.ts"
import Error from "../../../../constructors/Error/index.ts"
import composeComparators from "../../../composers/composeComparators/index.ts"

const isSet = (op: ComparatorConfig): OperationFunction<boolean> =>
async (
	arg: unknown,
	localValues?: LocalValues,
): Promise<Either<Array<ArchitectError>, boolean>> => {
	const operandFn = await composeComparators(op.operand as unknown as never)
	const operand = await operandFn(arg, localValues)

	if (isLeft(operand)) {
		return operand
	}

	try {
		const set = new Set(operand.right as unknown as Iterable<unknown>)

		return set.size ===
				[...(operand.right as unknown as Iterable<unknown>)].length
			? { right: true }
			: {
				left: [
					Error(op.tag)("IsSet")(
						`${
							JSON.stringify(operand.right)
						} has duplicate members (not a set).`,
					),
				],
			}
	} catch (e) {
		return {
			left: [
				Error(op.tag)("IsSet")(
					`Error creating set from ${JSON.stringify(operand.right)}: ${e}.`,
				),
			],
		}
	}
}

export default isSet
