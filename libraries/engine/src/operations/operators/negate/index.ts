import type {
	AdaptiveError,
	Either,
	LocalValues,
	OperationFunction,
} from "../../../types/index.ts"

import { isLeft } from "../../../../types/index.ts"

interface HydratedNegate {
	tag: "Negate"
	type: "operator"
	datatype: string
	operand: OperationFunction<number>
}

const negate =
	({ operand, ..._op }: HydratedNegate): OperationFunction<number> =>
	async (
		arg: unknown,
		localValues?: LocalValues,
	): Promise<Either<Array<AdaptiveError>, number>> => {
		const resolvedOperand = await operand(arg, localValues)

		if (isLeft(resolvedOperand)) {
			return resolvedOperand
		}

		return { right: resolvedOperand.right * -1 }
	}

export default negate
