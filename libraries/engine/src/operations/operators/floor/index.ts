import type { HydratedFloor } from "../../../../types/hydrated/index.ts"
import type {
	EngineError,
	Either,
	LocalValues,
	OperationFunction,
} from "../../../types/index.ts"

import { isLeft } from "../../../../types/index.ts"

const floor = (
	{ decimalPlaces, operand, ..._op }: HydratedFloor,
): OperationFunction<number> =>
async (
	arg: unknown,
	localValues?: LocalValues,
): Promise<Either<Array<EngineError>, number>> => {
	const resolvedOperand = await operand(arg, localValues)

	if (isLeft(resolvedOperand)) {
		return resolvedOperand
	}

	const multiplier = Math.pow(10, Math.max(0, decimalPlaces))

	return {
		right: Math.floor(resolvedOperand.right * multiplier) / multiplier,
	}
}

export default floor
