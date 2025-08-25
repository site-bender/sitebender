/**
 * The opposite of zip - separates an array of pairs into two arrays
 *
 * Takes an array of 2-element tuples and returns a tuple of two arrays,
 * where the first array contains all first elements and the second array
 * contains all second elements. This is the inverse operation of zip.
 * Useful for separating paired data, extracting columns from row data,
 * or decomposing coordinate pairs.
 *
 * @curried No currying (single parameter)
 * @param pairs - Array of 2-element tuples to unzip
 * @returns Tuple of two arrays [firstElements, secondElements]
 * @example
 * ```typescript
 * // Basic unzipping
 * unzip([[1, "a"], [2, "b"], [3, "c"]])
 * // [[1, 2, 3], ["a", "b", "c"]]
 *
 * // Coordinate pairs
 * unzip([[10, 20], [30, 40], [50, 60]])
 * // [[10, 30, 50], [20, 40, 60]]
 *
 * // Key-value pairs
 * const pairs: Array<[string, number]> = [
 *   ["apple", 5],
 *   ["banana", 3],
 *   ["orange", 7]
 * ]
 * unzip(pairs)
 * // [["apple", "banana", "orange"], [5, 3, 7]]
 *
 * // Mixed types
 * unzip([[1, "one"], [2, "two"], [3, "three"]])
 * // [[1, 2, 3], ["one", "two", "three"]]
 *
 * // Boolean pairs
 * unzip([[true, false], [false, true], [true, true]])
 * // [[true, false, true], [false, true, true]]
 *
 * // Separate names and ages
 * const people: Array<[string, number]> = [
 *   ["Alice", 25],
 *   ["Bob", 30],
 *   ["Charlie", 35]
 * ]
 * const [names, ages] = unzip(people)
 * // names: ["Alice", "Bob", "Charlie"]
 * // ages: [25, 30, 35]
 *
 * // Timestamp and value pairs
 * const timeSeries: Array<[number, number]> = [
 *   [1000, 10],
 *   [2000, 15],
 *   [3000, 20]
 * ]
 * const [timestamps, values] = unzip(timeSeries)
 * // timestamps: [1000, 2000, 3000]
 * // values: [10, 15, 20]
 *
 * // Question and answer pairs
 * const qa: Array<[string, string]> = [
 *   ["What is 2+2?", "4"],
 *   ["Capital of France?", "Paris"],
 *   ["Color of sky?", "Blue"]
 * ]
 * const [questions, answers] = unzip(qa)
 * // questions: ["What is 2+2?", "Capital of France?", "Color of sky?"]
 * // answers: ["4", "Paris", "Blue"]
 *
 * // Single pair
 * unzip([[1, 2]])
 * // [[1], [2]]
 *
 * // Empty array
 * unzip([])
 * // [[], []]
 *
 * // Object pairs
 * const obj1 = { id: 1 }
 * const obj2 = { id: 2 }
 * const obj3 = { id: 3 }
 * unzip([[obj1, "a"], [obj2, "b"], [obj3, "c"]])
 * // [[obj1, obj2, obj3], ["a", "b", "c"]]
 *
 * // Date pairs
 * const datePairs: Array<[Date, string]> = [
 *   [new Date("2024-01-01"), "New Year"],
 *   [new Date("2024-07-04"), "Independence Day"],
 *   [new Date("2024-12-25"), "Christmas"]
 * ]
 * const [dates, holidays] = unzip(datePairs)
 * // dates: [Date("2024-01-01"), Date("2024-07-04"), Date("2024-12-25")]
 * // holidays: ["New Year", "Independence Day", "Christmas"]
 *
 * // Inverse of zip operation
 * const arr1 = [1, 2, 3]
 * const arr2 = ["a", "b", "c"]
 * const zipped: Array<[number, string]> = arr1.map((val, i) => [val, arr2[i]])
 * // [[1, "a"], [2, "b"], [3, "c"]]
 * const [back1, back2] = unzip(zipped)
 * // back1: [1, 2, 3], back2: ["a", "b", "c"]
 *
 * // Handle null/undefined
 * unzip(null)       // [[], []]
 * unzip(undefined)  // [[], []]
 *
 * // Null/undefined in pairs
 * unzip([[1, null], [2, undefined], [3, 4]])
 * // [[1, 2, 3], [null, undefined, 4]]
 *
 * // Extract columns from table data
 * const tableRows: Array<[string, number]> = [
 *   ["Product A", 100],
 *   ["Product B", 200],
 *   ["Product C", 150]
 * ]
 * const [products, prices] = unzip(tableRows)
 * // products: ["Product A", "Product B", "Product C"]
 * // prices: [100, 200, 150]
 *
 * // Separate x and y coordinates
 * const points: Array<[number, number]> = [
 *   [0, 0],
 *   [1, 1],
 *   [2, 4],
 *   [3, 9]
 * ]
 * const [xCoords, yCoords] = unzip(points)
 * // xCoords: [0, 1, 2, 3]
 * // yCoords: [0, 1, 4, 9]
 *
 * // Error codes and messages
 * const errors: Array<[number, string]> = [
 *   [404, "Not Found"],
 *   [500, "Server Error"],
 *   [403, "Forbidden"]
 * ]
 * const [codes, messages] = unzip(errors)
 * // codes: [404, 500, 403]
 * // messages: ["Not Found", "Server Error", "Forbidden"]
 *
 * // RGB channel separation
 * const pixels: Array<[number, number]> = [
 *   [255, 0],    // R, G for pixel 1
 *   [128, 128],  // R, G for pixel 2
 *   [0, 255]     // R, G for pixel 3
 * ]
 * const [reds, greens] = unzip(pixels)
 * // reds: [255, 128, 0]
 * // greens: [0, 128, 255]
 *
 * // Language pairs
 * const translations: Array<[string, string]> = [
 *   ["Hello", "Bonjour"],
 *   ["Goodbye", "Au revoir"],
 *   ["Thank you", "Merci"]
 * ]
 * const [english, french] = unzip(translations)
 * // english: ["Hello", "Goodbye", "Thank you"]
 * // french: ["Bonjour", "Au revoir", "Merci"]
 *
 * // Test input/output pairs
 * const testCases: Array<[number, number]> = [
 *   [2, 4],   // input 2, expected 4
 *   [3, 9],   // input 3, expected 9
 *   [4, 16]   // input 4, expected 16
 * ]
 * const [inputs, expected] = unzip(testCases)
 * // inputs: [2, 3, 4]
 * // expected: [4, 9, 16]
 *
 * // ID and data separation
 * const records: Array<[string, any]> = [
 *   ["id1", { name: "Alice" }],
 *   ["id2", { name: "Bob" }],
 *   ["id3", { name: "Charlie" }]
 * ]
 * const [ids, data] = unzip(records)
 * // ids: ["id1", "id2", "id3"]
 * // data: [{ name: "Alice" }, { name: "Bob" }, { name: "Charlie" }]
 *
 * // Nested arrays
 * unzip([[[1, 2], [3, 4]], [[5, 6], [7, 8]]])
 * // [[[1, 2], [5, 6]], [[3, 4], [7, 8]]]
 *
 * // Function pairs
 * const fn1 = () => 1
 * const fn2 = () => 2
 * const fnPairs: Array<[() => number, string]> = [
 *   [fn1, "one"],
 *   [fn2, "two"]
 * ]
 * const [fns, labels] = unzip(fnPairs)
 * // fns: [fn1, fn2]
 * // labels: ["one", "two"]
 *
 * // Type preservation
 * const typedPairs: Array<[number, string]> = [
 *   [1, "a"],
 *   [2, "b"]
 * ]
 * const [nums, strs] = unzip(typedPairs)
 * // nums: number[], strs: string[]
 *
 * // DOM element pairs
 * const elementPairs: Array<[string, string]> = [
 *   ["button", "Click me"],
 *   ["input", "Enter text"],
 *   ["div", "Container"]
 * ]
 * const [tags, contents] = unzip(elementPairs)
 * // tags: ["button", "input", "div"]
 * // contents: ["Click me", "Enter text", "Container"]
 *
 * // Statistical data
 * const stats: Array<[number, number]> = [
 *   [165, 60],  // height, weight
 *   [170, 65],
 *   [175, 70],
 *   [180, 75]
 * ]
 * const [heights, weights] = unzip(stats)
 * // heights: [165, 170, 175, 180]
 * // weights: [60, 65, 70, 75]
 *
 * // Configuration pairs
 * const config: Array<[string, boolean]> = [
 *   ["debug", true],
 *   ["verbose", false],
 *   ["cache", true]
 * ]
 * const [keys, values] = unzip(config)
 * // keys: ["debug", "verbose", "cache"]
 * // values: [true, false, true]
 *
 * // Matrix column extraction
 * const matrix = [[1, 2], [3, 4], [5, 6]]
 * const [col1, col2] = unzip(matrix)
 * // col1: [1, 3, 5] (first column)
 * // col2: [2, 4, 6] (second column)
 * ```
 * @property Immutable - doesn't modify input array
 * @property Inverse - Reverses the zip operation
 * @property Type-preserving - Maintains element types in output arrays
 */
const unzip = <T, U>(
	pairs: ReadonlyArray<readonly [T, U]> | null | undefined,
): [Array<T>, Array<U>] => {
	if (pairs == null || !Array.isArray(pairs) || pairs.length === 0) {
		return [[], []]
	}

	const first: Array<T> = []
	const second: Array<U> = []

	for (const pair of pairs) {
		if (Array.isArray(pair) && pair.length >= 2) {
			first.push(pair[0])
			second.push(pair[1])
		}
	}

	return [first, second]
}

export default unzip
