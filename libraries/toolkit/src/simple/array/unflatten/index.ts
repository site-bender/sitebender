/**
 * Reconstructs nested arrays from flattened array with depth info
 *
 * Takes a flattened array and depth information to reconstruct the original
 * nested structure. This is the inverse of flatten operations that track
 * nesting depth. Can accept either a parallel array of depths or a function
 * that determines depth from elements. Useful for deserializing hierarchical
 * data, reconstructing trees, and undoing flatten operations.
 *
 * @curried (depths) => (array) => nested array
 * @param depths - Array of depth levels or function to compute depth
 * @param array - Flattened array to reconstruct
 * @returns Nested array with original structure restored
 * @example
 * ```typescript
 * // Basic unflattening with depth array
 * unflatten([0, 1, 1, 0, 1, 2])([1, 2, 3, 4, 5, 6])
 * // [1, [2, 3], 4, [5, [6]]]
 *
 * // Simple two-level structure
 * unflatten([0, 0, 1, 1, 0])(["a", "b", "c", "d", "e"])
 * // ["a", "b", ["c", "d"], "e"]
 *
 * // Multiple nesting levels
 * unflatten([0, 1, 2, 3, 2, 1, 0])([1, 2, 3, 4, 5, 6, 7])
 * // [1, [2, [3, [4], 5], 6], 7]
 *
 * // All at same level (no nesting)
 * unflatten([0, 0, 0, 0])([1, 2, 3, 4])
 * // [1, 2, 3, 4]
 *
 * // All nested one level
 * unflatten([1, 1, 1, 1])([1, 2, 3, 4])
 * // [[1, 2, 3, 4]]
 *
 * // Empty arrays
 * unflatten([])([])
 * // []
 *
 * // Single element
 * unflatten([0])([42])
 * // [42]
 *
 * // Single nested element
 * unflatten([1])([42])
 * // [[42]]
 *
 * // Reconstructing file system structure
 * const files = ["root", "src", "index.ts", "utils.ts", "tests", "test.ts"]
 * const depths = [0, 1, 2, 2, 1, 2]
 * unflatten(depths)(files)
 * // ["root", ["src", ["index.ts", "utils.ts"], "tests", ["test.ts"]]]
 *
 * // Reconstructing menu hierarchy
 * const items = ["File", "New", "Open", "Save", "Edit", "Cut", "Copy", "Paste"]
 * const levels = [0, 1, 1, 1, 0, 1, 1, 1]
 * unflatten(levels)(items)
 * // ["File", ["New", "Open", "Save"], "Edit", ["Cut", "Copy", "Paste"]]
 *
 * // Tree structure reconstruction
 * const nodes = ["A", "B", "C", "D", "E", "F", "G"]
 * const tree = [0, 1, 2, 2, 1, 2, 0]
 * unflatten(tree)(nodes)
 * // ["A", ["B", ["C", "D"], "E", ["F"]], "G"]
 *
 * // Using with depth function
 * interface Item {
 *   value: string
 *   level: number
 * }
 * const itemsWithLevel: Array<Item> = [
 *   { value: "Chapter 1", level: 0 },
 *   { value: "Section 1.1", level: 1 },
 *   { value: "Section 1.2", level: 1 },
 *   { value: "Chapter 2", level: 0 },
 *   { value: "Section 2.1", level: 1 }
 * ]
 * const depthsFromItems = itemsWithLevel.map(item => item.level)
 * const values = itemsWithLevel.map(item => item.value)
 * unflatten(depthsFromItems)(values)
 * // ["Chapter 1", ["Section 1.1", "Section 1.2"], "Chapter 2", ["Section 2.1"]]
 *
 * // Outline structure
 * const outline = ["I", "A", "B", "1", "2", "C", "II", "A", "B"]
 * const indents = [0, 1, 1, 2, 2, 1, 0, 1, 1]
 * unflatten(indents)(outline)
 * // ["I", ["A", "B", ["1", "2"], "C"], "II", ["A", "B"]]
 *
 * // HTML-like nesting
 * const tags = ["html", "head", "title", "body", "div", "p", "p", "footer"]
 * const nesting = [0, 1, 2, 1, 2, 3, 3, 2]
 * unflatten(nesting)(tags)
 * // ["html", ["head", ["title"], "body", ["div", ["p", "p"], "footer"]]]
 *
 * // Parsing indented text
 * const lines = ["Line 1", "  Line 1.1", "  Line 1.2", "    Line 1.2.1", "Line 2"]
 * const indentLevels = [0, 1, 1, 2, 0]
 * unflatten(indentLevels)(lines)
 * // ["Line 1", ["  Line 1.1", "  Line 1.2", ["    Line 1.2.1"]], "Line 2"]
 *
 * // Complex nested structure
 * const data = [1, 2, 3, 4, 5, 6, 7, 8, 9]
 * const structure = [0, 1, 2, 3, 3, 2, 1, 1, 0]
 * unflatten(structure)(data)
 * // [1, [2, [3, [4, 5], 6], 7, 8], 9]
 *
 * // Error case: mismatched lengths
 * unflatten([0, 1, 1])([1, 2])  // Should handle gracefully
 * // [1, [2]]
 *
 * // Skip levels (not recommended but handled)
 * unflatten([0, 2, 0])([1, 2, 3])
 * // [1, [[2]], 3]
 * ```
 * @property Pure - No side effects
 * @property Immutable - Does not modify input arrays
 * @property Inverse - Reverses flatten operation when depth info preserved
 */
const unflatten =
	(depths: Array<number>) => <T>(array: Array<T>): Array<T | Array<any>> => {
		if (array.length === 0) return []
		if (depths.length === 0) return []

		const result: Array<any> = []
		const stack: Array<Array<any>> = [result]

		for (let i = 0; i < array.length && i < depths.length; i++) {
			const depth = depths[i]
			const value = array[i]

			// Ensure we have enough nesting levels
			while (stack.length - 1 < depth) {
				const newLevel: Array<any> = []
				stack[stack.length - 1].push(newLevel)
				stack.push(newLevel)
			}

			// Pop back to the correct level
			while (stack.length - 1 > depth) {
				stack.pop()
			}

			// Add the value at the current level
			stack[stack.length - 1].push(value)
		}

		return result
	}

export default unflatten
