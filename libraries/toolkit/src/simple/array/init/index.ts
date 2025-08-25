import dropLast from "../dropLast/index.ts"

/**
 * Returns all elements of an array except the last
 * 
 * Returns a new array containing all elements except the last one.
 * This is the Haskell term for getting the initial portion of a list,
 * complementing `tail` (all but first) and `last` (final element).
 * Empty arrays return empty arrays. Single-element arrays return
 * empty arrays.
 * 
 * @param array - The array to get the initial elements from
 * @returns New array with all elements except the last
 * @example
 * ```typescript
 * // Basic usage
 * init([1, 2, 3, 4])
 * // [1, 2, 3]
 * 
 * // String array
 * init(["a", "b", "c"])
 * // ["a", "b"]
 * 
 * // Single element returns empty
 * init([42])
 * // []
 * 
 * // Empty array returns empty
 * init([])
 * // []
 * 
 * // Two elements
 * init([1, 2])
 * // [1]
 * 
 * // Remove trailing sentinel
 * const data = [10, 20, 30, -1]  // -1 is sentinel
 * init(data)
 * // [10, 20, 30]
 * 
 * // Process all but last line
 * const lines = ["header", "data1", "data2", "footer"]
 * init(lines)
 * // ["header", "data1", "data2"]
 * 
 * // Recursive processing pattern
 * const processAllButLast = <T>(arr: Array<T>): void => {
 *   if (arr.length <= 1) return
 *   const initial = init(arr)
 *   const lastElement = arr[arr.length - 1]
 *   // Process initial elements differently from last
 * }
 * 
 * // Path traversal
 * const path = ["root", "users", "john", "documents", "file.txt"]
 * const directory = init(path)  // Get directory path
 * // ["root", "users", "john", "documents"]
 * const filename = path[path.length - 1]
 * // "file.txt"
 * 
 * // Remove trailing punctuation token
 * const tokens = ["Hello", "world", "!"]
 * init(tokens)
 * // ["Hello", "world"]
 * 
 * // Breadcrumb navigation
 * const breadcrumbs = ["Home", "Products", "Electronics", "Phones"]
 * const parentPath = init(breadcrumbs)
 * // ["Home", "Products", "Electronics"]
 * 
 * // Undo last action
 * const actions = ["create", "edit", "save", "delete"]
 * const withoutLastAction = init(actions)
 * // ["create", "edit", "save"]
 * 
 * // Mixed types
 * init([1, "two", { three: 3 }, [4]])
 * // [1, "two", { three: 3 }]
 * 
 * // Handle null/undefined gracefully
 * init(null)       // []
 * init(undefined)  // []
 * 
 * // Classic FP pattern with head/tail/init/last
 * const arr = [1, 2, 3, 4, 5]
 * // head(arr) = 1        (first element)
 * // tail(arr) = [2,3,4,5] (all but first)
 * // init(arr) = [1,2,3,4] (all but last)
 * // last(arr) = 5        (last element)
 * 
 * // Build pairs for comparison
 * const values = [10, 20, 30, 40]
 * const withPrevious = init(values).map((v, i) => [v, values[i + 1]])
 * // [[10, 20], [20, 30], [30, 40]]
 * 
 * // Remove terminator
 * const protocol = ["START", "DATA", "DATA", "END"]
 * init(protocol)
 * // ["START", "DATA", "DATA"]
 * ```
 * @property Immutable - doesn't modify input array
 * @property Haskell-derived - Classic FP list operation
 * @property Safe - Returns empty array for empty/single-element inputs
 */
const init = <T>(array: ReadonlyArray<T> | null | undefined): Array<T> => {
	if (array === null || array === undefined) {
		return []
	}
	return dropLast<T>(1)(array as Array<T>)
}

export default init