/**
 * Reduces an array while a predicate returns true
 *
 * Like reduce but stops processing when the predicate returns false.
 * The predicate receives the current accumulator and element, allowing
 * you to stop based on either the accumulated value or the current element.
 * Useful for short-circuit evaluation, early termination, or conditional
 * aggregation.
 *
 * @curried (predicate) => (reducer) => (initial) => (array) => result
 * @param predicate - Function that determines whether to continue (acc, element) => boolean
 * @param reducer - Reducer function (acc, element, index, array) => newAcc
 * @param initial - Initial accumulator value
 * @param array - Array to reduce
 * @returns Final accumulated value when predicate becomes false or array ends
 * @example
 * ```typescript
 * // Sum until reaching a limit
 * const underLimit = (acc: number) => acc < 100
 * const add = (acc: number, x: number) => acc + x
 * reduceWhile(underLimit)(add)(0)([10, 20, 30, 40, 50, 60])
 * // 60 (stops at 10+20+30 = 60, would exceed 100 with 40)
 *
 * // Take while ascending
 * const isAscending = (acc: { last: number }, x: number) =>
 *   acc.last < x
 * const trackAscending = (acc: { sum: number; last: number }, x: number) =>
 *   ({ sum: acc.sum + x, last: x })
 * reduceWhile(isAscending)(trackAscending)({ sum: 0, last: -Infinity })([1, 3, 5, 4, 7])
 * // { sum: 9, last: 5 } (stops at 4 which breaks ascending)
 *
 * // Collect until specific element
 * const notStop = (_: string[], x: string) => x !== "STOP"
 * const collect = (acc: string[], x: string) => [...acc, x]
 * reduceWhile(notStop)(collect)([]))(["a", "b", "STOP", "c", "d"])
 * // ["a", "b"]
 *
 * // Product until zero
 * const noZero = (_: number, x: number) => x !== 0
 * const multiply = (acc: number, x: number) => acc * x
 * reduceWhile(noZero)(multiply)(1)([2, 3, 4, 0, 5, 6])
 * // 24 (2 * 3 * 4, stops at 0)
 *
 * // Build string until length limit
 * const underLength = (acc: string) => acc.length < 10
 * const concat = (acc: string, x: string) => acc + x
 * reduceWhile(underLength)(concat)("")(["hello", " ", "world", " ", "foo", " ", "bar"])
 * // "hello wor" (stops when would exceed 10 chars)
 *
 * // Parse until invalid
 * const isValid = (acc: { valid: boolean }) => acc.valid
 * const parseNum = (acc: { nums: number[]; valid: boolean }, x: string) => {
 *   const num = parseInt(x)
 *   return {
 *     nums: isNaN(num) ? acc.nums : [...acc.nums, num],
 *     valid: !isNaN(num)
 *   }
 * }
 * reduceWhile(isValid)(parseNum)({ nums: [], valid: true })(["1", "2", "3", "abc", "4"])
 * // { nums: [1, 2, 3], valid: false }
 *
 * // Budget allocation
 * const withinBudget = (acc: { spent: number; budget: number }, cost: number) =>
 *   acc.spent + cost <= acc.budget
 * const allocate = (acc: { spent: number; budget: number; items: string[] }, item: any) => ({
 *   ...acc,
 *   spent: acc.spent + item.cost,
 *   items: [...acc.items, item.name]
 * })
 * const purchases = [
 *   { name: "coffee", cost: 5 },
 *   { name: "lunch", cost: 15 },
 *   { name: "book", cost: 20 },
 *   { name: "movie", cost: 12 }
 * ]
 * reduceWhile(withinBudget)(allocate)({ spent: 0, budget: 35, items: [] })(purchases)
 * // { spent: 20, budget: 35, items: ["coffee", "lunch"] }
 *
 * // Find first failure point
 * const allPass = (acc: { passed: boolean }) => acc.passed
 * const validate = (acc: { results: any[]; passed: boolean }, test: () => boolean) => ({
 *   results: [...acc.results, test()],
 *   passed: test()
 * })
 * const tests = [
 *   () => true,
 *   () => true,
 *   () => false,
 *   () => true
 * ]
 * reduceWhile(allPass)(validate)({ results: [], passed: true })(tests)
 * // { results: [true, true, false], passed: false }
 *
 * // Compound interest until target
 * const belowTarget = (acc: number) => acc < 10000
 * const compound = (acc: number, rate: number) => acc * (1 + rate)
 * reduceWhile(belowTarget)(compound)(1000)([0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1])
 * // 2143.588... (stops after 8 iterations when would exceed 10000)
 *
 * // Process commands until error
 * type State = { value: number; error: boolean }
 * const noError = (state: State) => !state.error
 * const execute = (state: State, cmd: string): State => {
 *   if (cmd === "INC") return { value: state.value + 1, error: false }
 *   if (cmd === "DEC") return { value: state.value - 1, error: false }
 *   if (cmd === "DBL") return { value: state.value * 2, error: false }
 *   return { ...state, error: true }
 * }
 * reduceWhile(noError)(execute)({ value: 5, error: false })(["INC", "DBL", "DEC", "ERR", "INC"])
 * // { value: 11, error: false } (5 -> 6 -> 12 -> 11, stops before ERR)
 *
 * // Empty array
 * reduceWhile((acc) => acc < 100)((acc, x) => acc + x)(0)([])
 * // 0
 *
 * // Predicate false immediately
 * reduceWhile(() => false)((acc, x) => acc + x)(10)([1, 2, 3])
 * // 10 (doesn't process any elements)
 *
 * // All elements processed
 * reduceWhile(() => true)((acc, x) => acc + x)(0)([1, 2, 3, 4, 5])
 * // 15 (same as regular reduce)
 *
 * // Path traversal until dead end
 * const hasNext = (acc: { path: string[]; valid: boolean }) => acc.valid
 * const traverse = (acc: { path: string[]; valid: boolean }, dir: string) => {
 *   const validDirs = ["north", "south", "east", "west"]
 *   return {
 *     path: validDirs.includes(dir) ? [...acc.path, dir] : acc.path,
 *     valid: validDirs.includes(dir)
 *   }
 * }
 * reduceWhile(hasNext)(traverse)({ path: [], valid: true })(
 *   ["north", "east", "south", "up", "west"]
 * )
 * // { path: ["north", "east", "south"], valid: false }
 *
 * // Partial application for common patterns
 * const sumUntil = (limit: number) =>
 *   reduceWhile((acc: number) => acc < limit)((acc, x) => acc + x)(0)
 * sumUntil(50)([10, 10, 10, 10, 10, 10])  // 50
 * sumUntil(25)([10, 10, 10, 10, 10, 10])  // 20
 *
 * const collectUntil = (stopValue: any) =>
 *   reduceWhile((_: any[], x: any) => x !== stopValue)(
 *     (acc, x) => [...acc, x]
 *   )([])
 * collectUntil(null)([1, 2, 3, null, 4, 5])  // [1, 2, 3]
 *
 * // Handle null/undefined gracefully
 * reduceWhile(() => true)((acc, x) => acc + x)(0)(null)       // 0
 * reduceWhile(() => true)((acc, x) => acc + x)(0)(undefined)  // 0
 *
 * // Complex state machine
 * type Token = { type: string; value: any }
 * const isNotError = (state: any) => state.status !== "error"
 * const processToken = (state: any, token: Token) => {
 *   switch (token.type) {
 *     case "number": return { ...state, stack: [...state.stack, token.value] }
 *     case "operator": {
 *       if (state.stack.length < 2) return { ...state, status: "error" }
 *       const [b, a] = state.stack.slice(-2)
 *       const result = token.value === "+" ? a + b : a - b
 *       return { ...state, stack: [...state.stack.slice(0, -2), result] }
 *     }
 *     default: return { ...state, status: "error" }
 *   }
 * }
 * const tokens = [
 *   { type: "number", value: 5 },
 *   { type: "number", value: 3 },
 *   { type: "operator", value: "+" },
 *   { type: "number", value: 2 },
 *   { type: "operator", value: "-" }
 * ]
 * reduceWhile(isNotError)(processToken)({ stack: [], status: "ok" })(tokens)
 * // { stack: [6], status: "ok" } (5 + 3 = 8, 8 - 2 = 6)
 * ```
 * @property Immutable - doesn't modify input array
 * @property Short-circuit - stops when predicate returns false
 * @property Conditional - predicate controls continuation
 */
const reduceWhile = <T, U>(
	predicate: (
		accumulator: U,
		element: T,
		index: number,
		array: ReadonlyArray<T>,
	) => boolean,
) =>
(
	reducer: (
		accumulator: U,
		element: T,
		index: number,
		array: ReadonlyArray<T>,
	) => U,
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

	for (let i = 0; i < array.length; i++) {
		if (!predicate(accumulator, array[i], i, array)) {
			break
		}
		accumulator = reducer(accumulator, array[i], i, array)
	}

	return accumulator
}

export default reduceWhile
