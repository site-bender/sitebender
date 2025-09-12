/**
 * Filters a Map based on a predicate function
 *
 * Creates a new Map containing only the key-value pairs that satisfy the
 * predicate function. The predicate receives both the value and key for
 * each entry. This function is curried to allow partial application and
 * composition in functional pipelines.
 *
 * @param predicate - Function that returns true for entries to keep
 * @param map - The Map to filter
 * @returns A new Map with only entries that satisfy the predicate
 * @example
 * ```typescript
 * // Basic usage - filter by value
 * const scores = new Map([["Alice", 95], ["Bob", 72], ["Charlie", 88]])
 * const passingScores = filter((score: number) => score >= 80)
 * passingScores(scores)
 * // Map { "Alice" => 95, "Charlie" => 88 }
 *
 * // Filter using both value and key
 * const data = new Map([
 *   ["user:1", { name: "Alice", age: 30 }],
 *   ["admin:1", { name: "Bob", age: 35 }],
 *   ["user:2", { name: "Charlie", age: 25 }]
 * ])
 * filter((value, key) => key.startsWith("user"))(data)
 * // Map { "user:1" => {...}, "user:2" => {...} }
 *
 * // Filter by value properties
 * const users = new Map([
 *   [1, { name: "Alice", active: true }],
 *   [2, { name: "Bob", active: false }],
 *   [3, { name: "Charlie", active: true }]
 * ])
 * filter((user: any) => user.active)(users)
 * // Map { 1 => {name:"Alice", active:true}, 3 => {name:"Charlie", active:true} }
 *
 * // Using with pipe
 * import pipe from "../../combinator/pipe/index.ts"
 *
 * const inventory = new Map([
 *   ["apple", { count: 50, price: 1.99 }],
 *   ["banana", { count: 0, price: 0.59 }],
 *   ["orange", { count: 25, price: 2.49 }]
 * ])
 *
 * pipe(
 *   inventory,
 *   filter((item: any) => item.count > 0),
 *   filter((item: any) => item.price < 2.50)
 * )
 * // Map { "apple" => {...} }
 *
 * // Partial application for reuse
 * const filterActive = filter((item: any) => item.active)
 * filterActive(new Map([
 *   ["sess1", { user: "Alice", active: true }],
 *   ["sess2", { user: "Bob", active: false }]
 * ]))
 * // Map { "sess1" => {...} }
 *
 * // Complex predicate with multiple conditions
 * const products = new Map([
 *   ["A", { category: "electronics", price: 199, inStock: true }],
 *   ["B", { category: "electronics", price: 99, inStock: true }]
 * ])
 *
 * filter((product: any) =>
 *   product.category === "electronics" &&
 *   product.price < 150 &&
 *   product.inStock
 * )(products)
 * // Map { "B" => {category:"electronics", price:99, inStock:true} }
 *
 * // Filter by key pattern
 * const config = new Map([
 *   ["app.name", "MyApp"],
 *   ["_debug", true],
 *   ["user.theme", "dark"]
 * ])
 * filter((_, key) => !key.startsWith("_"))(config)
 * // Map { "app.name" => "MyApp", "user.theme" => "dark" }
 * ```
 * @pure
 * @curried
 * @immutable
 */
const filter = <K, V>(
	predicate: (value: V, key: K) => boolean,
) =>
(map: Map<K, V>): Map<K, V> => {
	return new Map(
		[...map.entries()].filter(([key, value]) => predicate(value, key)),
	)
}

export default filter
