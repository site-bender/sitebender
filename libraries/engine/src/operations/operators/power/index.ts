import type {
	Either,
	EngineError,
	LocalValues,
	OperationFunction,
} from "../../../types/index.ts"

import { isLeft } from "../../../../types/index.ts"

interface HydratedPower {
	tag: "Power"
	type: "operator"
	datatype: string
	base: OperationFunction<number>
	exponent: OperationFunction<number>
}

const power =
	({ base, exponent, ..._op }: HydratedPower): OperationFunction<number> =>
	async (
		arg: unknown,
		localValues?: LocalValues,
	): Promise<Either<Array<EngineError>, number>> => {
		const resolvedBase = await base(arg, localValues)
		if (isLeft(resolvedBase)) return resolvedBase

		const resolvedExponent = await exponent(arg, localValues)
		if (isLeft(resolvedExponent)) return resolvedExponent

		return { right: Math.pow(resolvedBase.right, resolvedExponent.right) }
	}

export default power
