import type { AdaptiveError, ComparatorConfig, Either, LocalValues, LogicalConfig, OperationFunction } from "../../../../types/index.ts"
import { isLeft, isRight } from "@adaptiveTypes/index.ts"
import composeComparators from "../../../composers/composeComparators/index.ts"

const and = (op: ComparatorConfig | LogicalConfig): OperationFunction<boolean> =>
async (
	arg: unknown,
	localValues?: LocalValues,
): Promise<Either<Array<AdaptiveError>, boolean>> => {
	const operands = (op as { operands?: Array<ComparatorConfig | LogicalConfig> }).operands ?? []
	const fns = await Promise.all(operands.map((child) => composeComparators(child)))
	const results = await Promise.all(fns.map((fn) => fn(arg, localValues)))

	for (const res of results) {
		if (isLeft(res)) return { left: res.left }
	}

	// If no operands provided, return a neutral left (no-op) to signal misconfiguration
	if (!results.length) return { left: [] }

	// Return the last right value
	const rights = results.filter(isRight)
	return rights.length ? rights[rights.length - 1] : { left: [] }
}

export default and
