import type { HydratedArcHyperbolicSine } from "../../../../types/hydrated/index.ts"
import type {
	Either,
	ArchitectError,
	LocalValues,
	OperationFunction,
} from "../../../types/index.ts"

import { isLeft } from "../../../../types/index.ts"

const arcHyperbolicSine = (
	{ operand, ..._op }: HydratedArcHyperbolicSine,
): OperationFunction<number> =>
async (
	arg: unknown,
	localValues?: LocalValues,
): Promise<Either<Array<ArchitectError>, number>> => {
	const resolvedOperand = await operand(arg, localValues)

	if (isLeft(resolvedOperand)) {
		return resolvedOperand
	}

	return { right: Math.asinh(resolvedOperand.right) }
}

export default arcHyperbolicSine
