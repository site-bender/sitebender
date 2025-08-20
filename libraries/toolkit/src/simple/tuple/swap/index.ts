import type { Pair } from "../../../types/tuple/index.ts"

/**
 * Swaps the elements of a pair
 * 
 * Takes a pair [a, b] and returns a new pair [b, a] with the elements
 * in reversed order. This is useful for reordering key-value pairs,
 * coordinates, or any binary relationship where the order needs to be flipped.
 * 
 * @param pair - The pair to swap
 * @returns A new pair with swapped elements
 * @example
 * ```typescript
 * // Basic swap
 * swap([1, 2])
 * // [2, 1]
 * 
 * swap(["hello", "world"])
 * // ["world", "hello"]
 * 
 * // Different types
 * swap([42, "answer"])
 * // ["answer", 42]
 * 
 * swap([true, { id: 1 }])
 * // [{ id: 1 }, true]
 * 
 * // Key-value pairs
 * type Entry<K, V> = Pair<K, V>
 * const entry: Entry<string, number> = ["age", 30]
 * const swapped = swap(entry)
 * // [30, "age"]
 * 
 * // Coordinate systems
 * type Point = Pair<number, number>
 * const xyPoint: Point = [3, 4]
 * const yxPoint = swap(xyPoint)
 * // [4, 3]
 * 
 * // Result/Error patterns
 * type Result<T, E> = Pair<T | null, E | null>
 * const success: Result<number, string> = [42, null]
 * swap(success)  // [null, 42]
 * 
 * const failure: Result<number, string> = [null, "Error"]
 * swap(failure)  // ["Error", null]
 * 
 * // Building reverse mappings
 * const entries: Array<Pair<string, number>> = [
 *   ["one", 1],
 *   ["two", 2],
 *   ["three", 3]
 * ]
 * const reversed = entries.map(swap)
 * // [[1, "one"], [2, "two"], [3, "three"]]
 * 
 * // Double swap is identity
 * const original: Pair<string, number> = ["test", 123]
 * const doubleSwapped = swap(swap(original))
 * // ["test", 123] - back to original
 * 
 * // With Object.fromEntries
 * const kvPairs: Array<Pair<string, number>> = [
 *   ["a", 1],
 *   ["b", 2],
 *   ["c", 3]
 * ]
 * const invertedObj = Object.fromEntries(kvPairs.map(swap))
 * // { 1: "a", 2: "b", 3: "c" }
 * 
 * // Sorting by second element
 * const pairs: Array<Pair<string, number>> = [
 *   ["c", 3],
 *   ["a", 1],
 *   ["b", 2]
 * ]
 * const sortBySecond = pairs
 *   .map(swap)
 *   .sort((a, b) => a[0] - b[0])
 *   .map(swap)
 * // [["a", 1], ["b", 2], ["c", 3]]
 * 
 * // Range representation
 * type Range = Pair<number, number>  // [start, end]
 * const range: Range = [10, 20]
 * const reversed = swap(range)  // [20, 10] - end, start
 * 
 * // Matrix indices
 * type Index = Pair<number, number>  // [row, col]
 * const rowCol: Index = [2, 5]
 * const colRow = swap(rowCol)  // [5, 2]
 * 
 * // Function arguments reordering
 * const divide = (x: number, y: number) => x / y
 * const flipDivide = (p: Pair<number, number>) => 
 *   divide(...swap(p))
 * 
 * flipDivide([4, 2])  // divide(2, 4) = 0.5
 * 
 * // Compose with other tuple functions
 * import { bimap } from "../bimap"
 * import { compose } from "../../combinator/compose"
 * 
 * const process = compose(
 *   swap,
 *   bimap((y: number) => y * 2)((x: number) => x + 1)
 * )
 * 
 * process([3, 4])  // [4, 8] then [8, 4]
 * 
 * // Type preservation
 * import { Pair as PairType } from "../../../types/tuple"
 * 
 * const typed: PairType<boolean, string> = [true, "yes"]
 * const swappedTyped = swap(typed)
 * // swappedTyped is inferred as Pair<string, boolean>
 * // ["yes", true]
 * 
 * // Invalid input handling
 * swap(null)
 * // [undefined, undefined]
 * 
 * swap(undefined)
 * // [undefined, undefined]
 * 
 * // Arrays with wrong length
 * swap([1] as unknown as Pair<number, number>)
 * // [undefined, 1]
 * 
 * swap([1, 2, 3] as unknown as Pair<number, number>)
 * // [2, 1] - ignores extra elements
 * 
 * // Empty array
 * swap([] as unknown as Pair<number, number>)
 * // [undefined, undefined]
 * 
 * // Relationship inversion
 * type Relation<A, B> = Pair<A, B>
 * const parentChild: Relation<string, string> = ["Alice", "Bob"]
 * const childParent = swap(parentChild)
 * // ["Bob", "Alice"]
 * 
 * // Complex object swapping
 * const complex: Pair<{ a: number }, { b: string }> = [
 *   { a: 1 },
 *   { b: "test" }
 * ]
 * swap(complex)
 * // [{ b: "test" }, { a: 1 }]
 * ```
 * @property Pure - No side effects
 * @property Type-safe - Preserves and swaps types correctly
 * @property Idempotent when applied twice - swap(swap(x)) === x
 */
const swap = <T, U>(
	pair: Pair<T, U> | null | undefined
): Pair<U, T> => {
	if (pair == null || !Array.isArray(pair)) {
		return [undefined, undefined] as unknown as Pair<U, T>
	}
	
	return [pair[1], pair[0]]
}

export default swap