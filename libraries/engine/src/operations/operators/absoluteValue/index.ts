import type {
	EngineError,
	Either,
	LocalValues,
	OperationFunction,
} from "../../../types/index.ts"

import { isLeft } from "../../../../types/index.ts"

interface HydratedAbsoluteValue {
	tag: "AbsoluteValue"
	type: "operator"
	datatype: string
	operand: OperationFunction<number>
}

const absoluteValue =
	({ operand, ..._op }: HydratedAbsoluteValue): OperationFunction<number> =>
	async (
		arg: unknown,
		localValues?: LocalValues,
	): Promise<Either<EngineError[], number>> => {
		const resolvedOperand = await operand(arg, localValues)

		if (isLeft(resolvedOperand)) {
			return resolvedOperand
		}

		return { right: Math.abs(resolvedOperand.right) }
	}

export default absoluteValue
