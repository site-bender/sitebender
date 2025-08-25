import type { HydratedRemainder } from "../../../../types/hydrated/index.ts"
import type {
	AdaptiveError,
	Either,
	GlobalAttributes,
	LocalValues,
	OperationFunction,
} from "../../../types/index.ts"

import Error from "../../../constructors/Error/index.ts"
import { isLeft } from "../../../../types/index.ts"

const remainder = (
	{ dividend, divisor, ...op }: HydratedRemainder,
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
			left: [Error(op)("Remainder")("Cannot divide by zero.")],
		}
	}

	return { right: resolvedDividend.right % resolvedDivisor.right }
}

export default remainder
