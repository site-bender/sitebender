import type { AdaptiveError, ComparatorConfig, Either, LocalValues, LogicalConfig, OperationFunction } from "../../../../types/index.ts"

import { isLeft, isRight } from "@adaptiveTypes/index.ts"
import concat from "@toolkit/simple/array/concat/index.ts"
import composeComparators from "../../../composers/composeComparators/index.ts"

const or = (op: ComparatorConfig | LogicalConfig): OperationFunction<boolean> =>
async (
	arg: unknown,
	localValues?: LocalValues,
): Promise<Either<Array<AdaptiveError>, boolean>> => {
	const operands = (op as { operands?: Array<ComparatorConfig | LogicalConfig> }).operands ?? []
	const fns = await Promise.all(operands.map((operand) => composeComparators(operand)))
	const results = await Promise.all(fns.map((fn) => fn(arg, localValues)))

	const rights = results.filter(isRight)

	if (rights.length) {
		return rights[0]
	}

	// All were lefts; concatenate error arrays safely
	const lefts = results.filter(isLeft)
	return {
		left: lefts.reduce(
			(out, l) => concat(out)(l.left as Array<AdaptiveError>),
			[] as Array<AdaptiveError>,
		),
	}
}

export default or
