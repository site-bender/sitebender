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
			const n = value.length

			if (n <= minSize) {
				return []
			}

			const shrinks: ShrinkTree<ReadonlyArray<T>>[] = []

			// MOST AGGRESSIVE: Shrink to minimum size first (empty if minSize is 0)
			if (minSize === 0) {
				shrinks.push({
					value: [],
					children: function getNoChildren() {
						return []
					},
				})
			} else if (n > minSize) {
				shrinks.push({
					value: value.slice(0, minSize),
					children: function getChildren() {
						return array(elementGen, options).shrink(value.slice(0, minSize))
							.children()
					},
				})
			}

			// FULL HALVING SEQUENCE: Remove chunks of size n/2, n/4, n/8, etc.
			// This is the CORRECT QuickCheck/Hedgehog algorithm

			// Recursive function to remove middle chunks at different positions
			function removeMiddleChunks(
				arr: ReadonlyArray<T>,
				chunkSize: number,
				position: number,
			): ReadonlyArray<ShrinkTree<ReadonlyArray<T>>> {
				if (position + chunkSize >= arr.length) {
					return []
				}

				if (n - chunkSize >= minSize) {
					const shrunk = [
						...arr.slice(0, position),
						...arr.slice(position + chunkSize),
					]
					const currentShrink: ShrinkTree<ReadonlyArray<T>> = {
						value: shrunk,
						children: function getChildren() {
							return array(elementGen, options).shrink(shrunk).children()
						},
					}
					// Recursively process next position
					const nextShrinks = removeMiddleChunks(arr, chunkSize, position + 1)
					return [currentShrink, ...nextShrinks]
				}

				return removeMiddleChunks(arr, chunkSize, position + 1)
			}

			// Recursive function to process all chunk sizes in halving sequence
			function processChunkSizes(
				chunkSize: number,
			): ReadonlyArray<ShrinkTree<ReadonlyArray<T>>> {
				if (chunkSize === 0) {
					return []
				}

				const currentShrinks: ShrinkTree<ReadonlyArray<T>>[] = []

				// Remove prefix of size chunkSize
				if (n - chunkSize >= minSize) {
					currentShrinks.push({
						value: value.slice(chunkSize),
						children: function getChildren() {
							return array(elementGen, options).shrink(value.slice(chunkSize))
								.children()
						},
					})
				}

				// Remove suffix of size chunkSize
				if (n - chunkSize >= minSize) {
					currentShrinks.push({
						value: value.slice(0, n - chunkSize),
						children: function getChildren() {
							return array(elementGen, options).shrink(
								value.slice(0, n - chunkSize),
							)
								.children()
						},
					})
				}

				// Remove middle chunks (start from position 1 to avoid duplicate of prefix)
				const middleShrinks = removeMiddleChunks(value, chunkSize, 1)

				// Recursively process next chunk size (half of current)
				const nextChunkSize = Math.floor(chunkSize / 2)
				const nextShrinks = processChunkSizes(nextChunkSize)

				return [...currentShrinks, ...middleShrinks, ...nextShrinks]
			}

			// Start with chunks of size n/2
			const chunkShrinks = processChunkSizes(Math.floor(n / 2))

			return [...shrinks, ...chunkShrinks]
		}
	}
}
