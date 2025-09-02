import type { HydratedCosine } from "../../../../types/hydrated/index.ts"
import type {
	EngineError,
	Either,
	LocalValues,
	OperationFunction,
} from "../../../types/index.ts"

import { isLeft } from "../../../../types/index.ts"

const cosine =
	({ operand, ..._op }: HydratedCosine): OperationFunction<number> =>
	async (
		arg: unknown,
		localValues?: LocalValues,
	): Promise<Either<Array<EngineError>, number>> => {
		const resolvedOperand = await operand(arg, localValues)

		if (isLeft(resolvedOperand)) {
			return resolvedOperand
		}

		return { right: Math.cos(resolvedOperand.right) }
	}

export default cosine
