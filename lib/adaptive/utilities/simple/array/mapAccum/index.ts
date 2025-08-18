/**
 * Combines map and reduce, returning both accumulated value and mapped array
 * 
 * Performs a stateful map operation that threads an accumulator through the
 * array from left to right. Each iteration produces both a new accumulator
 * value and a mapped element. Returns a tuple containing the final accumulator
 * and an array of all mapped values. Useful for stateful transformations,
 * running totals with transformations, or any operation that needs both
 * aggregation and mapping.
 * 
 * @curried (fn) => (initial) => (array) => result
 * @param fn - Function that takes accumulator and element, returns [newAcc, mappedValue]
 * @param initial - Initial accumulator value
 * @param array - Array to process
 * @returns Tuple of [finalAccumulator, mappedArray]
 * @example
 * ```typescript
 * // Running sum with differences
 * const sumWithDiff = (acc: number, x: number): [number, number] => 
 *   [acc + x, x - acc]
 * mapAccum(sumWithDiff)(0)([1, 2, 3, 4, 5])
 * // [15, [1, 1, 1, 1, 1]]
 * // Accumulator: 0->1->3->6->10->15
 * // Mapped: [1-0, 2-1, 3-3, 4-6, 5-10]
 * 
 * // Generate indices while summing
 * const indexAndSum = (acc: { sum: number; index: number }, x: number) => 
 *   [{ sum: acc.sum + x, index: acc.index + 1 }, { value: x, index: acc.index }]
 * mapAccum(indexAndSum)({ sum: 0, index: 0 })([10, 20, 30])
 * // [
 * //   { sum: 60, index: 3 },
 * //   [{ value: 10, index: 0 }, { value: 20, index: 1 }, { value: 30, index: 2 }]
 * // ]
 * 
 * // Running average calculation
 * const runningAvg = (acc: { sum: number; count: number }, x: number) => {
 *   const newSum = acc.sum + x
 *   const newCount = acc.count + 1
 *   return [
 *     { sum: newSum, count: newCount },
 *     newSum / newCount
 *   ]
 * }
 * mapAccum(runningAvg)({ sum: 0, count: 0 })([10, 20, 30, 40])
 * // [{ sum: 100, count: 4 }, [10, 15, 20, 25]]
 * 
 * // Fibonacci-like sequence generation
 * const fibonacci = (acc: [number, number], _: any): [[number, number], number] => 
 *   [[acc[1], acc[0] + acc[1]], acc[0]]
 * mapAccum(fibonacci)([0, 1])([1, 2, 3, 4, 5, 6, 7, 8])
 * // [[21, 34], [0, 1, 1, 2, 3, 5, 8, 13]]
 * 
 * // String concatenation with lengths
 * const concatWithLength = (acc: string, x: string): [string, number] => 
 *   [acc + x, acc.length]
 * mapAccum(concatWithLength)("")(["hello", " ", "world", "!"])
 * // ["hello world!", [0, 5, 6, 11]]
 * 
 * // State machine with output
 * type State = "idle" | "active" | "done"
 * const stateMachine = (state: State, input: string): [State, string] => {
 *   if (state === "idle" && input === "start") return ["active", "started"]
 *   if (state === "active" && input === "stop") return ["done", "stopped"]
 *   return [state, "no-op"]
 * }
 * mapAccum(stateMachine)("idle")(["start", "process", "stop", "reset"])
 * // ["done", ["started", "no-op", "stopped", "no-op"]]
 * 
 * // Parse with context
 * const parseWithContext = (context: any, token: string): [any, any] => {
 *   if (token === "{") {
 *     return [{ ...context, depth: context.depth + 1 }, { type: "open", depth: context.depth }]
 *   }
 *   if (token === "}") {
 *     return [{ ...context, depth: context.depth - 1 }, { type: "close", depth: context.depth }]
 *   }
 *   return [context, { type: "value", depth: context.depth, token }]
 * }
 * mapAccum(parseWithContext)({ depth: 0 })(["{", "a", "{", "b", "}", "}"])
 * // [
 * //   { depth: 0 },
 * //   [
 * //     { type: "open", depth: 0 },
 * //     { type: "value", depth: 1, token: "a" },
 * //     { type: "open", depth: 1 },
 * //     { type: "value", depth: 2, token: "b" },
 * //     { type: "close", depth: 2 },
 * //     { type: "close", depth: 1 }
 * //   ]
 * // ]
 * 
 * // Balance tracking
 * const trackBalance = (balance: number, transaction: { type: string; amount: number }) => {
 *   const newBalance = transaction.type === "credit" 
 *     ? balance + transaction.amount 
 *     : balance - transaction.amount
 *   return [newBalance, { ...transaction, balance: newBalance }]
 * }
 * mapAccum(trackBalance)(1000)([
 *   { type: "debit", amount: 100 },
 *   { type: "credit", amount: 500 },
 *   { type: "debit", amount: 200 }
 * ])
 * // [
 * //   1200,
 * //   [
 * //     { type: "debit", amount: 100, balance: 900 },
 * //     { type: "credit", amount: 500, balance: 1400 },
 * //     { type: "debit", amount: 200, balance: 1200 }
 * //   ]
 * // ]
 * 
 * // Line numbering
 * const addLineNumber = (lineNo: number, text: string): [number, string] => 
 *   [lineNo + 1, `${lineNo}: ${text}`]
 * mapAccum(addLineNumber)(1)(["First line", "Second line", "Third line"])
 * // [4, ["1: First line", "2: Second line", "3: Third line"]]
 * 
 * // Unique ID generation
 * const generateId = (nextId: number, item: any): [number, any] => 
 *   [nextId + 1, { ...item, id: nextId }]
 * mapAccum(generateId)(1000)([
 *   { name: "Alice" },
 *   { name: "Bob" },
 *   { name: "Charlie" }
 * ])
 * // [
 * //   1003,
 * //   [
 * //     { name: "Alice", id: 1000 },
 * //     { name: "Bob", id: 1001 },
 * //     { name: "Charlie", id: 1002 }
 * //   ]
 * // ]
 * 
 * // Empty array
 * mapAccum((acc: number, x: number) => [acc + x, x * 2])(10)([])
 * // [10, []]
 * 
 * // Single element
 * mapAccum((acc: string, x: string) => [acc + x, acc])("init")(["value"])
 * // ["initvalue", ["init"]]
 * 
 * // Accumulate errors while processing
 * const processWithErrors = (
 *   acc: { errors: string[]; count: number }, 
 *   x: number
 * ): [{ errors: string[]; count: number }, number | null] => {
 *   if (x < 0) {
 *     return [
 *       { errors: [...acc.errors, `Invalid: ${x}`], count: acc.count },
 *       null
 *     ]
 *   }
 *   return [
 *     { errors: acc.errors, count: acc.count + 1 },
 *     x * 2
 *   ]
 * }
 * mapAccum(processWithErrors)({ errors: [], count: 0 })([1, -2, 3, -4, 5])
 * // [
 * //   { errors: ["Invalid: -2", "Invalid: -4"], count: 3 },
 * //   [2, null, 6, null, 10]
 * // ]
 * 
 * // Path tracking in tree traversal
 * const trackPath = (path: string[], node: { name: string }): [string[], string] => {
 *   const newPath = [...path, node.name]
 *   return [newPath, newPath.join("/")]
 * }
 * mapAccum(trackPath)([])([
 *   { name: "root" },
 *   { name: "users" },
 *   { name: "admin" }
 * ])
 * // [
 * //   ["root", "users", "admin"],
 * //   ["root", "root/users", "root/users/admin"]
 * // ]
 * 
 * // Partial application for reusable accumulators
 * const withRunningTotal = mapAccum(
 *   (sum: number, x: number) => [sum + x, { value: x, runningTotal: sum + x }]
 * )
 * withRunningTotal(0)([10, 20, 30])
 * // [60, [
 * //   { value: 10, runningTotal: 10 },
 * //   { value: 20, runningTotal: 30 },
 * //   { value: 30, runningTotal: 60 }
 * // ]]
 * 
 * // Handle null/undefined gracefully
 * mapAccum((acc: number, x: number) => [acc + x, x])(0)(null)       // [0, []]
 * mapAccum((acc: number, x: number) => [acc + x, x])(0)(undefined)  // [0, []]
 * 
 * // Complex state accumulation
 * type Stats = { min: number; max: number; sum: number; count: number }
 * const updateStats = (stats: Stats, x: number): [Stats, number] => {
 *   const newStats = {
 *     min: Math.min(stats.min, x),
 *     max: Math.max(stats.max, x),
 *     sum: stats.sum + x,
 *     count: stats.count + 1
 *   }
 *   const avg = newStats.sum / newStats.count
 *   return [newStats, avg]
 * }
 * mapAccum(updateStats)(
 *   { min: Infinity, max: -Infinity, sum: 0, count: 0 }
 * )([5, 10, 3, 8, 12])
 * // [
 * //   { min: 3, max: 12, sum: 38, count: 5 },
 * //   [5, 7.5, 6, 6.5, 7.6]
 * // ]
 * 
 * // Token parsing with lookahead
 * const parseTokens = (prev: string | null, curr: string): [string, string] => {
 *   if (prev === "(" && curr === ")") return [curr, "empty-parens"]
 *   if (prev === "[" && curr === "]") return [curr, "empty-brackets"]
 *   return [curr, curr]
 * }
 * mapAccum(parseTokens)(null)(["(", ")", "[", "]", "x"])
 * // ["x", ["(", "empty-parens", "[", "empty-brackets", "x"]]
 * ```
 * @property Immutable - doesn't modify input array
 * @property Stateful - threads accumulator through operations
 * @property Dual-output - returns both accumulator and mapped values
 */
const mapAccum = <T, U, V>(
	fn: (accumulator: U, element: T) => [U, V]
) => (
	initial: U
) => (
	array: ReadonlyArray<T> | null | undefined
): [U, Array<V>] => {
	if (array == null || !Array.isArray(array)) {
		return [initial, []]
	}
	
	let accumulator = initial
	const result: Array<V> = []
	
	for (const element of array) {
		const [newAccumulator, mappedValue] = fn(accumulator, element)
		accumulator = newAccumulator
		result.push(mappedValue)
	}
	
	return [accumulator, result]
}

export default mapAccum