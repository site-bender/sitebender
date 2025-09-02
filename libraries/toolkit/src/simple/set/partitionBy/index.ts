/**
 * Partition set by predicate into multiple sets
 *
 * Splits a Set into two Sets based on a predicate function. Returns a tuple
 * where the first Set contains elements that satisfy the predicate and the
 * second contains those that don't. Useful for filtering, categorization,
 * and set operations.
 *
 * @curried (predicate) => (set) => [matching, nonMatching]
 * @param predicate - Function that tests each element
 * @param set - Set to partition
 * @returns Tuple of two sets: [matching, nonMatching]
 * @example
 * ```typescript
 * // Partition numbers by even/odd
 * const isEven = (n: number) => n % 2 === 0
 * partitionBy(isEven)(new Set([1, 2, 3, 4, 5, 6]))
 * // [Set { 2, 4, 6 }, Set { 1, 3, 5 }]
 *
 * // Partition by sign
 * const isPositive = (n: number) => n > 0
 * partitionBy(isPositive)(new Set([-2, -1, 0, 1, 2]))
 * // [Set { 1, 2 }, Set { -2, -1, 0 }]
 *
 * // Partition strings by length
 * const isLong = (s: string) => s.length > 3
 * partitionBy(isLong)(new Set(["a", "test", "hi", "hello", "world"]))
 * // [Set { "test", "hello", "world" }, Set { "a", "hi" }]
 *
 * // Empty set
 * partitionBy(isEven)(new Set())
 * // [Set {}, Set {}]
 *
 * // All match
 * partitionBy(isEven)(new Set([2, 4, 6, 8]))
 * // [Set { 2, 4, 6, 8 }, Set {}]
 *
 * // None match
 * partitionBy(isEven)(new Set([1, 3, 5, 7]))
 * // [Set {}, Set { 1, 3, 5, 7 }]
 *
 * // Boolean values
 * const isTrue = (b: boolean) => b === true
 * partitionBy(isTrue)(new Set([true, false, true]))
 * // [Set { true }, Set { false }]
 * // Note: Sets deduplicate, so only one true and one false
 *
 * // Partition by type
 * const isString = (x: unknown): x is string => typeof x === "string"
 * partitionBy(isString)(new Set([1, "hello", true, "world", 42]))
 * // [Set { "hello", "world" }, Set { 1, true, 42 }]
 *
 * // Null and undefined handling
 * const isNullish = (x: unknown) => x == null
 * partitionBy(isNullish)(new Set([null, 0, undefined, "", false]))
 * // [Set { null, undefined }, Set { 0, "", false }]
 *
 * // Object references
 * interface User {
 *   name: string
 *   active: boolean
 * }
 * const users = new Set([
 *   { name: "Alice", active: true },
 *   { name: "Bob", active: false },
 *   { name: "Charlie", active: true }
 * ])
 * const isActive = (u: User) => u.active
 * const [active, inactive] = partitionBy(isActive)(users)
 * // active: Set { {name: "Alice", ...}, {name: "Charlie", ...} }
 * // inactive: Set { {name: "Bob", ...} }
 *
 * // Partition characters
 * const isVowel = (c: string) => "aeiouAEIOU".includes(c)
 * partitionBy(isVowel)(new Set([..."hello world"]))
 * // [Set { "e", "o" }, Set { "h", "l", " ", "w", "r", "d" }]
 *
 * // Partition by range
 * const isInRange = (n: number) => n >= 10 && n <= 20
 * partitionBy(isInRange)(new Set([5, 10, 15, 20, 25]))
 * // [Set { 10, 15, 20 }, Set { 5, 25 }]
 *
 * // Complex predicate
 * const isPrime = (n: number) => {
 *   if (n < 2) return false
 *   for (let i = 2; i <= Math.sqrt(n); i++) {
 *     if (n % i === 0) return false
 *   }
 *   return true
 * }
 * partitionBy(isPrime)(new Set([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]))
 * // [Set { 2, 3, 5, 7 }, Set { 1, 4, 6, 8, 9, 10 }]
 *
 * // Destructuring result
 * const numbers = new Set([1, 2, 3, 4, 5, 6])
 * const [evens, odds] = partitionBy(isEven)(numbers)
 * // evens: Set { 2, 4, 6 }
 * // odds: Set { 1, 3, 5 }
 *
 * // Chaining operations
 * const original = new Set([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
 * const [small, large] = partitionBy((n: number) => n <= 5)(original)
 * const [evenSmall, oddSmall] = partitionBy(isEven)(small)
 * // evenSmall: Set { 2, 4 }
 * // oddSmall: Set { 1, 3, 5 }
 *
 * // Email validation
 * const emails = new Set([
 *   "alice@example.com",
 *   "invalid-email",
 *   "bob@test.org",
 *   "not.an.email"
 * ])
 * const isValidEmail = (s: string) => s.includes("@") && s.includes(".")
 * const [valid, invalid] = partitionBy(isValidEmail)(emails)
 * // valid: Set { "alice@example.com", "bob@test.org" }
 * // invalid: Set { "invalid-email", "not.an.email" }
 *
 * // Symbols
 * const sym1 = Symbol("test")
 * const sym2 = Symbol("test")
 * const sym3 = Symbol("other")
 * const symbols = new Set([sym1, sym2, sym3, "not-symbol"])
 * const isSymbol = (x: unknown): x is symbol => typeof x === "symbol"
 * partitionBy(isSymbol)(symbols)
 * // [Set { Symbol(test), Symbol(test), Symbol(other) }, Set { "not-symbol" }]
 * ```
 * @property Pure - No side effects
 * @property Immutable - Does not modify input set
 * @property Type-safe - Preserves element types
 */
const partitionBy =
	<T>(predicate: (value: T) => boolean) => (set: Set<T>): [Set<T>, Set<T>] => {
		const matching = new Set<T>()
		const nonMatching = new Set<T>()

		for (const value of set) {
			if (predicate(value)) {
				matching.add(value)
			} else {
				nonMatching.add(value)
			}
		}

		return [matching, nonMatching]
	}

export default partitionBy
