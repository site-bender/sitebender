import type { HydratedRemainder } from "../../../../types/hydrated/index.ts"
import type {
	AdaptiveError,
	Either,
	LocalValues,
	OperationFunction,
} from "../../../types/index.ts"

import { isLeft } from "../../../../types/index.ts"
import _Error from "../../../constructors/Error/index.ts"

const remainder = (
	{ dividend, divisor, ..._op }: HydratedRemainder,
): OperationFunction<number> =>
async (
	arg: unknown,
	localValues?: LocalValues,
): Promise<Either<Array<AdaptiveError>, number>> => {
	const resolvedDividend = await dividend(arg, localValues)
	if (isLeft(resolvedDividend)) return resolvedDividend

	const resolvedDivisor = await divisor(arg, localValues)
	if (isLeft(resolvedDivisor)) return resolvedDivisor

	if (resolvedDivisor.right === 0) {
		return {
			left: [{ tag: "Error", operation: "Remainder", message: "Cannot divide by zero." }],
		}
	}

	return { right: resolvedDividend.right % resolvedDivisor.right }
}

export default remainder
