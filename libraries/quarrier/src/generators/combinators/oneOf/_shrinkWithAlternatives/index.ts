import type { Generator, ShrinkTree } from "../../../../types/index.ts"

export default function _shrinkWithAlternatives<T>(
	generators: ReadonlyArray<Generator<T>>,
): (value: T) => ShrinkTree<T> {
	return function withValue(value: T): ShrinkTree<T> {
		// QuickCheck approach: collect shrinks from ALL generators
		function collectAllShrinks(
			index: number,
			accumulated: ReadonlyArray<ShrinkTree<T>>,
		): ReadonlyArray<ShrinkTree<T>> {
			if (index >= generators.length) {
				return accumulated
			}

			const gen = generators[index]
			if (!gen.shrink) {
				return collectAllShrinks(index + 1, accumulated)
			}

			const shrinkTree = gen.shrink(value)
			const shrinkChildren = shrinkTree.children()

			// Only add shrinks if this generator actually shrinks the value
			// (i.e., it provides children)
			if (shrinkChildren.length === 0) {
				return collectAllShrinks(index + 1, accumulated)
			}

			// Add new shrinks that aren't duplicates
			const newShrinks = shrinkChildren.filter(function (child) {
				return !accumulated.some(function (existing) {
					return existing.value === child.value
				})
			})

			return collectAllShrinks(index + 1, [...accumulated, ...newShrinks])
		}

		const allShrinks = collectAllShrinks(0, [])

		return {
			value: value,
			children: function () {
				return allShrinks
			},
		}
	}
}
