import type { Generator, Seed } from "../../../../types/index.ts"

type TupleGenerators<T extends ReadonlyArray<unknown>> = {
	readonly [K in keyof T]: Generator<T[K]>
}

type GenerateState = {
	readonly seed: Seed
	readonly values: ReadonlyArray<unknown>
	readonly totalSize: number
}

//++ Recursively generate tuple elements
export default function _generateTupleElements<
	T extends ReadonlyArray<unknown>,
>(
	generators: TupleGenerators<T>,
): (state: GenerateState) => GenerateState {
	return function generateWithState(state: GenerateState): GenerateState {
		return generateRecursive(state, 0)

		function generateRecursive(
			currentState: GenerateState,
			index: number,
		): GenerateState {
			if (index >= generators.length) {
				return currentState
			}

			const result = generators[index].next(currentState.seed)
			return generateRecursive(
				{
					seed: result.nextSeed,
					values: [...currentState.values, result.value],
					totalSize: currentState.totalSize + result.size,
				},
				index + 1,
			)
		}
	}
}
