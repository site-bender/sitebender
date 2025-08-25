/**
 * Reduces a Set to a single value using an accumulator function
 *
 * Iterates through the Set elements, applying the reducer function to
 * accumulate a single result value. This is the Set equivalent of
 * Array.reduce. The iteration order follows the insertion order of
 * elements (Sets maintain insertion order in JavaScript).
 *
 * @curried (fn) => (initial) => (set) => result
 * @param fn - Reducer function (acc, value) => newAcc
 * @param initial - Initial accumulator value
 * @param set - Set to reduce
 * @returns Final accumulated value
 * @example
 * ```typescript
 * // Sum numbers
 * reduce((acc: number, n: number) => acc + n)(0)(new Set([1, 2, 3, 4, 5]))
 * // 15
 *
 * // Product of numbers
 * reduce((acc: number, n: number) => acc * n)(1)(new Set([2, 3, 4]))
 * // 24
 *
 * // Concatenate strings
 * reduce((acc: string, s: string) => acc + s)("")(new Set(["hello", " ", "world"]))
 * // "hello world"
 *
 * // Build array from Set
 * reduce((acc: Array<number>, n: number) => [...acc, n])([])(new Set([1, 2, 3]))
 * // [1, 2, 3]
 *
 * // Count elements
 * reduce((count: number, _: any) => count + 1)(0)(new Set(["a", "b", "c"]))
 * // 3
 *
 * // Find maximum
 * reduce((max: number, n: number) => n > max ? n : max)(-Infinity)(
 *   new Set([3, 1, 4, 1, 5, 9])
 * )
 * // 9
 *
 * // Find minimum
 * reduce((min: number, n: number) => n < min ? n : min)(Infinity)(
 *   new Set([3, 1, 4, 1, 5, 9])
 * )
 * // 1
 *
 * // Build object from Set
 * reduce((obj: Record<string, boolean>, key: string) => ({
 *   ...obj,
 *   [key]: true
 * }))({})(new Set(["feature1", "feature2", "feature3"]))
 * // { feature1: true, feature2: true, feature3: true }
 *
 * // Group by property
 * interface Person { name: string; age: number }
 * reduce((groups: Record<string, Array<Person>>, person: Person) => {
 *   const key = person.age < 18 ? "minor" : "adult"
 *   return {
 *     ...groups,
 *     [key]: [...(groups[key] || []), person]
 *   }
 * })({})(new Set([
 *   { name: "Alice", age: 25 },
 *   { name: "Bob", age: 16 },
 *   { name: "Charlie", age: 30 }
 * ]))
 * // { adult: [{ name: "Alice", age: 25 }, { name: "Charlie", age: 30 }],
 * //   minor: [{ name: "Bob", age: 16 }] }
 *
 * // Calculate average
 * const numbers = new Set([10, 20, 30, 40, 50])
 * const sum = reduce((acc: number, n: number) => acc + n)(0)(numbers)
 * const avg = sum / numbers.size
 * // 30
 *
 * // Collect specific properties
 * reduce((ids: Array<number>, user: { id: number; name: string }) =>
 *   [...ids, user.id]
 * )([])(new Set([
 *   { id: 1, name: "Alice" },
 *   { id: 2, name: "Bob" },
 *   { id: 3, name: "Charlie" }
 * ]))
 * // [1, 2, 3]
 *
 * // Partial application for reusable reducers
 * const sumReducer = reduce((acc: number, n: number) => acc + n)(0)
 * sumReducer(new Set([1, 2, 3]))     // 6
 * sumReducer(new Set([10, 20, 30]))  // 60
 *
 * const joinStrings = reduce((acc: string, s: string) =>
 *   acc ? `${acc}, ${s}` : s
 * )("")
 * joinStrings(new Set(["apple", "banana", "orange"]))
 * // "apple, banana, orange"
 *
 * // Empty Set returns initial value
 * reduce((acc: number, n: number) => acc + n)(42)(new Set())
 * // 42
 *
 * // Build Map from Set
 * reduce((map: Map<string, number>, value: string) => {
 *   map.set(value, value.length)
 *   return map
 * })(new Map())(new Set(["hello", "world", "foo"]))
 * // Map { "hello" => 5, "world" => 5, "foo" => 3 }
 *
 * // Compose operations
 * reduce((result: boolean, value: number) => result && value > 0)(true)(
 *   new Set([1, 2, 3, 4, 5])
 * )
 * // true (all positive)
 *
 * // Handle null/undefined gracefully
 * reduce((acc: number, n: number) => acc + n)(0)(null)       // 0
 * reduce((acc: number, n: number) => acc + n)(0)(undefined)  // 0
 *
 * // Custom data aggregation
 * interface Sale { product: string; amount: number }
 * reduce((total: number, sale: Sale) => total + sale.amount)(0)(
 *   new Set([
 *     { product: "A", amount: 100 },
 *     { product: "B", amount: 200 },
 *     { product: "C", amount: 150 }
 *   ])
 * )
 * // 450
 * ```
 * @property Iterative - processes each element once
 * @property Order-preserving - follows insertion order
 * @property Flexible - accumulator can be any type
 */
const reduce = <T, U>(
	fn: (accumulator: U, value: T) => U,
) =>
(
	initial: U,
) =>
(
	set: Set<T> | null | undefined,
): U => {
	if (set == null || !(set instanceof Set)) {
		return initial
	}

	let accumulator = initial

	for (const element of set) {
		accumulator = fn(accumulator, element)
	}

	return accumulator
}

export default reduce
