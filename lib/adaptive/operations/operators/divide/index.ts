import type {
	AdaptiveError,
	Either,
	GlobalAttributes,
	LocalValues,
	OperationFunction,
	OperatorConfig,
} from "../../../types/index.ts"

import Error from "../../../constructors/Error/index.ts"
import { isLeft } from "../../../types/index.ts"

interface HydratedDivide {
	tag: "Divide"
	type: "operator"
	datatype: string
	dividend: OperationFunction<number>
	divisor: OperationFunction<number>
}

const divide =
	({ dividend, divisor, ...op }: HydratedDivide): OperationFunction<number> =>
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
				left: [Error(op)("Divide")("Cannot divide by zero.")],
			}
		}

		return { right: resolvedDividend.right / resolvedDivisor.right }
	}

export default divide
