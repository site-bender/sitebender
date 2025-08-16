import type {
	AdaptiveError,
	Either,
	GlobalAttributes,
	LocalValues,
	OperationFunction,
	OperatorConfig,
} from "../../../types/index.ts"

import { isLeft } from "../../../types/index.ts"

interface HydratedAbsoluteValue {
	tag: "AbsoluteValue"
	type: "operator"
	datatype: string
	operand: OperationFunction<number>
}

const absoluteValue =
	({ operand, ...op }: HydratedAbsoluteValue): OperationFunction<number> =>
	async (
		arg: unknown,
		localValues?: LocalValues,
	): Promise<Either<AdaptiveError[], number>> => {
		const resolvedOperand = await operand(arg, localValues)

		if (isLeft(resolvedOperand)) {
			return resolvedOperand
		}

		return { right: Math.abs(resolvedOperand.right) }
	}

export default absoluteValue
