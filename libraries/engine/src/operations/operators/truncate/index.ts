import type { HydratedTruncate } from "../../../../types/hydrated/index.ts"
import type {
	EngineError,
	Either,
	LocalValues,
	OperationFunction,
} from "../../../types/index.ts"

import { isLeft } from "../../../../types/index.ts"

const truncate = (
	{ decimalPlaces, operand, ..._op }: HydratedTruncate,
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
		right: Math.trunc(resolvedOperand.right * multiplier) / multiplier,
	}
}

export default truncate
