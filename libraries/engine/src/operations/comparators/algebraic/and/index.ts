import { isLeft, isRight } from "@sitebender/engine-types/index.ts"

import type {
	ComparatorConfig,
	Either,
	EngineError,
	LocalValues,
	LogicalConfig,
	OperationFunction,
} from "../../../../types/index.ts"

import composeComparators from "../../../composers/composeComparators/index.ts"

const and =
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
			operands.map((child) => composeComparators(child)),
		)
		const results = await Promise.all(fns.map((fn) => fn(arg, localValues)))

		for (const res of results) {
			if (isLeft(res)) return { left: res.left }
		}

		// If no operands provided, return a neutral left (no-op) to signal misconfiguration
		if (!results.length) return { left: [] }

		// Aggregate: true iff all comparator rights are truthy booleans
		const bools: boolean[] = results
			.filter(isRight)
			// deno-lint-ignore no-explicit-any
			.map((r: any) => Boolean(r.right))

		// If for some reason there are no rights (shouldn't happen because we returned on Left), treat as misconfig
		if (!bools.length) return { left: [] }

		const allTrue = bools.every((b) => b === true)
		return { right: allTrue }
	}

export default and
