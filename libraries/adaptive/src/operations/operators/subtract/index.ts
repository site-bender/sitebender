import type {
	AdaptiveError,
	Either,
	GlobalAttributes,
	LocalValues,
	OperationFunction,
	OperatorConfig,
} from "../../../types/index.ts"

import { isLeft } from "../../../types/index.ts"

interface HydratedSubtract {
	tag: "Subtract"
	type: "operator"
	datatype: string
	minuend: OperationFunction<number>
	subtrahend: OperationFunction<number>
}

const subtract = (
	{ minuend, subtrahend, ...op }: HydratedSubtract,
): OperationFunction<number> =>
async (
	arg: unknown,
	localValues?: LocalValues,
): Promise<Either<Array<AdaptiveError>, number>> => {
	const resolvedMinuend = await minuend(arg, localValues)
	if (isLeft(resolvedMinuend)) return resolvedMinuend

	const resolvedSubtrahend = await subtrahend(arg, localValues)
	if (isLeft(resolvedSubtrahend)) return resolvedSubtrahend

	return { right: resolvedMinuend.right - resolvedSubtrahend.right }
}

export default subtract
