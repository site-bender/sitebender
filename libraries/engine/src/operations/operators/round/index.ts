import type { HydratedRound } from "../../../../types/hydrated/index.ts"
import type {
	Either,
	EngineError,
	LocalValues,
	OperationFunction,
} from "../../../types/index.ts"

import { isLeft } from "../../../../types/index.ts"

const round = (
	{ decimalPlaces, operand, ..._op }: HydratedRound,
): OperationFunction<number> =>
async (
	arg: unknown,
	localValues?: LocalValues,
): Promise<Either<Array<EngineError>, number>> => {
	const resolvedOperand = await operand(arg, localValues)

	if (isLeft(resolvedOperand)) {
		return resolvedOperand
	}

	const multiplier = Math.pow(10, decimalPlaces || 0)
	return {
		right: Math.round(resolvedOperand.right * multiplier) / multiplier,
	}
}

export default round
