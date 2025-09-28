import type { Generator, Seed } from "../../../../types/index.ts"

type RecordGenerators<T extends Record<string, unknown>> = {
	readonly [K in keyof T]: Generator<T[K]>
}

type GenerateState<T> = {
	readonly seed: Seed
	readonly record: T
	readonly totalSize: number
}

//++ Recursively generate record properties
export default function _generateRecordProperties<
	T extends Record<string, unknown>,
>(
	generators: RecordGenerators<T>,
): (
	keys: ReadonlyArray<keyof T>,
) => (state: GenerateState<T>) => GenerateState<T> {
	return function generateWithKeys(keys: ReadonlyArray<keyof T>) {
		return function generateWithState(
			state: GenerateState<T>,
		): GenerateState<T> {
			return generateRecursive(state, 0)

			function generateRecursive(
				currentState: GenerateState<T>,
				index: number,
			): GenerateState<T> {
				if (index >= keys.length) {
					return currentState
				}

				const key = keys[index]
				const result = generators[key].next(currentState.seed)
				return generateRecursive(
					{
						seed: result.nextSeed,
						record: { ...currentState.record, [key]: result.value },
						totalSize: currentState.totalSize + result.size,
					},
					index + 1,
				)
			}
		}
	}
}
