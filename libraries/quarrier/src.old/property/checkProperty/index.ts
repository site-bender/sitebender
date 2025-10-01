import ok from "@sitebender/toolsmith/monads/result/ok/index.ts"
import range from "@sitebender/toolsmith/vanilla/array/range/index.ts"
import reduce from "@sitebender/toolsmith/vanilla/array/reduce/index.ts"

import type {
	Configuration,
	Property,
	PropertyResult,
	PropertySuccess,
} from "../../types/index.ts"
import type { RunState } from "./types/index.ts"

import runProperty from "./runProperty/index.ts"

//++ Checks if a property holds for generated test cases
export default function checkProperty<Arguments extends ReadonlyArray<unknown>>(
	property: Property<Arguments>,
) {
	return function checkWithConfiguration(
		config: Configuration = {},
	): PropertyResult {
		const runs = config.runs ?? 100
		const initialSeed = config.seed ?? Date.now()

		const finalState = reduce<number, RunState>(
			runProperty(property, initialSeed),
		)({
			seed: { value: initialSeed, path: [] },
			result: null,
		})(
			range(0)(runs),
		)

		return finalState.result ?? ok<PropertySuccess>({
			type: "success",
			runs,
			seed: initialSeed,
		})
	}
}
