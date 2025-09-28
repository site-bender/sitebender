import type { Generator, ShrinkTree } from "../../../../types/index.ts"

//++ Create shrink tree for element at index
function _shrinkElementAt<T>(
	elementGen: Generator<T>,
): (
	elements: ReadonlyArray<T>,
) => (index: number) => ShrinkTree<ReadonlyArray<T>> {
	return function shrinkWithElements(elements: ReadonlyArray<T>) {
		return function shrinkAtIndex(index: number): ShrinkTree<ReadonlyArray<T>> {
			const elementShrinks = elementGen.shrink(elements[index])
			const childShrink = elementShrinks.children()[0] // Get first shrink if exists

			if (!childShrink) {
				return {
					value: elements,
					children: function getChildren() {
						return []
					},
				}
			}

			return {
				value: [
					...elements.slice(0, index),
					childShrink.value,
					...elements.slice(index + 1),
				],
				children: function getChildren() {
					const furtherShrinks = elementGen.shrink(childShrink.value).children()
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
		}
	}
}

//++ Shrink individual elements in array
export default function _shrinkElements<T>(
	elementGen: Generator<T>,
): (elements: ReadonlyArray<T>) => ReadonlyArray<ShrinkTree<ReadonlyArray<T>>> {
	return function shrinkWithElements(
		elements: ReadonlyArray<T>,
	): ReadonlyArray<ShrinkTree<ReadonlyArray<T>>> {
		if (elements.length === 0) {
			return []
		}

		// Collect all shrinks for all elements
		const shrinks: ShrinkTree<ReadonlyArray<T>>[] = []

		for (let i = 0; i < elements.length; i++) {
			const elementShrinks = elementGen.shrink(elements[i]).children()

			for (const childShrink of elementShrinks) {
				shrinks.push({
					value: [
						...elements.slice(0, i),
						childShrink.value,
						...elements.slice(i + 1),
					],
					children: function getChildren() {
						const furtherShrinks = elementGen.shrink(childShrink.value)
							.children()
						return furtherShrinks.map(function mapFurtherShrink(furtherShrink) {
							return {
								value: [
									...elements.slice(0, i),
									furtherShrink.value,
									...elements.slice(i + 1),
								],
								children: function getNoChildren() {
									return []
								},
							}
						})
					},
				})
			}
		}

		return shrinks
	}
}
