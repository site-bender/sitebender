/**
 * Returns the Cartesian product of two arrays (all possible pairs)
 *
 * Creates an array containing all possible ordered pairs [a, b] where 'a'
 * is from the first array and 'b' is from the second array. The result
 * has length array1.length × array2.length. Order is preserved: all pairs
 * with the first element from array1[0] come before pairs with array1[1].
 * Useful for generating combinations, test cases, or coordinate grids.
 *
 * @curried (array1) => (array2) => result
 * @param array1 - First array
 * @param array2 - Second array
 * @returns Array of all possible pairs [element1, element2]
 * @example
 * ```typescript
 * // Basic Cartesian product
 * cartesianProduct([1, 2])([3, 4])
 * // [[1, 3], [1, 4], [2, 3], [2, 4]]
 *
 * // String combinations
 * cartesianProduct(["a", "b"])(["x", "y", "z"])
 * // [["a", "x"], ["a", "y"], ["a", "z"], ["b", "x"], ["b", "y"], ["b", "z"]]
 *
 * // Single element arrays
 * cartesianProduct([1])([2])
 * // [[1, 2]]
 *
 * // Generate coordinates
 * cartesianProduct([0, 1, 2])([0, 1, 2])
 * // [
 * //   [0, 0], [0, 1], [0, 2],
 * //   [1, 0], [1, 1], [1, 2],
 * //   [2, 0], [2, 1], [2, 2]
 * // ]
 *
 * // Size and color combinations
 * const sizes = ["S", "M", "L"]
 * const colors = ["red", "blue"]
 * cartesianProduct(sizes)(colors)
 * // [
 * //   ["S", "red"], ["S", "blue"],
 * //   ["M", "red"], ["M", "blue"],
 * //   ["L", "red"], ["L", "blue"]
 * // ]
 *
 * // Test case generation
 * const inputs = [0, 1, -1]
 * const operations = ["add", "subtract", "multiply"]
 * cartesianProduct(inputs)(operations)
 * // All input-operation combinations
 *
 * // Playing cards
 * const ranks = ["A", "K", "Q", "J"]
 * const suits = ["♠", "♥", "♦", "♣"]
 * cartesianProduct(ranks)(suits)
 * // [
 * //   ["A", "♠"], ["A", "♥"], ["A", "♦"], ["A", "♣"],
 * //   ["K", "♠"], ["K", "♥"], ["K", "♦"], ["K", "♣"],
 * //   ["Q", "♠"], ["Q", "♥"], ["Q", "♦"], ["Q", "♣"],
 * //   ["J", "♠"], ["J", "♥"], ["J", "♦"], ["J", "♣"]
 * // ]
 *
 * // Menu combinations
 * const mains = ["burger", "pizza", "salad"]
 * const drinks = ["water", "soda", "juice"]
 * cartesianProduct(mains)(drinks)
 * // All meal combinations
 *
 * // Empty array cases
 * cartesianProduct([])([1, 2, 3])
 * // []
 *
 * cartesianProduct([1, 2, 3])([])
 * // []
 *
 * cartesianProduct([])([])
 * // []
 *
 * // Mixed types
 * cartesianProduct([1, 2])([true, false])
 * // [[1, true], [1, false], [2, true], [2, false]]
 *
 * // Object combinations
 * const users = [{ id: 1 }, { id: 2 }]
 * const roles = ["admin", "user"]
 * cartesianProduct(users)(roles)
 * // [[{ id: 1 }, "admin"], [{ id: 1 }, "user"], [{ id: 2 }, "admin"], [{ id: 2 }, "user"]]
 *
 * // Database join simulation
 * const tables = ["users", "posts", "comments"]
 * const operations = ["SELECT", "INSERT", "UPDATE", "DELETE"]
 * cartesianProduct(tables)(operations)
 * // All table-operation permissions
 *
 * // Grid generation
 * const rows = ["A", "B", "C"]
 * const cols = [1, 2, 3, 4]
 * cartesianProduct(rows)(cols).map(([r, c]) => `${r}${c}`)
 * // ["A1", "A2", "A3", "A4", "B1", "B2", "B3", "B4", "C1", "C2", "C3", "C4"]
 *
 * // Probability space
 * const coin = ["H", "T"]
 * const die = [1, 2, 3, 4, 5, 6]
 * cartesianProduct(coin)(die)
 * // All coin flip + die roll outcomes
 *
 * // Time slots
 * const days = ["Mon", "Tue", "Wed"]
 * const hours = ["9AM", "2PM", "5PM"]
 * cartesianProduct(days)(hours)
 * // All appointment slots
 *
 * // Configuration options
 * const environments = ["dev", "staging", "prod"]
 * const regions = ["us-east", "us-west", "eu"]
 * cartesianProduct(environments)(regions)
 * // All deployment targets
 *
 * // Handle null/undefined
 * cartesianProduct(null)([1, 2])       // []
 * cartesianProduct(undefined)([1, 2])  // []
 * cartesianProduct([1, 2])(null)       // []
 * cartesianProduct([1, 2])(undefined)  // []
 *
 * // Language pairs for translation
 * const sourceLangs = ["en", "es", "fr"]
 * const targetLangs = ["de", "it", "pt"]
 * cartesianProduct(sourceLangs)(targetLangs)
 * // All translation pairs
 *
 * // Boolean truth table
 * const bools = [true, false]
 * cartesianProduct(bools)(bools)
 * // [[true, true], [true, false], [false, true], [false, false]]
 *
 * // Version compatibility matrix
 * const clientVersions = ["1.0", "1.1", "2.0"]
 * const serverVersions = ["1.0", "1.1", "2.0"]
 * cartesianProduct(clientVersions)(serverVersions)
 * // All client-server version pairs to test
 *
 * // Partial application for fixed first set
 * const withColors = cartesianProduct(["red", "green", "blue"])
 * withColors(["circle", "square"])  // All color-shape combinations
 * withColors(["small", "large"])    // All color-size combinations
 *
 * // Multiple products (3-way)
 * const triple = (a: any[], b: any[], c: any[]) => {
 *   const pairs = cartesianProduct(a)(b)
 *   return pairs.flatMap(([x, y]) => c.map(z => [x, y, z]))
 * }
 * triple([1, 2], ["a", "b"], [true, false])
 * // All 3-way combinations
 *
 * // Count of result
 * const a = [1, 2, 3, 4]
 * const b = [5, 6, 7]
 * cartesianProduct(a)(b).length
 * // 12 (4 × 3)
 *
 * // Chess board positions
 * const files = ["a", "b", "c", "d", "e", "f", "g", "h"]
 * const ranks = ["1", "2", "3", "4", "5", "6", "7", "8"]
 * cartesianProduct(files)(ranks).map(([f, r]) => f + r)
 * // ["a1", "a2", ..., "h8"] (all 64 squares)
 *
 * // RGB color components
 * const components = [0, 128, 255]
 * const rgbPairs = cartesianProduct(components)(components)
 * const rgbTriples = rgbPairs.flatMap(([r, g]) =>
 *   components.map(b => [r, g, b])
 * )
 * // All 27 RGB combinations
 *
 * // Form field combinations
 * const fieldTypes = ["text", "number", "date"]
 * const validations = ["required", "optional"]
 * cartesianProduct(fieldTypes)(validations)
 * // All field type + validation combinations
 *
 * // A/B test variants
 * const buttonColors = ["blue", "green", "orange"]
 * const buttonTexts = ["Buy Now", "Purchase", "Get Started"]
 * cartesianProduct(buttonColors)(buttonTexts)
 * // All button variant combinations
 *
 * // Network paths
 * const sources = ["serverA", "serverB"]
 * const destinations = ["serverX", "serverY", "serverZ"]
 * cartesianProduct(sources)(destinations)
 * // All possible network routes
 *
 * // Query combinations
 * const operators = ["=", ">", "<", ">=", "<="]
 * const values = [0, 100, null]
 * cartesianProduct(operators)(values)
 * // All operator-value query combinations
 *
 * // Mathematical operations
 * const numbers = [2, 3, 5]
 * const ops = [(a: number, b: number) => a + b, (a: number, b: number) => a * b]
 * cartesianProduct(numbers)(numbers).map(([a, b]) =>
 *   ops.map(op => op(a, b))
 * )
 * // Results of all operations on all pairs
 * ```
 * @property Immutable - doesn't modify input arrays
 * @property Ordered - Preserves order (first array varies slower)
 * @property Complete - Generates all possible pairs
 */
const cartesianProduct = <T, U>(
	array1: ReadonlyArray<T> | null | undefined,
) =>
(
	array2: ReadonlyArray<U> | null | undefined,
): Array<[T, U]> => {
	if (
		array1 == null ||
		!Array.isArray(array1) ||
		array1.length === 0 ||
		array2 == null ||
		!Array.isArray(array2) ||
		array2.length === 0
	) {
		return []
	}

	// Use flatMap for efficient generation
	return array1.flatMap((element1) =>
		array2.map((element2) => [element1, element2] as [T, U])
	)
}

export default cartesianProduct
