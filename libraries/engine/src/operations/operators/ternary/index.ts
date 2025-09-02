import type {
	AdaptiveError,
	Either,
	LocalValues,
	OperationFunction,
} from "../../../types/index.ts"

import { isLeft } from "../../../../types/index.ts"

type HydratedTernary = {
	tag: "Ternary"
	type: "operator"
	datatype: string
	condition: OperationFunction<boolean>
	ifTrue: OperationFunction
	ifFalse: OperationFunction
}

const ternary = ({ condition, ifTrue, ifFalse }: HydratedTernary) =>
async (
	arg: unknown,
	localValues?: LocalValues,
): Promise<Either<Array<AdaptiveError>, unknown>> => {
	const resolvedCondition = await condition(arg, localValues)

	if (isLeft(resolvedCondition)) {
		return resolvedCondition
	}

	return resolvedCondition.right
		? await ifTrue(arg, localValues)
		: await ifFalse(arg, localValues)
}

export default ternary
