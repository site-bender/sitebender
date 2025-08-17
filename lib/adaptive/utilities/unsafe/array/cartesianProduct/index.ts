/**
 * Returns the Cartesian product of two arrays (all possible pairs)
 * 
 * Creates an array of all possible ordered pairs [a, b] where a is from
 * the first array and b is from the second array. The result length is
 * array1.length × array2.length.
 * 
 * @curried (array2) => (array1) => result
 * @param array2 - Second array for pairing
 * @param array1 - First array for pairing
 * @returns Array of all possible pairs [element1, element2]
 * @example
 * ```typescript
 * // Basic Cartesian product
 * cartesianProduct([3, 4])([1, 2])
 * // [[1, 3], [1, 4], [2, 3], [2, 4]]
 * 
 * // Generate coordinates
 * cartesianProduct(["A", "B", "C"])([1, 2])
 * // [[1, "A"], [1, "B"], [1, "C"], [2, "A"], [2, "B"], [2, "C"]]
 * 
 * // Card deck example
 * const ranks = ["A", "K", "Q", "J"]
 * const suits = ["♠", "♥", "♦", "♣"]
 * cartesianProduct(suits)(ranks)
 * // [["A", "♠"], ["A", "♥"], ["A", "♦"], ["A", "♣"],
 * //  ["K", "♠"], ["K", "♥"], ["K", "♦"], ["K", "♣"],
 * //  ["Q", "♠"], ["Q", "♥"], ["Q", "♦"], ["Q", "♣"],
 * //  ["J", "♠"], ["J", "♥"], ["J", "♦"], ["J", "♣"]]
 * 
 * // Grid positions
 * const rows = [1, 2, 3]
 * const cols = ["a", "b", "c"]
 * cartesianProduct(cols)(rows)
 * // [[1, "a"], [1, "b"], [1, "c"],
 * //  [2, "a"], [2, "b"], [2, "c"],
 * //  [3, "a"], [3, "b"], [3, "c"]]
 * 
 * // Color combinations
 * const sizes = ["S", "M", "L"]
 * const colors = ["red", "blue"]
 * cartesianProduct(colors)(sizes)
 * // [["S", "red"], ["S", "blue"],
 * //  ["M", "red"], ["M", "blue"],
 * //  ["L", "red"], ["L", "blue"]]
 * 
 * // Empty arrays
 * cartesianProduct([])([1, 2])        // []
 * cartesianProduct([1, 2])([])        // []
 * cartesianProduct([])([])            // []
 * 
 * // Single element arrays
 * cartesianProduct([2])([1])          // [[1, 2]]
 * 
 * // Different types
 * cartesianProduct([true, false])([1, 2, 3])
 * // [[1, true], [1, false], [2, true], [2, false], [3, true], [3, false]]
 * 
 * // Objects
 * const users = [{ name: "Alice" }, { name: "Bob" }]
 * const roles = [{ role: "admin" }, { role: "user" }]
 * cartesianProduct(roles)(users)
 * // [[{ name: "Alice" }, { role: "admin" }],
 * //  [{ name: "Alice" }, { role: "user" }],
 * //  [{ name: "Bob" }, { role: "admin" }],
 * //  [{ name: "Bob" }, { role: "user" }]]
 * 
 * // Partial application for reusable combinations
 * const withSuits = cartesianProduct(["♠", "♥", "♦", "♣"])
 * withSuits(["A", "K"])    // [["A", "♠"], ["A", "♥"], ["A", "♦"], ["A", "♣"], ["K", "♠"], ...]
 * withSuits([2, 3, 4])     // [[2, "♠"], [2, "♥"], ...]
 * 
 * // Generate test cases
 * const inputs = [0, 1, -1]
 * const operations = ["add", "subtract", "multiply"]
 * cartesianProduct(operations)(inputs)
 * // [[0, "add"], [0, "subtract"], [0, "multiply"],
 * //  [1, "add"], [1, "subtract"], [1, "multiply"],
 * //  [-1, "add"], [-1, "subtract"], [-1, "multiply"]]
 * 
 * // Menu combinations
 * const mains = ["burger", "pizza", "salad"]
 * const drinks = ["water", "soda", "juice"]
 * cartesianProduct(drinks)(mains)
 * // All possible meal combinations
 * 
 * // Handle null/undefined gracefully
 * cartesianProduct([1, 2])(null)         // []
 * cartesianProduct([1, 2])(undefined)    // []
 * cartesianProduct(null)([1, 2])         // []
 * cartesianProduct(undefined)([1, 2])    // []
 * ```
 * @property Immutable - doesn't modify input arrays
 * @property Multiplicative - result size is array1.length × array2.length
 * @property Order-preserving - maintains element order in pairs
 */
const cartesianProduct = <T, U>(
	array2: ReadonlyArray<U> | null | undefined
) => (
	array1: ReadonlyArray<T> | null | undefined
): Array<[T, U]> => {
	if (array1 == null || !Array.isArray(array1) || array1.length === 0) {
		return []
	}
	
	if (array2 == null || !Array.isArray(array2) || array2.length === 0) {
		return []
	}
	
	// Use flatMap for efficient generation
	return array1.flatMap(element1 =>
		array2.map(element2 => [element1, element2] as [T, U])
	)
}

export default cartesianProduct