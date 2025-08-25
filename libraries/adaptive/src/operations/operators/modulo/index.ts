import type { HydratedModulo } from "../../../../types/hydrated/index.ts"
import type {
	AdaptiveError,
	Either,
	GlobalAttributes,
	LocalValues,
	OperationFunction,
} from "../../../types/index.ts"

import { isLeft } from "../../../../types/index.ts"
import Error from "../../../constructors/Error/index.ts"

const modulo =
	({ dividend, divisor, ...op }: HydratedModulo): OperationFunction<number> =>
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
				left: [Error(op)("Modulo")("Cannot modulo by zero.")],
			}
		}

		const remainder = Math.abs(resolvedDividend.right % resolvedDivisor.right)

		return {
			right: resolvedDivisor.right < 0 ? remainder * -1 : remainder,
		}
	}

export default modulo
