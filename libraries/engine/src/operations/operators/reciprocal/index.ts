import type { HydratedReciprocal } from "../../../../types/hydrated/index.ts"
import type {
	Either,
	EngineError,
	LocalValues,
	OperationFunction,
} from "../../../types/index.ts"

import { isLeft } from "../../../../types/index.ts"

const reciprocal =
	({ operand, ..._op }: HydratedReciprocal): OperationFunction<number> =>
	async (
		arg: unknown,
		localValues?: LocalValues,
	): Promise<Either<Array<EngineError>, number>> => {
		const resolvedOperand = await operand(arg, localValues)

		if (isLeft(resolvedOperand)) {
			return resolvedOperand
		}

		return { right: 1 / resolvedOperand.right }
	}

export default reciprocal
