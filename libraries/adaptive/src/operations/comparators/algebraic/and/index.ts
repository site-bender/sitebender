import type {
	AdaptiveError,
	ComparatorConfig,
	Either,
	GlobalAttributes,
	LocalValues,
	Operand,
	OperationFunction,
} from "../../../../types/index.ts"

import { isLeft } from "../../../../types/index.ts"
import composeComparators from "../../../composers/composeComparators/index.ts"

const and = (op: ComparatorConfig): OperationFunction<boolean> =>
async (
	arg: unknown,
	localValues?: LocalValues,
): Promise<Either<Array<AdaptiveError>, boolean>> => {
	return await op.operands.reduce(async (out, val) => {
		const operand = await composeComparators(val)(arg, localValues)

		let ret = await out

		if (isLeft(ret)) {
			ret.left.push(operand)

			return ret
		}

		if (isLeft(operand)) {
			ret = { left: [ret, ...operand.left] }

			return ret
		}

		return operand
	}, {})
}

export default and
