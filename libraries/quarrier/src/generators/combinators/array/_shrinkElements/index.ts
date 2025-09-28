import type { Generator, ShrinkTree } from "../../../../types/index.ts"

//++ Shrink individual elements in array using recursion
export default function _shrinkElements<T>(
	elementGen: Generator<T>,
): (elements: ReadonlyArray<T>) => ReadonlyArray<ShrinkTree<ReadonlyArray<T>>> {
	return function shrinkWithElements(
		elements: ReadonlyArray<T>,
	): ReadonlyArray<ShrinkTree<ReadonlyArray<T>>> {
		if (elements.length === 0) {
			return []
		}

		// Recursive function to shrink elements at each position
		function shrinkAtPosition(
			index: number,
			accumulated: ReadonlyArray<ShrinkTree<ReadonlyArray<T>>>,
		): ReadonlyArray<ShrinkTree<ReadonlyArray<T>>> {
			if (index >= elements.length) {
				return accumulated
			}

			const elementShrinks = elementGen.shrink(elements[index]).children()

			// Recursive function to process each shrink of the current element
			function processShrinks(
				shrinkIndex: number,
				currentAccumulated: ReadonlyArray<ShrinkTree<ReadonlyArray<T>>>,
			): ReadonlyArray<ShrinkTree<ReadonlyArray<T>>> {
				if (shrinkIndex >= elementShrinks.length) {
					return currentAccumulated
				}

				const childShrink = elementShrinks[shrinkIndex]
				const newShrink: ShrinkTree<ReadonlyArray<T>> = {
					value: [
						...elements.slice(0, index),
						childShrink.value,
						...elements.slice(index + 1),
					],
					children: function getChildren() {
						const furtherShrinks = elementGen.shrink(childShrink.value)
							.children()
						return furtherShrinks.map(function mapFurtherShrink(furtherShrink) {
							return {
								value: [
									...elements.slice(0, index),
									furtherShrink.value,
									...elements.slice(index + 1),
								],
								children: function getNoChildren() {
									return []
								},
							}
						})
					},
				}

				return processShrinks(
					shrinkIndex + 1,
					[...currentAccumulated, newShrink],
				)
			}

			const shrinksForThisPosition = processShrinks(0, [])

			// Move to next position
			return shrinkAtPosition(
				index + 1,
				[...accumulated, ...shrinksForThisPosition],
			)
		}

		return shrinkAtPosition(0, [])
	}
}
