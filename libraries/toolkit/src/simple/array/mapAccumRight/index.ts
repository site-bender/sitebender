/**
 * Like mapAccum but processes the array from right to left
 *
 * Performs a stateful map operation that threads an accumulator through the
 * array from right to left. Each iteration produces both a new accumulator
 * value and a mapped element. Returns a tuple containing the final accumulator
 * and an array of all mapped values (in original left-to-right order). Useful
 * for operations that need to process elements with knowledge of what comes
 * after, suffix operations, or right-associative transformations.
 *
 * @curried (fn) => (initial) => (array) => result
 * @param fn - Function that takes accumulator and element, returns [newAcc, mappedValue]
 * @param initial - Initial accumulator value
 * @param array - Array to process
 * @returns Tuple of [finalAccumulator, mappedArray]
 * @example
 * ```typescript
 * // Suffix sums
 * const suffixSum = (acc: number, x: number): [number, number] =>
 *   [acc + x, acc + x]
 * mapAccumRight(suffixSum)(0)([1, 2, 3, 4, 5])
 * // [15, [15, 14, 12, 9, 5]]
 * // Processing: 5->4->3->2->1
 * // Results kept in original order
 *
 * // Build path from end
 * const buildPath = (path: string, segment: string): [string, string] => {
 *   const newPath = path ? `${segment}/${path}` : segment
 *   return [newPath, newPath]
 * }
 * mapAccumRight(buildPath)("")(["usr", "local", "bin", "node"])
 * // ["usr/local/bin/node", ["usr/local/bin/node", "local/bin/node", "bin/node", "node"]]
 *
 * // Parenthesis matching from right
 * const matchParens = (stack: string[], char: string): [string[], string] => {
 *   if (char === ")") return [[...stack, char], "open"]
 *   if (char === "(" && stack.length > 0) {
 *     const newStack = [...stack]
 *     newStack.pop()
 *     return [newStack, "close"]
 *   }
 *   return [stack, "neutral"]
 * }
 * mapAccumRight(matchParens)([])("(a(b)c)".split(""))
 * // [[], ["close", "neutral", "close", "neutral", "open", "neutral", "open"]]
 *
 * // Count elements after each position
 * const countAfter = (count: number, _: any): [number, number] =>
 *   [count + 1, count]
 * mapAccumRight(countAfter)(0)(["a", "b", "c", "d"])
 * // [4, [3, 2, 1, 0]]
 *
 * // Cascade multiplication from right
 * const cascadeMult = (acc: number, x: number): [number, number] => {
 *   const product = x * (acc || 1)
 *   return [product, product]
 * }
 * mapAccumRight(cascadeMult)(1)([2, 3, 4])
 * // [24, [24, 12, 4]]
 *
 * // Build nested structure from right
 * const buildNested = (inner: any, value: string): [any, any] => {
 *   const node = { value, child: inner }
 *   return [node, node]
 * }
 * mapAccumRight(buildNested)(null)(["a", "b", "c"])
 * // [
 * //   { value: "a", child: { value: "b", child: { value: "c", child: null } } },
 * //   [
 * //     { value: "a", child: { value: "b", child: { value: "c", child: null } } },
 * //     { value: "b", child: { value: "c", child: null } },
 * //     { value: "c", child: null }
 * //   ]
 * // ]
 *
 * // Right-to-left state machine
 * type State = "start" | "middle" | "end"
 * const rightStateMachine = (state: State, char: string): [State, string] => {
 *   if (state === "start" && char === "!") return ["middle", "exclamation"]
 *   if (state === "middle" && /[a-z]/.test(char)) return ["end", "letter"]
 *   return [state, "other"]
 * }
 * mapAccumRight(rightStateMachine)("start")(["h", "e", "l", "l", "o", "!"])
 * // ["end", ["letter", "letter", "letter", "letter", "letter", "exclamation"]]
 *
 * // Calculate future values
 * const futureMax = (maxSoFar: number, x: number): [number, number] => {
 *   const newMax = Math.max(maxSoFar, x)
 *   return [newMax, maxSoFar]
 * }
 * mapAccumRight(futureMax)(-Infinity)([3, 1, 4, 1, 5, 9, 2])
 * // [9, [9, 9, 9, 9, 9, 2, -Infinity]]
 * // Each position shows the maximum value that comes after it
 *
 * // Generate decreasing indices
 * const decrementIndex = (idx: number, item: any): [number, any] =>
 *   [idx - 1, { ...item, index: idx }]
 * mapAccumRight(decrementIndex)(2)([
 *   { name: "first" },
 *   { name: "second" },
 *   { name: "third" }
 * ])
 * // [
 * //   -1,
 * //   [
 * //     { name: "first", index: 0 },
 * //     { name: "second", index: 1 },
 * //     { name: "third", index: 2 }
 * //   ]
 * // ]
 *
 * // Suffix string concatenation
 * const suffixConcat = (suffix: string, x: string): [string, string] => {
 *   const combined = x + suffix
 *   return [combined, combined]
 * }
 * mapAccumRight(suffixConcat)("")(["a", "b", "c"])
 * // ["abc", ["abc", "bc", "c"]]
 *
 * // Check if sorted from position
 * const isSortedFrom = (prev: number | null, curr: number): [number, boolean] => {
 *   const sorted = prev === null || curr <= prev
 *   return [curr, sorted]
 * }
 * mapAccumRight(isSortedFrom)(null)([1, 2, 3, 2, 1])
 * // [1, [true, true, false, false, true]]
 *
 * // Empty array
 * mapAccumRight((acc: number, x: number) => [acc + x, x * 2])(10)([])
 * // [10, []]
 *
 * // Single element
 * mapAccumRight((acc: string, x: string) => [acc + x, acc])("end")(["value"])
 * // ["endvalue", ["end"]]
 *
 * // Propagate errors backward
 * const propagateError = (
 *   hasError: boolean,
 *   x: number
 * ): [boolean, string] => {
 *   if (x < 0) return [true, "error"]
 *   return [hasError, hasError ? "affected" : "ok"]
 * }
 * mapAccumRight(propagateError)(false)([1, 2, -3, 4, 5])
 * // [true, ["affected", "affected", "error", "ok", "ok"]]
 *
 * // Calculate remaining sum at each position
 * const remainingSum = (sum: number, x: number): [number, number] =>
 *   [sum + x, sum]
 * mapAccumRight(remainingSum)(0)([10, 20, 30, 40])
 * // [100, [90, 70, 40, 0]]
 *
 * // Build reverse polish notation
 * const toRPN = (stack: string[], token: string): [string[], string] => {
 *   if (/\d/.test(token)) return [stack, token]
 *   if (["+", "-", "*", "/"].includes(token)) {
 *     return [[...stack, token], `op:${token}`]
 *   }
 *   return [stack, "unknown"]
 * }
 * mapAccumRight(toRPN)([])("3 4 + 2 *".split(" "))
 * // [["*", "+"], ["3", "4", "op:+", "2", "op:*"]]
 *
 * // Partial application for reusable right accumulators
 * const withSuffixProduct = mapAccumRight(
 *   (product: number, x: number) => [product * x, product * x]
 * )
 * withSuffixProduct(1)([2, 3, 4])
 * // [24, [24, 12, 4]]
 *
 * // Handle null/undefined gracefully
 * mapAccumRight((acc: number, x: number) => [acc + x, x])(0)(null)       // [0, []]
 * mapAccumRight((acc: number, x: number) => [acc + x, x])(0)(undefined)  // [0, []]
 *
 * // Complex backward dependency
 * type Context = { depth: number; inBlock: boolean }
 * const parseBackward = (ctx: Context, char: string): [Context, string] => {
 *   if (char === "}") {
 *     return [{ depth: ctx.depth + 1, inBlock: true }, `close:${ctx.depth + 1}`]
 *   }
 *   if (char === "{") {
 *     return [{ depth: Math.max(0, ctx.depth - 1), inBlock: false }, `open:${ctx.depth}`]
 *   }
 *   return [ctx, ctx.inBlock ? `in:${char}` : `out:${char}`]
 * }
 * mapAccumRight(parseBackward)({ depth: 0, inBlock: false })(["{", "a", "b", "}"])
 * // [
 * //   { depth: 0, inBlock: false },
 * //   ["open:1", "in:a", "in:b", "close:1"]
 * // ]
 *
 * // Calculate span to end
 * const spanToEnd = (count: number, x: string): [number, number] => {
 *   const newCount = count + x.length
 *   return [newCount, newCount]
 * }
 * mapAccumRight(spanToEnd)(0)(["hello", " ", "world"])
 * // [11, [11, 6, 5]]
 *
 * // Find last occurrence tracking
 * const lastOccurrence = (
 *   lastIdx: number | null,
 *   item: string
 * ): [number | null, boolean] => {
 *   if (item === "target" && lastIdx === null) {
 *     return [item.length, true]
 *   }
 *   return [lastIdx, lastIdx !== null]
 * }
 * mapAccumRight(lastOccurrence)(null)(["a", "target", "b", "target", "c"])
 * // [6, [false, false, false, true, false]]
 * ```
 * @property Immutable - doesn't modify input array
 * @property Right-to-left - processes elements from end to start
 * @property Original-order - mapped array maintains left-to-right order
 */
const mapAccumRight = <T, U, V>(
	fn: (accumulator: U, element: T) => [U, V],
) =>
(
	initial: U,
) =>
(
	array: ReadonlyArray<T> | null | undefined,
): [U, Array<V>] => {
	if (array == null || !Array.isArray(array)) {
		return [initial, []]
	}

	let accumulator = initial
	const result: Array<V> = []

	// Process from right to left
	for (let i = array.length - 1; i >= 0; i--) {
		const [newAccumulator, mappedValue] = fn(accumulator, array[i])
		accumulator = newAccumulator
		// Build result in reverse to maintain original order
		result.unshift(mappedValue)
	}

	return [accumulator, result]
}

export default mapAccumRight
