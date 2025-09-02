import type {
	EngineError,
	Either,
	LocalValues,
	OperationFunction,
} from "../../../types/index.ts"

import { isLeft } from "../../../../types/index.ts"

interface HydratedDivide {
	tag: "Divide"
	type: "operator"
	datatype: string
	dividend: OperationFunction<number>
	divisor: OperationFunction<number>
}

const divide =
	({ dividend, divisor, ..._op }: HydratedDivide): OperationFunction<number> =>
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
					operation: "Divide",
					message: "Cannot divide by zero.",
				}],
			}
		}

		return { right: resolvedDividend.right / resolvedDivisor.right }
	}

export default divide
