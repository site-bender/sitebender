import type {
	EngineError,
	Either,
	LocalValues,
	OperationFunction,
} from "../../../types/index.ts"

import { isLeft } from "../../../../types/index.ts"
import { MULTIPLICATION_IDENTITY } from "../../../constructors/constants/index.ts"
import Error from "../../../constructors/Error/index.ts"

interface HydratedMultiply {
	tag: "Multiply"
	type: "operator"
	datatype: string
	multipliers: Array<OperationFunction<number>>
}

const multiply =
	({ multipliers, ..._op }: HydratedMultiply): OperationFunction<number> =>
	async (
		arg: unknown,
		localValues?: LocalValues,
	): Promise<Either<Array<EngineError>, number>> => {
		const resolvedMultipliers = await Promise.all(
			multipliers.map((multiplier) => multiplier(arg, localValues)),
		)
		const errors = resolvedMultipliers.filter(isLeft)

		if (errors.length) {
			return {
				left: [
					Error("Multiply")("Multiply")("Could not resolve all multipliers."),
					...errors.flatMap((e) => e.left),
				],
			}
		}

		const total = resolvedMultipliers.reduce(
			(acc, result) => acc * (result as { right: number }).right,
			MULTIPLICATION_IDENTITY,
		)

		return { right: total }
	}

export default multiply
