/**
 * Filters a Set based on a predicate function
 * 
 * Creates a new Set containing only the elements that satisfy the predicate.
 * The predicate receives each element and should return true to keep it.
 * This is the Set equivalent of Array.filter, maintaining immutability.
 * 
 * @curried (predicate) => (set) => newSet
 * @param predicate - Function that returns true for elements to keep
 * @param set - Set to filter
 * @returns New Set with only elements that satisfy the predicate
 * @example
 * ```typescript
 * // Filter numbers
 * filter((n: number) => n > 2)(new Set([1, 2, 3, 4, 5]))
 * // Set { 3, 4, 5 }
 * 
 * // Filter even numbers
 * filter((n: number) => n % 2 === 0)(new Set([1, 2, 3, 4, 5, 6]))
 * // Set { 2, 4, 6 }
 * 
 * // Filter strings by length
 * filter((s: string) => s.length > 3)(new Set(["hi", "hello", "hey", "world"]))
 * // Set { "hello", "world" }
 * 
 * // Filter objects by property
 * filter((obj: { active: boolean }) => obj.active)(
 *   new Set([
 *     { id: 1, active: true },
 *     { id: 2, active: false },
 *     { id: 3, active: true }
 *   ])
 * )
 * // Set { { id: 1, active: true }, { id: 3, active: true } }
 * 
 * // Filter with type checking
 * filter((x: unknown): x is number => typeof x === "number")(
 *   new Set([1, "two", 3, true, 4])
 * )
 * // Set { 1, 3, 4 }
 * 
 * // Filter nullish values
 * filter((x: any) => x != null)(new Set([1, null, 2, undefined, 3]))
 * // Set { 1, 2, 3 }
 * 
 * // Complex predicate
 * interface User { name: string; age: number; role: string }
 * filter((user: User) => user.age >= 18 && user.role === "admin")(
 *   new Set([
 *     { name: "Alice", age: 25, role: "admin" },
 *     { name: "Bob", age: 17, role: "admin" },
 *     { name: "Charlie", age: 30, role: "user" }
 *   ])
 * )
 * // Set { { name: "Alice", age: 25, role: "admin" } }
 * 
 * // Filter dates
 * const after2024 = filter((date: Date) => date.getFullYear() >= 2024)
 * after2024(new Set([
 *   new Date("2023-01-01"),
 *   new Date("2024-01-01"),
 *   new Date("2025-01-01")
 * ]))
 * // Set { Date("2024-01-01"), Date("2025-01-01") }
 * 
 * // Partial application for reusable filters
 * const keepPositive = filter((n: number) => n > 0)
 * keepPositive(new Set([1, -2, 3, -4, 5]))  // Set { 1, 3, 5 }
 * keepPositive(new Set([-1, -2, -3]))       // Set { }
 * 
 * // Filter with regex
 * const startsWithA = filter((s: string) => /^A/i.test(s))
 * startsWithA(new Set(["Alice", "Bob", "Anna", "Charlie"]))
 * // Set { "Alice", "Anna" }
 * 
 * // Empty Set
 * filter((x: number) => x > 0)(new Set())
 * // Set { }
 * 
 * // All filtered out
 * filter((x: number) => x > 10)(new Set([1, 2, 3]))
 * // Set { }
 * 
 * // All kept
 * filter((x: number) => x > 0)(new Set([1, 2, 3]))
 * // Set { 1, 2, 3 }
 * 
 * // Handle null/undefined gracefully
 * filter((x: number) => x > 0)(null)       // Set { }
 * filter((x: number) => x > 0)(undefined)  // Set { }
 * 
 * // Symbols and special values
 * filter((x: any) => x !== undefined)(
 *   new Set([1, undefined, Symbol("test"), NaN, null])
 * )
 * // Set { 1, Symbol(test), NaN, null }
 * ```
 * @property Immutable - returns new Set, doesn't modify original
 * @property Selective - only includes elements that pass the predicate
 * @property Type-safe - supports type predicates for narrowing
 */
const filter = <T>(
	predicate: (value: T) => boolean
) => (
	set: Set<T> | null | undefined
): Set<T> => {
	if (set == null || !(set instanceof Set)) {
		return new Set()
	}
	
	const result = new Set<T>()
	
	for (const element of set) {
		if (predicate(element)) {
			result.add(element)
		}
	}
	
	return result
}

export default filter