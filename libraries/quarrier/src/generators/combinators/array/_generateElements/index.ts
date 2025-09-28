import type { Generator, Seed } from "../../../../types/index.ts"

type GenerateState<T> = {
	readonly seed: Seed
	readonly elements: ReadonlyArray<T>
	readonly totalSize: number
}

//++ Recursively generate array elements
export default function _generateElements<T>(
	elementGen: Generator<T>,
): (count: number) => (state: GenerateState<T>) => GenerateState<T> {
	return function generateWithCount(count: number) {
		return function generateWithState(
			state: GenerateState<T>,
		): GenerateState<T> {
			if (count <= 0) {
				return state
			}

			const result = elementGen.next(state.seed)
			return _generateElements(elementGen)(count - 1)({
				seed: result.nextSeed,
				elements: [...state.elements, result.value],
				totalSize: state.totalSize + result.size,
			})
		}
	}
}
