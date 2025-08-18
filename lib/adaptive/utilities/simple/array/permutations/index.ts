/**
 * Generates all permutations of an array
 * 
 * Returns all possible orderings of the array elements. For an array of
 * length n, this generates n! (n factorial) permutations. Each permutation
 * contains all the original elements in a different order.
 * 
 * @param array - Array to generate permutations from
 * @returns Array of all possible permutations
 * @example
 * ```typescript
 * // All orderings of 3 elements
 * permutations([1, 2, 3])
 * // [
 * //   [1, 2, 3], [1, 3, 2],
 * //   [2, 1, 3], [2, 3, 1],
 * //   [3, 1, 2], [3, 2, 1]
 * // ]
 * 
 * // String permutations
 * permutations(["a", "b", "c"])
 * // [
 * //   ["a", "b", "c"], ["a", "c", "b"],
 * //   ["b", "a", "c"], ["b", "c", "a"],
 * //   ["c", "a", "b"], ["c", "b", "a"]
 * // ]
 * 
 * // Two elements
 * permutations([1, 2])
 * // [[1, 2], [2, 1]]
 * 
 * // Single element
 * permutations([1])
 * // [[1]]
 * 
 * // Empty array
 * permutations([])
 * // [[]]
 * 
 * // Generate all possible rankings
 * const teams = ["A", "B", "C"]
 * permutations(teams)
 * // All possible finishing orders for teams
 * 
 * // Password combinations from characters
 * permutations(["1", "2", "3", "4"])
 * // 24 different 4-character sequences (4! = 24)
 * 
 * // Task scheduling
 * const tasks = ["wash", "dry", "fold"]
 * permutations(tasks)
 * // All possible task orderings
 * // [
 * //   ["wash", "dry", "fold"],
 * //   ["wash", "fold", "dry"],
 * //   ["dry", "wash", "fold"],
 * //   ["dry", "fold", "wash"],
 * //   ["fold", "wash", "dry"],
 * //   ["fold", "dry", "wash"]
 * // ]
 * 
 * // Seating arrangements
 * const guests = ["Alice", "Bob", "Charlie"]
 * permutations(guests)
 * // All possible seating orders
 * 
 * // Route optimization
 * const stops = ["Home", "Store", "Bank", "Post"]
 * const routes = permutations(stops)
 * // Can evaluate all routes to find shortest
 * 
 * // Handle null/undefined gracefully
 * permutations(null)       // [[]]
 * permutations(undefined)  // [[]]
 * 
 * // Warning: Factorial growth!
 * // permutations([1,2,3]).length       // 6 (3!)
 * // permutations([1,2,3,4]).length     // 24 (4!)
 * // permutations([1,2,3,4,5]).length   // 120 (5!)
 * // permutations(Array(10)).length     // 3,628,800 (10!)
 * 
 * // Anagram generation
 * permutations(["c", "a", "t"])
 * // [
 * //   ["c", "a", "t"], ["c", "t", "a"],
 * //   ["a", "c", "t"], ["a", "t", "c"],
 * //   ["t", "c", "a"], ["t", "a", "c"]
 * // ]
 * // Can join to get: ["cat", "cta", "act", "atc", "tca", "tac"]
 * 
 * // Testing all input orders
 * const inputs = [1, 2, 3]
 * const allOrders = permutations(inputs)
 * // Test function with all possible input orderings
 * 
 * // Duplicate handling - treats each position as unique
 * permutations([1, 1, 2])
 * // [
 * //   [1, 1, 2], [1, 2, 1],
 * //   [1, 1, 2], [1, 2, 1],  // duplicates because elements treated as distinct by position
 * //   [2, 1, 1], [2, 1, 1]
 * // ]
 * ```
 * @property Immutable - doesn't modify input array
 * @property Exhaustive - generates all n! permutations
 * @property Order-sensitive - different orderings are distinct
 * @warning Factorial complexity - be very careful with arrays larger than 10
 */
const permutations = <T>(
	array: ReadonlyArray<T> | null | undefined
): Array<Array<T>> => {
	if (array == null || !Array.isArray(array)) {
		return [[]]
	}
	
	if (array.length === 0) {
		return [[]]
	}
	
	if (array.length === 1) {
		return [[...array]]
	}
	
	// Build permutations recursively
	// For each element, make it the first element and permute the rest
	const buildPermutations = (
		elements: ReadonlyArray<T>
	): Array<Array<T>> => {
		if (elements.length <= 1) {
			return [[...elements]]
		}
		
		// Use reduce to build all permutations
		return elements.reduce<Array<Array<T>>>((acc, element, index) => {
			// Remove current element from array
			const remaining = [
				...elements.slice(0, index),
				...elements.slice(index + 1)
			]
			
			// Get all permutations of remaining elements
			const remainingPerms = buildPermutations(remaining)
			
			// Add current element to front of each permutation
			const currentPerms = remainingPerms.map(perm => [element, ...perm])
			
			return [...acc, ...currentPerms]
		}, [])
	}
	
	return buildPermutations(array)
}

export default permutations