/**
 * Splits a Map into two Maps based on a predicate
 *
 * Divides a Map into two separate Maps: one containing all entries that
 * satisfy the predicate (truthy), and another containing all entries that
 * don't (falsy). The predicate function receives both value and key for
 * each entry. Returns a tuple with the satisfying Map first and the
 * non-satisfying Map second.
 *
 * @curried (predicate) => (map) => [satisfies, doesNotSatisfy]
 * @param predicate - Function that returns true for entries in the first Map
 * @param map - The Map to partition
 * @returns A tuple of two Maps: [satisfying, non-satisfying]
 * @example
 * ```typescript
 * // Basic numeric partition
 * const scores = new Map([
 *   ["Alice", 95],
 *   ["Bob", 72],
 *   ["Charlie", 88],
 *   ["David", 65]
 * ])
 * const [passing, failing] = partition((score: number) => score >= 80)(scores)
 * // passing: Map { "Alice" => 95, "Charlie" => 88 }
 * // failing: Map { "Bob" => 72, "David" => 65 }
 *
 * // Partition by key pattern
 * const config = new Map([
 *   ["app.name", "MyApp"],
 *   ["app.version", "1.0"],
 *   ["_debug", true],
 *   ["_internal", "secret"],
 *   ["user.theme", "dark"]
 * ])
 * const [public, private] = partition(
 *   (_: any, key: string) => !key.startsWith("_")
 * )(config)
 * // public: Map { "app.name" => "MyApp", "app.version" => "1.0", "user.theme" => "dark" }
 * // private: Map { "_debug" => true, "_internal" => "secret" }
 *
 * // Partition objects by property
 * const users = new Map([
 *   [1, { name: "Alice", active: true, role: "admin" }],
 *   [2, { name: "Bob", active: false, role: "user" }],
 *   [3, { name: "Charlie", active: true, role: "user" }],
 *   [4, { name: "David", active: false, role: "admin" }]
 * ])
 * const [activeUsers, inactiveUsers] = partition(
 *   (user: any) => user.active
 * )(users)
 * // activeUsers: Map { 1 => {...}, 3 => {...} }
 * // inactiveUsers: Map { 2 => {...}, 4 => {...} }
 *
 * // Partition by both key and value
 * const inventory = new Map([
 *   ["apple:fruit", 50],
 *   ["carrot:vegetable", 0],
 *   ["banana:fruit", 25],
 *   ["lettuce:vegetable", 10]
 * ])
 * const [inStock, outOfStock] = partition(
 *   (count: number, key: string) => count > 0 && key.includes("fruit")
 * )(inventory)
 * // inStock: Map { "apple:fruit" => 50, "banana:fruit" => 25 }
 * // outOfStock: Map { "carrot:vegetable" => 0, "lettuce:vegetable" => 10 }
 *
 * // String value partition
 * const translations = new Map([
 *   ["hello", "bonjour"],
 *   ["goodbye", ""],
 *   ["yes", "oui"],
 *   ["no", ""],
 *   ["please", "s'il vous plaît"]
 * ])
 * const [translated, untranslated] = partition(
 *   (trans: string) => trans.length > 0
 * )(translations)
 * // translated: Map { "hello" => "bonjour", "yes" => "oui", "please" => "s'il vous plaît" }
 * // untranslated: Map { "goodbye" => "", "no" => "" }
 *
 * // Empty Map
 * const [empty1, empty2] = partition((v: any) => true)(new Map())
 * // empty1: Map {}
 * // empty2: Map {}
 *
 * // All satisfy
 * const positive = new Map([["a", 1], ["b", 2], ["c", 3]])
 * const [all, none] = partition((n: number) => n > 0)(positive)
 * // all: Map { "a" => 1, "b" => 2, "c" => 3 }
 * // none: Map {}
 *
 * // None satisfy
 * const negative = new Map([["a", -1], ["b", -2], ["c", -3]])
 * const [none2, all2] = partition((n: number) => n > 0)(negative)
 * // none2: Map {}
 * // all2: Map { "a" => -1, "b" => -2, "c" => -3 }
 *
 * // Using with pipe and destructuring
 * import { pipe } from "../../combinator/pipe/index.ts"
 *
 * const products = new Map([
 *   ["A", { price: 199, inStock: true }],
 *   ["B", { price: 99, inStock: false }],
 *   ["C", { price: 299, inStock: true }],
 *   ["D", { price: 149, inStock: true }]
 * ])
 *
 * const processInventory = pipe(
 *   products,
 *   partition((p: any) => p.inStock),
 *   ([available, unavailable]) => ({
 *     available: available.size,
 *     unavailable: unavailable.size,
 *     availableValue: Array.from(available.values())
 *       .reduce((sum, p) => sum + p.price, 0)
 *   })
 * )
 * // { available: 3, unavailable: 1, availableValue: 647 }
 *
 * // Date-based partition
 * const events = new Map([
 *   [new Date("2024-01-15"), "Meeting"],
 *   [new Date("2024-06-20"), "Conference"],
 *   [new Date("2024-03-10"), "Workshop"],
 *   [new Date("2024-08-05"), "Seminar"]
 * ])
 * const midYear = new Date("2024-06-01")
 * const [firstHalf, secondHalf] = partition(
 *   (_: string, date: Date) => date < midYear
 * )(events)
 * // firstHalf: Map with January and March events
 * // secondHalf: Map with June and August events
 *
 * // Numeric key partition
 * const numbered = new Map([
 *   [1, "one"],
 *   [2, "two"],
 *   [3, "three"],
 *   [4, "four"],
 *   [5, "five"]
 * ])
 * const [even, odd] = partition(
 *   (_: string, key: number) => key % 2 === 0
 * )(numbered)
 * // even: Map { 2 => "two", 4 => "four" }
 * // odd: Map { 1 => "one", 3 => "three", 5 => "five" }
 *
 * // Complex predicate
 * const servers = new Map([
 *   ["srv1", { cpu: 45, memory: 60, status: "healthy" }],
 *   ["srv2", { cpu: 85, memory: 90, status: "warning" }],
 *   ["srv3", { cpu: 20, memory: 30, status: "healthy" }],
 *   ["srv4", { cpu: 95, memory: 95, status: "critical" }]
 * ])
 * const [healthy, unhealthy] = partition(
 *   (server: any) => server.cpu < 80 && server.memory < 80
 * )(servers)
 * // healthy: Map { "srv1" => {...}, "srv3" => {...} }
 * // unhealthy: Map { "srv2" => {...}, "srv4" => {...} }
 *
 * // Partial application for reuse
 * const partitionByThreshold = (threshold: number) =>
 *   partition((value: number) => value >= threshold)
 *
 * const temps = new Map([
 *   ["room1", 18],
 *   ["room2", 22],
 *   ["room3", 20],
 *   ["room4", 25]
 * ])
 *
 * const [warm, cold] = partitionByThreshold(20)(temps)
 * // warm: Map { "room2" => 22, "room3" => 20, "room4" => 25 }
 * // cold: Map { "room1" => 18 }
 *
 * // Permission check
 * const permissions = new Map([
 *   ["read", { granted: true, level: 1 }],
 *   ["write", { granted: false, level: 2 }],
 *   ["delete", { granted: false, level: 3 }],
 *   ["admin", { granted: true, level: 4 }]
 * ])
 * const [granted, denied] = partition(
 *   (perm: any) => perm.granted
 * )(permissions)
 * // granted: Map { "read" => {...}, "admin" => {...} }
 * // denied: Map { "write" => {...}, "delete" => {...} }
 *
 * // Filter with partition for analysis
 * const transactions = new Map([
 *   ["tx1", { amount: 100, type: "credit" }],
 *   ["tx2", { amount: -50, type: "debit" }],
 *   ["tx3", { amount: 200, type: "credit" }],
 *   ["tx4", { amount: -75, type: "debit" }]
 * ])
 * const [credits, debits] = partition(
 *   (tx: any) => tx.type === "credit"
 * )(transactions)
 * const creditTotal = Array.from(credits.values())
 *   .reduce((sum, tx) => sum + tx.amount, 0)
 * const debitTotal = Array.from(debits.values())
 *   .reduce((sum, tx) => sum + tx.amount, 0)
 * // creditTotal: 300, debitTotal: -125
 *
 * // Symbol keys
 * const sym1 = Symbol("public")
 * const sym2 = Symbol("private")
 * const sym3 = Symbol("public")
 * const symMap = new Map([
 *   [sym1, "value1"],
 *   [sym2, "value2"],
 *   [sym3, "value3"]
 * ])
 * const [publicSyms, privateSyms] = partition(
 *   (_: string, key: symbol) => key.toString().includes("public")
 * )(symMap)
 * // publicSyms: Map with sym1 and sym3
 * // privateSyms: Map with sym2
 *
 * // Validation partition
 * const inputs = new Map([
 *   ["email", "user@example.com"],
 *   ["phone", "123"],
 *   ["name", "Alice"],
 *   ["age", ""]
 * ])
 * const [valid, invalid] = partition(
 *   (value: string, key: string) => {
 *     if (key === "email") return value.includes("@")
 *     if (key === "phone") return value.length >= 10
 *     return value.length > 0
 *   }
 * )(inputs)
 * // valid: Map { "email" => "user@example.com", "name" => "Alice" }
 * // invalid: Map { "phone" => "123", "age" => "" }
 *
 * // Type safety
 * const typed = new Map<string, number>([
 *   ["a", 1],
 *   ["b", 2],
 *   ["c", 3]
 * ])
 * const [high, low]: [Map<string, number>, Map<string, number>] =
 *   partition<string, number>((n) => n > 1)(typed)
 * // high: Map<string, number> { "b" => 2, "c" => 3 }
 * // low: Map<string, number> { "a" => 1 }
 *
 * // Use in data processing
 * const processData = (data: Map<string, any>) => {
 *   const [valid, invalid] = partition(
 *     (item: any) => item !== null && item !== undefined
 *   )(data)
 *
 *   return {
 *     validCount: valid.size,
 *     invalidCount: invalid.size,
 *     validKeys: Array.from(valid.keys()),
 *     invalidKeys: Array.from(invalid.keys())
 *   }
 * }
 * ```
 * @property Pure - Creates new Maps, doesn't modify original
 * @property Curried - Allows partial application
 * @property Complementary - All entries appear in exactly one result Map
 */
const partition = <K, V>(
	predicate: (value: V, key: K) => boolean,
) =>
(map: Map<K, V>): [Map<K, V>, Map<K, V>] => {
	const satisfies = new Map<K, V>()
	const doesNotSatisfy = new Map<K, V>()

	for (const [key, value] of map) {
		if (predicate(value, key)) {
			satisfies.set(key, value)
		} else {
			doesNotSatisfy.set(key, value)
		}
	}

	return [satisfies, doesNotSatisfy]
}

export default partition
