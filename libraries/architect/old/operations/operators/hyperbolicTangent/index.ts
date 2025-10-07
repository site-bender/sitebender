import type { HydratedHyperbolicTangent } from "../../../../types/hydrated/index.ts"
import type {
	ArchitectError,
	Either,
	LocalValues,
	OperationFunction,
} from "../../../types/index.ts"

import { isLeft } from "../../../../types/index.ts"

const hyperbolicTangent = (
	{ operand, ..._op }: HydratedHyperbolicTangent,
): OperationFunction<number> =>
async (
	arg: unknown,
	localValues?: LocalValues,
): Promise<Either<Array<ArchitectError>, number>> => {
	const resolvedOperand = await operand(arg, localValues)

	if (isLeft(resolvedOperand)) {
		return resolvedOperand
	}

	return { right: Math.tanh(resolvedOperand.right) }
}

export default hyperbolicTangent
