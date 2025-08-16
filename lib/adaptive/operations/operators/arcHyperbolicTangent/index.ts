import type { HydratedArcHyperbolicTangent } from "../../../types/hydrated/index.ts"
import type {
	AdaptiveError,
	Either,
	GlobalAttributes,
	LocalValues,
	OperationFunction,
} from "../../../types/index.ts"

import { isLeft } from "../../../types/index.ts"

const arcHyperbolicTangent = (
	{ operand, ...op }: HydratedArcHyperbolicTangent,
): OperationFunction<number> =>
async (
	arg: unknown,
	localValues?: LocalValues,
): Promise<Either<Array<AdaptiveError>, number>> => {
	const resolvedOperand = await operand(arg, localValues)

	if (isLeft(resolvedOperand)) {
		return resolvedOperand
	}

	return { right: Math.atanh(resolvedOperand.right) }
}

export default arcHyperbolicTangent
