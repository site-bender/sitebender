import type { Pair } from "../../../types/tuple/index.ts"

/**
 * Maps two different functions over the elements of a pair
 * 
 * Applies the first function to the first element and the second function
 * to the second element of a pair, returning a new pair with the transformed
 * values. This is useful when each element of a pair needs different
 * transformations.
 * 
 * The function is curried to allow partial application and composition.
 * 
 * @curried fnSecond => fnFirst => pair => mappedPair
 * @param fnSecond - Function to apply to the second element
 * @param fnFirst - Function to apply to the first element
 * @param pair - The pair to transform
 * @returns A new pair with transformed elements
 * @example
 * ```typescript
 * // Basic transformation
 * bimap(
 *   (s: string) => s.length
 * )(
 *   (n: number) => n * 2
 * )([5, "hello"])
 * // [10, 5]
 * 
 * // Different type transformations
 * bimap(
 *   (b: boolean) => b ? "yes" : "no"
 * )(
 *   (n: number) => n.toString()
 * )([42, true])
 * // ["42", "yes"]
 * 
 * // Key-value pair transformation
 * type Entry = Pair<string, number>
 * const entry: Entry = ["score", 95]
 * 
 * bimap(
 *   (v: number) => v / 100
 * )(
 *   (k: string) => k.toUpperCase()
 * )(entry)
 * // ["SCORE", 0.95]
 * 
 * // Coordinate transformation
 * const polarToCartesian = bimap(
 *   (theta: number) => Math.sin(theta)  // y = sin(θ)
 * )(
 *   (theta: number) => Math.cos(theta)  // x = cos(θ)
 * )
 * 
 * polarToCartesian([Math.PI / 4, Math.PI / 4])
 * // [0.707..., 0.707...]
 * 
 * // Result/Error handling
 * type Result<T, E> = Pair<T | null, E | null>
 * 
 * const processResult = bimap(
 *   (error: string | null) => error ? `Error: ${error}` : "Success"
 * )(
 *   (value: number | null) => value ? value * 100 : 0
 * )
 * 
 * const success: Result<number, string> = [42, null]
 * processResult(success)  // [4200, "Success"]
 * 
 * const failure: Result<number, string> = [null, "Not found"]
 * processResult(failure)  // [0, "Error: Not found"]
 * 
 * // Partial application for specialized transformers
 * const processEntry = bimap((v: number) => v * 1.1)  // Add 10% to value
 * const withTax = processEntry((k: string) => `taxed_${k}`)
 * 
 * withTax(["price", 100])     // ["taxed_price", 110]
 * withTax(["shipping", 20])   // ["taxed_shipping", 22]
 * 
 * // String case conversions
 * const caseConvert = bimap(
 *   (s: string) => s.toLowerCase()
 * )(
 *   (s: string) => s.toUpperCase()
 * )
 * 
 * caseConvert(["Hello", "WORLD"])  // ["HELLO", "world"]
 * 
 * // Date/Time formatting
 * type DateTime = Pair<Date, Date>  // [start, end]
 * const formatDates = bimap(
 *   (d: Date) => d.toTimeString()
 * )(
 *   (d: Date) => d.toDateString()
 * )
 * 
 * const range: DateTime = [new Date(2024, 0, 1), new Date(2024, 0, 2)]
 * formatDates(range)
 * // ["Mon Jan 01 2024", "00:00:00 GMT..."]
 * 
 * // Numeric operations
 * const calculate = bimap(
 *   (y: number) => Math.sqrt(y)
 * )(
 *   (x: number) => x ** 2
 * )
 * 
 * calculate([3, 16])  // [9, 4]
 * 
 * // Object property extraction
 * type User = { name: string; age: number }
 * type Product = { title: string; price: number }
 * 
 * const extract = bimap(
 *   (p: Product) => p.price
 * )(
 *   (u: User) => u.name
 * )
 * 
 * const data: Pair<User, Product> = [
 *   { name: "Alice", age: 30 },
 *   { title: "Book", price: 29.99 }
 * ]
 * extract(data)  // ["Alice", 29.99]
 * 
 * // Validation and parsing
 * const validate = bimap(
 *   (s: string) => /^\d+$/.test(s) ? parseInt(s) : NaN
 * )(
 *   (s: string) => s.trim().length > 0 ? s.trim() : null
 * )
 * 
 * validate(["  hello  ", "123"])     // ["hello", 123]
 * validate(["", "abc"])               // [null, NaN]
 * 
 * // Compose with other tuple functions
 * import { swap } from "../swap"
 * import { compose } from "../../combinator/compose"
 * 
 * const process = compose(
 *   swap,
 *   bimap((y: number) => y + 1)((x: number) => x * 2)
 * )
 * 
 * process([3, 4])  // [5, 6] then [6, 5] after swap
 * 
 * // Identity preservation
 * const identity = bimap(
 *   (x: unknown) => x
 * )(
 *   (x: unknown) => x
 * )
 * 
 * identity([1, "test"])  // [1, "test"]
 * 
 * // Invalid input handling
 * bimap(
 *   (x: number) => x * 2
 * )(
 *   (x: number) => x + 1
 * )(null)
 * // [undefined, undefined]
 * 
 * bimap(
 *   (x: number) => x * 2
 * )(
 *   (x: number) => x + 1
 * )(undefined)
 * // [undefined, undefined]
 * 
 * // Arrays with wrong length
 * bimap(
 *   (x: number) => x * 2
 * )(
 *   (x: number) => x + 1
 * )([1] as unknown as Pair<number, number>)
 * // [2, undefined]
 * 
 * // Async transformations
 * const fetchData = bimap(
 *   (id: string) => fetch(`/api/posts/${id}`)
 * )(
 *   (id: string) => fetch(`/api/user/${id}`)
 * )
 * 
 * const ids: Pair<string, string> = ["user123", "post456"]
 * fetchData(ids)
 * // [Promise<Response>, Promise<Response>]
 * ```
 * @property Pure - No side effects (unless functions have side effects)
 * @property Type-safe - Preserves pair structure
 * @property Curried - Allows partial application
 */
const bimap = <U, V>(
	fnSecond: (value: U) => V
) => <S, T>(
	fnFirst: (value: S) => T
) => (
	pair: Pair<S, U> | null | undefined
): Pair<T, V> => {
	if (pair == null || !Array.isArray(pair)) {
		return [undefined, undefined] as unknown as Pair<T, V>
	}
	
	return [
		fnFirst(pair[0]),
		fnSecond(pair[1])
	]
}

export default bimap