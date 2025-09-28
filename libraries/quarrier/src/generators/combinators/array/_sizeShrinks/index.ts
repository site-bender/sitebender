import type { Generator, ShrinkTree } from "../../../../types/index.ts"
import array from "../index.ts"

type ArrayOptions = {
	readonly minSize?: number
	readonly maxSize?: number
}

//++ Generate size-based shrinks for array
export default function _sizeShrinks<T>(
	elementGen: Generator<T>,
): (
	options: ArrayOptions,
) => (value: ReadonlyArray<T>) => ReadonlyArray<ShrinkTree<ReadonlyArray<T>>> {
	return function shrinksWithOptions(options: ArrayOptions) {
		return function shrinksForValue(
			value: ReadonlyArray<T>,
		): ReadonlyArray<ShrinkTree<ReadonlyArray<T>>> {
			const minSize = options.minSize ?? 0
			const shrinks: ShrinkTree<ReadonlyArray<T>>[] = []

			// Shrink to empty array first
			if (value.length > minSize) {
				shrinks.push({
					value: [],
					children: function getNoChildren() {
						return []
					},
				})
			}

			// Remove first half
			if (value.length > 1 && value.length / 2 >= minSize) {
				const half = Math.floor(value.length / 2)
				shrinks.push({
					value: value.slice(half),
					children: function getChildren() {
						return array(elementGen, options).shrink(value.slice(half))
							.children()
					},
				})
			}

			// Remove last half
			if (value.length > 1 && value.length / 2 >= minSize) {
				const half = Math.floor(value.length / 2)
				shrinks.push({
					value: value.slice(0, half),
					children: function getChildren() {
						return array(elementGen, options).shrink(value.slice(0, half))
							.children()
					},
				})
			}

			// Remove single elements from different positions
			if (value.length > minSize) {
				shrinks.push({
					value: value.slice(1),
					children: function getChildren() {
						return array(elementGen, options).shrink(value.slice(1)).children()
					},
				})

				shrinks.push({
					value: value.slice(0, -1),
					children: function getChildren() {
						return array(elementGen, options).shrink(value.slice(0, -1))
							.children()
					},
				})
			}

			return shrinks
		}
	}
}
