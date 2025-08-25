import type { HydratedMax } from "../../../../types/hydrated/index.ts"
import type {
	AdaptiveError,
	Either,
	GlobalAttributes,
	LocalValues,
	OperationFunction,
} from "../../../types/index.ts"

import Error from "../../../constructors/Error/index.ts"
import { isLeft } from "../../../../types/index.ts"

const max =
	({ operands, ...op }: HydratedMax): OperationFunction<number | string> =>
	async (
		arg: unknown,
		localValues?: LocalValues,
	): Promise<Either<Array<AdaptiveError>, number | string>> => {
		if (operands.length === 0) {
			return {
				left: [Error(op)("Max")("Cannot get maximum of an empty list.")],
			}
		}

		const resolvedOperands = await Promise.all(
			operands.map((operand) => operand(arg, localValues)),
		)
		const errors = resolvedOperands.filter(isLeft)

		if (errors.length) {
			return {
				left: [Error(op)("Max")("Could not resolve all operands."), ...errors],
			}
		}

		return { right: Math.max(...resolvedOperands.map((o) => o.right)) }
	}

export default max
