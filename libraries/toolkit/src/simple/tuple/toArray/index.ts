/**
 * Converts a tuple to a regular array
 *
 * Transforms a tuple (Singleton, Pair, Triple) into a regular array,
 * losing the fixed-length type information but allowing use with
 * standard array operations. This is useful when you need to interface
 * with APIs that expect arrays rather than tuples.
 *
 * @param tuple - The tuple to convert to an array
 * @returns A new array containing the tuple elements
 * @example
 * ```typescript
 * // With singleton
 * toArray([42])
 * // [42]
 *
 * // With pair
 * toArray(["hello", "world"])
 * // ["hello", "world"]
 *
 * // With triple
 * toArray([1, 2, 3])
 * // [1, 2, 3]
 *
 * // Type information is lost (becomes T[])
 * import { Pair } from "../../../types/tuple"
 *
 * const p: Pair<string, number> = ["key", 42]
 * const arr = toArray(p)  // arr is (string | number)[]
 * // ["key", 42]
 *
 * // Different element types become union
 * const mixed: Pair<boolean, string> = [true, "test"]
 * const mixedArr = toArray(mixed)  // (boolean | string)[]
 * // [true, "test"]
 *
 * // Homogeneous tuples maintain element type
 * const numbers: Triple<number, number, number> = [1, 2, 3]
 * const numArr = toArray(numbers)  // number[]
 * // [1, 2, 3]
 *
 * // Using with array methods
 * const coords: Pair<number, number> = [3, 4]
 * const coordsArray = toArray(coords)
 * coordsArray.length        // 2
 * coordsArray.push(5)       // Now [3, 4, 5]
 * coordsArray.includes(3)   // true
 *
 * // Spreading tuple elements
 * const point: Triple<number, number, number> = [1, 2, 3]
 * const pointArray = toArray(point)
 * Math.max(...pointArray)   // 3
 *
 * // JSON serialization
 * const data: Pair<string, object> = ["user", { id: 1, name: "Alice" }]
 * const dataArray = toArray(data)
 * JSON.stringify(dataArray)
 * // '["user", {"id": 1, "name": "Alice"}]'
 *
 * // Array processing
 * const values: Triple<number, number, number> = [10, 20, 30]
 * const valuesArray = toArray(values)
 * const doubled = valuesArray.map(x => x * 2)
 * // [20, 40, 60]
 *
 * // Filtering
 * const items: Triple<string, string, string> = ["apple", "banana", "cherry"]
 * const itemsArray = toArray(items)
 * const filtered = itemsArray.filter(item => item.startsWith("a"))
 * // ["apple"]
 *
 * // Reducing
 * const nums: Pair<number, number> = [5, 10]
 * const numsArray = toArray(nums)
 * const sum = numsArray.reduce((a, b) => a + b, 0)
 * // 15
 *
 * // Interop with libraries expecting arrays
 * const rgb: Triple<number, number, number> = [255, 128, 0]
 * const rgbArray = toArray(rgb)
 * // someLibrary.setColor(rgbArray)
 *
 * // Converting for iteration
 * const entries: Pair<string, number> = ["count", 5]
 * const entriesArray = toArray(entries)
 * for (const item of entriesArray) {
 *   console.log(item)  // "count", then 5
 * }
 *
 * // Destructuring after conversion
 * const coord: Pair<number, number> = [7, 8]
 * const [x, y, ...rest] = toArray(coord)
 * // x = 7, y = 8, rest = []
 *
 * // Building larger arrays
 * const start: Pair<number, number> = [1, 2]
 * const end: Pair<number, number> = [9, 10]
 * const combined = [...toArray(start), 3, 4, 5, ...toArray(end)]
 * // [1, 2, 3, 4, 5, 9, 10]
 *
 * // Array equality comparison
 * const a: Pair<string, string> = ["x", "y"]
 * const b: Pair<string, string> = ["x", "y"]
 * JSON.stringify(toArray(a)) === JSON.stringify(toArray(b))  // true
 *
 * // Null/undefined handling
 * toArray(null)      // []
 * toArray(undefined) // []
 *
 * // Already arrays pass through
 * const existing = [1, 2, 3, 4, 5]
 * toArray(existing)  // [1, 2, 3, 4, 5] (new array)
 *
 * // Empty tuple handling
 * toArray([] as [])  // []
 *
 * // Nested tuples
 * const nested: Pair<Pair<number, number>, string> = [
 *   [1, 2],
 *   "test"
 * ]
 * toArray(nested)    // [[1, 2], "test"]
 *
 * // Complex objects
 * const complex: Triple<Date, RegExp, Function> = [
 *   new Date(),
 *   /test/,
 *   () => "hello"
 * ]
 * const complexArray = toArray(complex)
 * // [Date, RegExp, Function]
 *
 * // Using with Set/Map constructors
 * const uniqueItems: Triple<number, number, number> = [1, 2, 1]
 * const uniqueSet = new Set(toArray(uniqueItems))
 * // Set([1, 2])
 *
 * const keyValues: Pair<string, number> = ["key", 42]
 * // Can't directly use with Map constructor since it needs pairs
 * // But useful for building entry arrays
 *
 * // Mutable operations
 * const mutable: Pair<string, string> = ["a", "b"]
 * const mutableArray = toArray(mutable)
 * mutableArray.sort()   // ["a", "b"] (already sorted)
 * mutableArray.reverse() // ["b", "a"]
 * // Original tuple unchanged: ["a", "b"]
 *
 * // Array methods not available on tuples
 * const tuple: Triple<number, number, number> = [3, 1, 2]
 * const array = toArray(tuple)
 * array.sort((a, b) => a - b)  // [1, 2, 3]
 * array.find(x => x > 2)       // 3
 * array.every(x => x > 0)      // true
 * ```
 * @property Pure - No side effects, returns new array
 * @property Type-erasing - Loses tuple length and position type information
 * @property Safe - Handles null/undefined inputs gracefully
 */
const toArray = <T>(
	tuple: ReadonlyArray<T> | null | undefined,
): Array<T> => {
	if (tuple == null || !Array.isArray(tuple)) {
		return []
	}

	return [...tuple]
}

export default toArray
