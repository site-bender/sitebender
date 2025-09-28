import type { Generator, ShrinkTree } from "../../../../types/index.ts"

type TupleGenerators<T extends ReadonlyArray<unknown>> = {
	readonly [K in keyof T]: Generator<T[K]>
}

//++ Shrink individual tuple elements
export default function _shrinkTupleElements<T extends ReadonlyArray<unknown>>(
	generators: TupleGenerators<T>,
): (value: T) => ReadonlyArray<ShrinkTree<T>> {
	return function shrinkWithValue(value: T): ReadonlyArray<ShrinkTree<T>> {
		return shrinkRecursive(0, [])

		function shrinkRecursive(
			index: number,
			accumulated: ReadonlyArray<ShrinkTree<T>>,
		): ReadonlyArray<ShrinkTree<T>> {
			if (index >= generators.length) {
				return accumulated
			}

			const gen = generators[index]
			const elementShrinks = gen.shrink(value[index])
			const childShrinks = elementShrinks.children()

			const currentShrinks = childShrinks.map(
				function mapChildShrink(childShrink) {
					const newTuple = [...value]
					newTuple[index] = childShrink.value

					return {
						value: newTuple as unknown as T,
						children: function getChildren() {
							const furtherShrinks = gen.shrink(childShrink.value).children()
							return furtherShrinks.map(
								function mapFurtherShrink(furtherShrink) {
									const furtherTuple = [...newTuple]
									furtherTuple[index] = furtherShrink.value
									return {
										value: furtherTuple as unknown as T,
										children: function getNoChildren() {
											return []
										},
									}
								},
							)
						},
					}
				},
			)

			return shrinkRecursive(index + 1, [...accumulated, ...currentShrinks])
		}
	}
}
