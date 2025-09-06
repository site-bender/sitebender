import { isLeft, isRight } from "@sitebender/engine-types/index.ts"
import concat from "@sitebender/toolkit/simple/array/concat/index.ts"

import type {
	ComparatorConfig,
	Either,
	EngineError,
	LocalValues,
	LogicalConfig,
	OperationFunction,
} from "../../../../types/index.ts"

import composeComparators from "../../../composers/composeComparators/index.ts"

const or =
	(op: ComparatorConfig | LogicalConfig): OperationFunction<boolean> =>
	async (
		arg: unknown,
		localValues?: LocalValues,
	): Promise<Either<Array<EngineError>, boolean>> => {
		const operands =
			(op as { operands?: Array<ComparatorConfig | LogicalConfig> })
				.operands ??
				[]
		const fns = await Promise.all(
			operands.map((operand) => composeComparators(operand)),
		)
		const results = await Promise.all(fns.map((fn) => fn(arg, localValues)))

		const rights = results.filter(isRight)

		if (rights.length) {
			// Any comparator succeeded → overall OR is true
			return { right: true }
		}

		// All were lefts; concatenate error arrays safely
		const lefts = results.filter(isLeft)
		return {
			left: lefts.reduce(
				(out, l) => concat(out)(l.left as Array<EngineError>),
				[] as Array<EngineError>,
			),
		}
	}

export default or
