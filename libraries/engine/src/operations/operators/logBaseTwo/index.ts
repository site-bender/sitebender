import type { HydratedLogBaseTwo } from "../../../../types/hydrated/index.ts"
import type {
	AdaptiveError,
	Either,
	LocalValues,
	OperationFunction,
} from "../../../types/index.ts"

import { isLeft } from "../../../../types/index.ts"

const logBaseTwo =
	({ operand, ..._op }: HydratedLogBaseTwo): OperationFunction<number> =>
	async (
		arg: unknown,
		localValues?: LocalValues,
	): Promise<Either<Array<AdaptiveError>, number>> => {
		const resolvedOperand = await operand(arg, localValues)

		if (isLeft(resolvedOperand)) {
			return resolvedOperand
		}

		return { right: Math.log2(resolvedOperand.right) }
	}

export default logBaseTwo
