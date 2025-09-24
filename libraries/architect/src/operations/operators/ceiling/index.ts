import type { HydratedCeiling } from "../../../../types/hydrated/index.ts"
import type {
	Either,
	ArchitectError,
	LocalValues,
	OperationFunction,
} from "../../../types/index.ts"

import { isLeft } from "../../../../types/index.ts"

const ceiling = (
	{ decimalPlaces, operand, ..._op }: HydratedCeiling,
): OperationFunction<number> =>
async (
	arg: unknown,
	localValues?: LocalValues,
): Promise<Either<Array<ArchitectError>, number>> => {
	const resolvedOperand = await operand(arg, localValues)

	if (isLeft(resolvedOperand)) {
		return resolvedOperand
	}

	const multiplier = Math.pow(10, Math.max(0, decimalPlaces))

	return { right: Math.ceil(resolvedOperand.right * multiplier) / multiplier }
}

export default ceiling
