import type { HydratedModulo } from "../../../../types/hydrated/index.ts"
import type {
	Either,
	EngineError,
	LocalValues,
	OperationFunction,
} from "../../../types/index.ts"

import { isLeft } from "../../../../types/index.ts"
import _Error from "../../../constructors/Error/index.ts"

const modulo = (
	{ dividend, divisor, ..._op }: HydratedModulo,
): OperationFunction<number> =>
async (
	arg: unknown,
	localValues?: LocalValues,
): Promise<Either<Array<EngineError>, number>> => {
	const resolvedDividend = await dividend(arg, localValues)
	if (isLeft(resolvedDividend)) return resolvedDividend

	const resolvedDivisor = await divisor(arg, localValues)
	if (isLeft(resolvedDivisor)) return resolvedDivisor

	if (resolvedDivisor.right === 0) {
		return {
			left: [{
				tag: "Error",
				operation: "Modulo",
				message: "Cannot modulo by zero.",
			}],
		}
	}

	const remainder = Math.abs(
		resolvedDividend.right % resolvedDivisor.right,
	)

	return {
		right: resolvedDivisor.right < 0 ? remainder * -1 : remainder,
	}
}

export default modulo
