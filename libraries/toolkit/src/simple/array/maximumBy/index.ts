/**
 * Finds the maximum element according to a comparator function
 *
 * Returns the element from the array that is greatest according to the
 * provided comparator function. The comparator should return a positive
 * number if the first argument is greater, negative if smaller, and zero
 * if equal (like standard sort comparators). Returns undefined for empty
 * arrays. Useful for finding maximum by custom criteria, complex comparisons,
 * or multi-field sorting.
 *
 * @curried (comparator) => (array) => result
 * @param comparator - Function that compares two elements (returns positive if a > b)
 * @param array - Array to find maximum element from
 * @returns Maximum element according to comparator, or undefined if array is empty
 * @example
 * ```typescript
 * // Simple numeric comparison
 * const numCompare = (a: number, b: number) => a - b
 * maximumBy(numCompare)([3, 1, 4, 1, 5, 9, 2])
 * // 9
 *
 * // String length comparison
 * const byLength = (a: string, b: string) => a.length - b.length
 * maximumBy(byLength)(["a", "bbb", "cc", "dddd"])
 * // "dddd"
 *
 * // Object property comparison
 * const byAge = (a: { age: number }, b: { age: number }) => a.age - b.age
 * const people = [
 *   { name: "Alice", age: 30 },
 *   { name: "Bob", age: 25 },
 *   { name: "Charlie", age: 35 }
 * ]
 * maximumBy(byAge)(people)
 * // { name: "Charlie", age: 35 }
 *
 * // Multi-field comparison
 * type Score = { points: number; time: number }
 * const byScore = (a: Score, b: Score) => {
 *   if (a.points !== b.points) return a.points - b.points
 *   return b.time - a.time  // Lower time is better if points are equal
 * }
 * const scores: Score[] = [
 *   { points: 100, time: 50 },
 *   { points: 100, time: 45 },
 *   { points: 95, time: 40 }
 * ]
 * maximumBy(byScore)(scores)
 * // { points: 100, time: 45 }
 *
 * // Date comparison
 * const byDate = (a: Date, b: Date) => a.getTime() - b.getTime()
 * const dates = [
 *   new Date("2024-01-15"),
 *   new Date("2024-03-10"),
 *   new Date("2024-02-20")
 * ]
 * maximumBy(byDate)(dates)
 * // Date("2024-03-10")
 *
 * // Alphabetical comparison (reverse for maximum)
 * const alphabetical = (a: string, b: string) => a.localeCompare(b)
 * maximumBy(alphabetical)(["zebra", "apple", "mango", "banana"])
 * // "zebra"
 *
 * // Complex nested comparison
 * type Node = { value: number; priority: number; id: string }
 * const byPriorityAndValue = (a: Node, b: Node) => {
 *   const priorityDiff = a.priority - b.priority
 *   if (priorityDiff !== 0) return priorityDiff
 *   return a.value - b.value
 * }
 * const nodes: Node[] = [
 *   { value: 10, priority: 1, id: "a" },
 *   { value: 20, priority: 2, id: "b" },
 *   { value: 15, priority: 2, id: "c" }
 * ]
 * maximumBy(byPriorityAndValue)(nodes)
 * // { value: 20, priority: 2, id: "b" }
 *
 * // Array comparison (by sum)
 * const bySum = (a: number[], b: number[]) => {
 *   const sumA = a.reduce((acc, x) => acc + x, 0)
 *   const sumB = b.reduce((acc, x) => acc + x, 0)
 *   return sumA - sumB
 * }
 * maximumBy(bySum)([[1, 2], [3, 4], [2, 2], [5, 1]])
 * // [3, 4] (sum = 7)
 *
 * // Version comparison
 * type Version = { major: number; minor: number; patch: number }
 * const byVersion = (a: Version, b: Version) => {
 *   if (a.major !== b.major) return a.major - b.major
 *   if (a.minor !== b.minor) return a.minor - b.minor
 *   return a.patch - b.patch
 * }
 * const versions: Version[] = [
 *   { major: 1, minor: 0, patch: 0 },
 *   { major: 2, minor: 1, patch: 0 },
 *   { major: 2, minor: 0, patch: 5 }
 * ]
 * maximumBy(byVersion)(versions)
 * // { major: 2, minor: 1, patch: 0 }
 *
 * // Custom business logic
 * type Product = { price: number; rating: number; inStock: boolean }
 * const byValue = (a: Product, b: Product) => {
 *   // Prefer in-stock items
 *   if (a.inStock !== b.inStock) return a.inStock ? 1 : -1
 *   // Then by rating
 *   if (a.rating !== b.rating) return a.rating - b.rating
 *   // Then by price (lower is better, so reverse)
 *   return b.price - a.price
 * }
 * const products: Product[] = [
 *   { price: 100, rating: 4.5, inStock: true },
 *   { price: 80, rating: 4.8, inStock: false },
 *   { price: 90, rating: 4.5, inStock: true }
 * ]
 * maximumBy(byValue)(products)
 * // { price: 90, rating: 4.5, inStock: true }
 *
 * // Single element
 * maximumBy((a: number, b: number) => a - b)([42])
 * // 42
 *
 * // Empty array
 * maximumBy((a: number, b: number) => a - b)([])
 * // undefined
 *
 * // All equal elements (returns first)
 * maximumBy(() => 0)([1, 2, 3])
 * // 1
 *
 * // Distance from target
 * const distanceFrom = (target: number) =>
 *   (a: number, b: number) => Math.abs(b - target) - Math.abs(a - target)
 * maximumBy(distanceFrom(10))([5, 15, 8, 20, 12])
 * // 20 (farthest from 10)
 *
 * // Lexicographic comparison
 * const lexCompare = (a: string[], b: string[]) => {
 *   for (let i = 0; i < Math.min(a.length, b.length); i++) {
 *     const comp = a[i].localeCompare(b[i])
 *     if (comp !== 0) return comp
 *   }
 *   return a.length - b.length
 * }
 * maximumBy(lexCompare)([
 *   ["a", "b", "c"],
 *   ["a", "c"],
 *   ["b"],
 *   ["a", "b", "d"]
 * ])
 * // ["b"]
 *
 * // Partial application for reusable comparisons
 * const getOldest = maximumBy((a: any, b: any) => a.age - b.age)
 * getOldest([{ age: 25 }, { age: 30 }, { age: 20 }])
 * // { age: 30 }
 *
 * const getLongest = maximumBy((a: string, b: string) => a.length - b.length)
 * getLongest(["short", "medium", "very long string"])
 * // "very long string"
 *
 * // Handle null/undefined gracefully
 * maximumBy((a: number, b: number) => a - b)(null)       // undefined
 * maximumBy((a: number, b: number) => a - b)(undefined)  // undefined
 *
 * // Performance metrics
 * type Metric = { cpu: number; memory: number; time: number }
 * const byEfficiency = (a: Metric, b: Metric) => {
 *   const scoreA = (100 - a.cpu) + (100 - a.memory) - a.time
 *   const scoreB = (100 - b.cpu) + (100 - b.memory) - b.time
 *   return scoreA - scoreB
 * }
 * const metrics: Metric[] = [
 *   { cpu: 50, memory: 30, time: 100 },
 *   { cpu: 40, memory: 40, time: 120 },
 *   { cpu: 60, memory: 20, time: 80 }
 * ]
 * maximumBy(byEfficiency)(metrics)
 * // { cpu: 60, memory: 20, time: 80 }
 *
 * // Tree node comparison (by depth and value)
 * type TreeNode = { value: number; depth: number; children: number }
 * const byDepthAndValue = (a: TreeNode, b: TreeNode) => {
 *   if (a.depth !== b.depth) return a.depth - b.depth
 *   return a.value - b.value
 * }
 * const treeNodes: TreeNode[] = [
 *   { value: 10, depth: 2, children: 3 },
 *   { value: 20, depth: 3, children: 0 },
 *   { value: 15, depth: 3, children: 2 }
 * ]
 * maximumBy(byDepthAndValue)(treeNodes)
 * // { value: 20, depth: 3, children: 0 }
 * ```
 * @property Immutable - doesn't modify input array
 * @property Undefined-safe - returns undefined for empty arrays
 * @property Stable - returns first maximum if multiple exist
 */
const maximumBy = <T>(
	comparator: (a: T, b: T) => number,
) =>
(
	array: ReadonlyArray<T> | null | undefined,
): T | undefined => {
	if (array == null || !Array.isArray(array) || array.length === 0) {
		return undefined
	}

	let maximum = array[0]

	for (let i = 1; i < array.length; i++) {
		if (comparator(array[i], maximum) > 0) {
			maximum = array[i]
		}
	}

	return maximum
}

export default maximumBy
