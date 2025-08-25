/**
 * Reduces an array from right to left to a single value
 *
 * Like reduce but processes the array from right to left. Applies a function
 * against an accumulator and each element in the array (from right to left)
 * to reduce it to a single value. This is useful for right-associative
 * operations, building values from the end, or when the order of processing
 * matters.
 *
 * @curried (fn) => (initial) => (array) => result
 * @param fn - Reducer function (accumulator, element, index, array) => newAccumulator
 * @param initial - Initial accumulator value
 * @param array - Array to reduce
 * @returns Final accumulated value
 * @example
 * ```typescript
 * // Basic right-to-left reduction
 * const subtract = (acc: number, x: number) => acc - x
 * reduceRight(subtract)(0)([1, 2, 3, 4])
 * // 0 - 4 - 3 - 2 - 1 = -10
 * // Compare with reduce: 0 - 1 - 2 - 3 - 4 = -10 (same for commutative)
 *
 * // String concatenation (order matters)
 * const concat = (acc: string, x: string) => acc + x
 * reduceRight(concat)("")(["a", "b", "c", "d"])
 * // "dcba"
 * // Compare with reduce: "abcd"
 *
 * // Build nested structure from right
 * type Node = { value: string; next: Node | null }
 * const buildList = (next: Node | null, value: string): Node => ({ value, next })
 * reduceRight(buildList)(null as Node | null)(["a", "b", "c"])
 * // { value: "a", next: { value: "b", next: { value: "c", next: null } } }
 *
 * // Right-associative operations
 * const power = (acc: number, x: number) => Math.pow(x, acc)
 * reduceRight(power)(1)([2, 3, 2])
 * // 2^(3^(2^1)) = 2^9 = 512
 * // Compare with reduce: ((2^3)^2)^1 = 64
 *
 * // Build path from segments
 * const buildPath = (acc: string, segment: string) =>
 *   acc ? `${segment}/${acc}` : segment
 * reduceRight(buildPath)("")(["usr", "local", "bin", "node"])
 * // "usr/local/bin/node"
 *
 * // Process with index
 * const withIndex = (acc: string[], val: string, idx: number) =>
 *   [...acc, `${idx}:${val}`]
 * reduceRight(withIndex)([] as string[])(["a", "b", "c"])
 * // ["2:c", "1:b", "0:a"]
 *
 * // Compose functions right-to-left
 * const double = (x: number) => x * 2
 * const addOne = (x: number) => x + 1
 * const square = (x: number) => x * x
 * const functions = [double, addOne, square]
 * const compose = reduceRight(
 *   (acc: (x: number) => number, fn: (x: number) => number) =>
 *     (x: number) => fn(acc(x))
 * )((x: number) => x)
 * const composed = compose(functions)
 * composed(3)
 * // double(addOne(square(3))) = double(addOne(9)) = double(10) = 20
 *
 * // Build expression tree
 * type Expr = { op: string; left: any; right: any } | number
 * const operators = ["+", "-", "*"]
 * const values = [1, 2, 3, 4]
 * const buildExpr = (right: Expr, val: number, idx: number): Expr =>
 *   idx < operators.length
 *     ? { op: operators[idx], left: val, right }
 *     : val
 * reduceRight(buildExpr)(4 as Expr)(values.slice(0, 3))
 * // { op: "+", left: 1, right: { op: "-", left: 2, right: { op: "*", left: 3, right: 4 } } }
 *
 * // Parenthesization
 * const parens = (acc: string, x: string) => `(${x}${acc})`
 * reduceRight(parens)("")(["a", "b", "c"])
 * // "(a(b(c)))"
 *
 * // Build HTML from inside out
 * const wrapTag = (inner: string, tag: string) => `<${tag}>${inner}</${tag}>`
 * reduceRight(wrapTag)("content")(["div", "section", "main"])
 * // "<div><section><main>content</main></section></div>"
 *
 * // Accumulate from the end
 * const suffixSums = (sums: number[], val: number): number[] => {
 *   const sum = val + (sums[0] || 0)
 *   return [sum, ...sums]
 * }
 * reduceRight(suffixSums)([] as number[])([1, 2, 3, 4, 5])
 * // [15, 14, 12, 9, 5]
 *
 * // Empty array returns initial
 * reduceRight((acc, x) => acc + x)(10)([])
 * // 10
 *
 * // Single element
 * reduceRight((acc: number, x: number) => acc * x)(2)([5])
 * // 10
 *
 * // Reverse without reverse
 * const reverseArray = <T>(xs: Array<T>): Array<T> =>
 *   reduceRight((acc: Array<T>, x: T) => [...acc, x])([] as Array<T>)(xs)
 * reverseArray([1, 2, 3, 4])
 * // [4, 3, 2, 1]
 *
 * // Find last matching with context
 * const findLastWithContext = (
 *   acc: { found: any; after: any[] },
 *   val: any
 * ): { found: any; after: any[] } => {
 *   if (acc.found) return { ...acc, after: [val, ...acc.after] }
 *   if (val > 10) return { found: val, after: [] }
 *   return acc
 * }
 * reduceRight(findLastWithContext)({ found: null, after: [] })([5, 12, 8, 15, 3])
 * // { found: 15, after: [3] }
 *
 * // Partial application for common patterns
 * const concatRight = reduceRight((acc: string, x: string) => acc + x)
 * concatRight("")(["1", "2", "3"])  // "321"
 * concatRight("-")(["a", "b", "c"])  // "cba-"
 *
 * const composeAll = reduceRight(
 *   (acc: Function, fn: Function) => (x: any) => fn(acc(x))
 * )((x: any) => x)
 *
 * // Handle null/undefined gracefully
 * reduceRight((acc, x) => acc + x)(0)(null)       // 0
 * reduceRight((acc, x) => acc + x)(0)(undefined)  // 0
 *
 * // Matrix operations (right-to-left)
 * const matrices = [
 *   [[1, 2], [3, 4]],
 *   [[5, 6], [7, 8]]
 * ]
 * // Simplified matrix multiply placeholder
 * const matrixMultiply = (acc: number[][], m: number[][]) => {
 *   // Actual implementation would do matrix multiplication
 *   return m
 * }
 * reduceRight(matrixMultiply)([[1, 0], [0, 1]])(matrices)
 *
 * // Build command chain
 * const commands = ["save", "validate", "process", "load"]
 * const chainCommands = (next: string, cmd: string) =>
 *   next ? `${cmd} && ${next}` : cmd
 * reduceRight(chainCommands)("")(commands)
 * // "load && process && validate && save"
 *
 * // Lazy evaluation simulation
 * const lazyOps = [
 *   (x: number) => { console.log("double"); return x * 2 },
 *   (x: number) => { console.log("add 3"); return x + 3 },
 *   (x: number) => { console.log("square"); return x * x }
 * ]
 * const lazyCompose = reduceRight(
 *   (acc: (x: number) => number, fn: (x: number) => number) =>
 *     (x: number) => fn(acc(x))
 * )((x: number) => x)(lazyOps)
 * // Execution happens in reverse order when called
 *
 * // Tree folding from right
 * const tree = [1, [2, [3, [4, [5]]]]]
 * const flattenTree = (acc: any[], item: any): any[] =>
 *   Array.isArray(item)
 *     ? reduceRight(flattenTree)(acc)(item)
 *     : [item, ...acc]
 * // Would flatten nested structure from right
 * ```
 * @property Immutable - doesn't modify input array
 * @property Right-associative - processes elements right-to-left
 * @property Initial-required - requires initial accumulator value
 */
const reduceRight = <T, U>(
	fn: (accumulator: U, element: T, index: number, array: ReadonlyArray<T>) => U,
) =>
(
	initial: U,
) =>
(
	array: ReadonlyArray<T> | null | undefined,
): U => {
	if (array == null || !Array.isArray(array)) {
		return initial
	}

	let accumulator = initial

	for (let i = array.length - 1; i >= 0; i--) {
		accumulator = fn(accumulator, array[i], i, array)
	}

	return accumulator
}

export default reduceRight
