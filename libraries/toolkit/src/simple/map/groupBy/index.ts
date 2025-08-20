/**
 * Groups Map entries by a key function result
 * 
 * Creates a new Map where keys are the results of the grouping function
 * and values are Maps containing all entries that produced that group key.
 * This is useful for categorizing, partitioning, or organizing Map data
 * based on computed properties.
 * 
 * @curried (keyFn) => (map) => grouped map
 * @param keyFn - Function that computes the group key from each entry
 * @param map - The Map to group
 * @returns Map of group keys to Maps of original entries
 * @example
 * ```typescript
 * // Basic usage - group by value property
 * const users = new Map([
 *   ["alice", { name: "Alice", dept: "Engineering" }],
 *   ["bob", { name: "Bob", dept: "Sales" }],
 *   ["charlie", { name: "Charlie", dept: "Engineering" }],
 *   ["diana", { name: "Diana", dept: "Sales" }]
 * ])
 * 
 * const byDept = groupBy((user: any) => user.dept)
 * byDept(users)
 * // Map {
 * //   "Engineering" => Map { "alice" => {...}, "charlie" => {...} },
 * //   "Sales" => Map { "bob" => {...}, "diana" => {...} }
 * // }
 * 
 * // Group by computed property
 * const scores = new Map([
 *   ["alice", 95],
 *   ["bob", 72],
 *   ["charlie", 88],
 *   ["diana", 91],
 *   ["eve", 65]
 * ])
 * 
 * const byGrade = groupBy((score: number) => {
 *   if (score >= 90) return "A"
 *   if (score >= 80) return "B"
 *   if (score >= 70) return "C"
 *   return "F"
 * })
 * byGrade(scores)
 * // Map {
 * //   "A" => Map { "alice" => 95, "diana" => 91 },
 * //   "C" => Map { "bob" => 72 },
 * //   "B" => Map { "charlie" => 88 },
 * //   "F" => Map { "eve" => 65 }
 * // }
 * 
 * // Group using both key and value
 * const items = new Map([
 *   ["item1", { category: "electronics", price: 199 }],
 *   ["item2", { category: "books", price: 29 }],
 *   ["item3", { category: "electronics", price: 99 }],
 *   ["item4", { category: "books", price: 39 }]
 * ])
 * 
 * groupBy((item: any, key: string) => 
 *   key.startsWith("item") ? item.category : "other"
 * )(items)
 * // Map {
 * //   "electronics" => Map { "item1" => {...}, "item3" => {...} },
 * //   "books" => Map { "item2" => {...}, "item4" => {...} }
 * // }
 * 
 * // Empty Map
 * groupBy((v: any) => "group")(new Map())
 * // Map {}
 * 
 * // Single group
 * const same = new Map([["a", 1], ["b", 1], ["c", 1]])
 * groupBy((v: number) => v)(same)
 * // Map { 1 => Map { "a" => 1, "b" => 1, "c" => 1 } }
 * 
 * // All different groups
 * const unique = new Map([["a", 1], ["b", 2], ["c", 3]])
 * groupBy((v: number) => v)(unique)
 * // Map {
 * //   1 => Map { "a" => 1 },
 * //   2 => Map { "b" => 2 },
 * //   3 => Map { "c" => 3 }
 * // }
 * 
 * // Group by value ranges
 * const ages = new Map([
 *   ["alice", 25],
 *   ["bob", 35],
 *   ["charlie", 42],
 *   ["diana", 28],
 *   ["eve", 55]
 * ])
 * 
 * const byAgeGroup = groupBy((age: number) => {
 *   if (age < 30) return "20s"
 *   if (age < 40) return "30s"
 *   if (age < 50) return "40s"
 *   return "50+"
 * })
 * byAgeGroup(ages)
 * // Map {
 * //   "20s" => Map { "alice" => 25, "diana" => 28 },
 * //   "30s" => Map { "bob" => 35 },
 * //   "40s" => Map { "charlie" => 42 },
 * //   "50+" => Map { "eve" => 55 }
 * // }
 * 
 * // Group by string patterns
 * const files = new Map([
 *   ["index.ts", 100],
 *   ["utils.ts", 200],
 *   ["styles.css", 50],
 *   ["main.css", 75],
 *   ["README.md", 25]
 * ])
 * 
 * const byExtension = groupBy((_, filename: string) => {
 *   const ext = filename.split(".").pop()
 *   return ext || "no-extension"
 * })
 * byExtension(files)
 * // Map {
 * //   "ts" => Map { "index.ts" => 100, "utils.ts" => 200 },
 * //   "css" => Map { "styles.css" => 50, "main.css" => 75 },
 * //   "md" => Map { "README.md" => 25 }
 * // }
 * 
 * // Using with pipe
 * import { pipe } from "../../combinator/pipe/index.ts"
 * import { map } from "../map/index.ts"
 * 
 * const orders = new Map([
 *   ["order1", { customer: "Alice", total: 150, status: "shipped" }],
 *   ["order2", { customer: "Bob", total: 75, status: "pending" }],
 *   ["order3", { customer: "Alice", total: 200, status: "delivered" }],
 *   ["order4", { customer: "Bob", total: 100, status: "shipped" }]
 * ])
 * 
 * const ordersByCustomer = pipe(
 *   orders,
 *   groupBy((order: any) => order.customer),
 *   map((customerOrders: Map<string, any>) => ({
 *     count: customerOrders.size,
 *     total: [...customerOrders.values()].reduce((sum, o) => sum + o.total, 0)
 *   }))
 * )
 * // Map {
 * //   "Alice" => { count: 2, total: 350 },
 * //   "Bob" => { count: 2, total: 175 }
 * // }
 * 
 * // Group dates by month
 * const events = new Map([
 *   ["event1", new Date("2024-01-15")],
 *   ["event2", new Date("2024-01-20")],
 *   ["event3", new Date("2024-02-10")],
 *   ["event4", new Date("2024-02-25")],
 *   ["event5", new Date("2024-03-05")]
 * ])
 * 
 * const byMonth = groupBy((date: Date) => 
 *   `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`
 * )
 * byMonth(events)
 * // Map {
 * //   "2024-01" => Map { "event1" => Date(...), "event2" => Date(...) },
 * //   "2024-02" => Map { "event3" => Date(...), "event4" => Date(...) },
 * //   "2024-03" => Map { "event5" => Date(...) }
 * // }
 * 
 * // Group by boolean condition
 * const numbers = new Map([
 *   ["a", 1],
 *   ["b", 2],
 *   ["c", 3],
 *   ["d", 4],
 *   ["e", 5]
 * ])
 * 
 * const evenOdd = groupBy((n: number) => n % 2 === 0 ? "even" : "odd")
 * evenOdd(numbers)
 * // Map {
 * //   "odd" => Map { "a" => 1, "c" => 3, "e" => 5 },
 * //   "even" => Map { "b" => 2, "d" => 4 }
 * // }
 * 
 * // Group by multiple criteria
 * const products = new Map([
 *   ["p1", { category: "electronics", brand: "A", price: 199 }],
 *   ["p2", { category: "electronics", brand: "B", price: 299 }],
 *   ["p3", { category: "books", brand: "A", price: 29 }],
 *   ["p4", { category: "electronics", brand: "A", price: 99 }]
 * ])
 * 
 * const byCategoryAndBrand = groupBy((product: any) => 
 *   `${product.category}:${product.brand}`
 * )
 * byCategoryAndBrand(products)
 * // Map {
 * //   "electronics:A" => Map { "p1" => {...}, "p4" => {...} },
 * //   "electronics:B" => Map { "p2" => {...} },
 * //   "books:A" => Map { "p3" => {...} }
 * // }
 * 
 * // Group with null/undefined keys
 * const nullable = new Map([
 *   ["a", { group: "one" }],
 *   ["b", { group: null }],
 *   ["c", { group: "one" }],
 *   ["d", { group: undefined }],
 *   ["e", { group: "two" }]
 * ])
 * 
 * groupBy((item: any) => item.group ?? "no-group")(nullable)
 * // Map {
 * //   "one" => Map { "a" => {...}, "c" => {...} },
 * //   "no-group" => Map { "b" => {...}, "d" => {...} },
 * //   "two" => Map { "e" => {...} }
 * // }
 * 
 * // Partial application for reuse
 * const groupByStatus = groupBy((item: any) => item.status)
 * 
 * const tasks = new Map([
 *   ["task1", { title: "Task 1", status: "pending" }],
 *   ["task2", { title: "Task 2", status: "completed" }],
 *   ["task3", { title: "Task 3", status: "pending" }]
 * ])
 * 
 * groupByStatus(tasks)
 * // Map {
 * //   "pending" => Map { "task1" => {...}, "task3" => {...} },
 * //   "completed" => Map { "task2" => {...} }
 * // }
 * 
 * // Group by first letter
 * const words = new Map([
 *   ["apple", 5],
 *   ["apricot", 7],
 *   ["banana", 6],
 *   ["cherry", 6],
 *   ["coconut", 7]
 * ])
 * 
 * const byFirstLetter = groupBy((_, word: string) => word[0].toUpperCase())
 * byFirstLetter(words)
 * // Map {
 * //   "A" => Map { "apple" => 5, "apricot" => 7 },
 * //   "B" => Map { "banana" => 6 },
 * //   "C" => Map { "cherry" => 6, "coconut" => 7 }
 * // }
 * 
 * // Statistical grouping
 * const samples = new Map([
 *   ["s1", 10.5],
 *   ["s2", 8.2],
 *   ["s3", 12.7],
 *   ["s4", 9.8],
 *   ["s5", 11.3]
 * ])
 * 
 * const mean = [...samples.values()].reduce((a, b) => a + b, 0) / samples.size
 * const byMean = groupBy((value: number) => 
 *   value > mean ? "above" : "below"
 * )
 * byMean(samples)
 * // Map {
 * //   "above" => Map { "s3" => 12.7, "s5" => 11.3 },
 * //   "below" => Map { "s1" => 10.5, "s2" => 8.2, "s4" => 9.8 }
 * // }
 * 
 * // Complex grouping with analysis
 * const logs = new Map([
 *   ["log1", { level: "error", timestamp: 1000, message: "Error 1" }],
 *   ["log2", { level: "info", timestamp: 1100, message: "Info 1" }],
 *   ["log3", { level: "error", timestamp: 1200, message: "Error 2" }],
 *   ["log4", { level: "warning", timestamp: 1300, message: "Warning 1" }]
 * ])
 * 
 * const logsByLevel = pipe(
 *   logs,
 *   groupBy((log: any) => log.level)
 * )
 * // Further process each group
 * const analysis = new Map(
 *   [...logsByLevel].map(([level, entries]) => [
 *     level,
 *     {
 *       count: entries.size,
 *       latest: Math.max(...[...entries.values()].map(l => l.timestamp))
 *     }
 *   ])
 * )
 * // Map {
 * //   "error" => { count: 2, latest: 1200 },
 * //   "info" => { count: 1, latest: 1100 },
 * //   "warning" => { count: 1, latest: 1300 }
 * // }
 * 
 * // Type safety
 * interface Person {
 *   name: string
 *   age: number
 *   city: string
 * }
 * 
 * const people = new Map<string, Person>([
 *   ["p1", { name: "Alice", age: 30, city: "NYC" }],
 *   ["p2", { name: "Bob", age: 25, city: "LA" }],
 *   ["p3", { name: "Charlie", age: 35, city: "NYC" }]
 * ])
 * 
 * const byCity: Map<string, Map<string, Person>> = 
 *   groupBy<string, Person, string>((person) => person.city)(people)
 * // Type-safe grouping
 * 
 * // Performance with large Maps
 * const large = new Map(
 *   Array.from({ length: 10000 }, (_, i) => [`key${i}`, i % 100])
 * )
 * const grouped = groupBy((v: number) => `group${v}`)(large)
 * // Map with 100 groups, each containing ~100 entries
 * ```
 * @property Pure - Creates new Maps, doesn't modify original
 * @property Curried - Allows partial application
 * @property Flexible - Group key computed from both key and value
 */
const groupBy = <K, V, G>(
	keyFn: (value: V, key: K) => G
) =>
	(map: Map<K, V>): Map<G, Map<K, V>> => {
		const groups = new Map<G, Map<K, V>>()
		
		for (const [key, value] of map) {
			const groupKey = keyFn(value, key)
			
			if (!groups.has(groupKey)) {
				groups.set(groupKey, new Map())
			}
			
			groups.get(groupKey)!.set(key, value)
		}
		
		return groups
	}

export default groupBy