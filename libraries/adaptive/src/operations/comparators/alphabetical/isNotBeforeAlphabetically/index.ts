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
import Error from "../../../../constructors/Error/index.ts"
import getOperands from "../../../../utilities/getOperands/index.ts"

const isNotBeforeAlphabetically =
	(op: ComparatorConfig): OperationFunction<boolean> =>
	async (
		arg: unknown,
		localValues?: LocalValues,
	): Promise<Either<Array<AdaptiveError>, boolean>> => {
		const ops = await getOperands(op)(arg, localValues)

		if (isLeft(ops)) {
			return ops
		}

		const [operand, test] = ops

		return operand === test || [operand, test].sort()[1] === operand
			? { right: operand }
			: {
				left: [
					Error(op)("IsNotBeforeAlphabetically")(
						`${operand} is not after or equal to ${test} alphabetically.`,
					),
				],
			}
	}

export default isNotBeforeAlphabetically
