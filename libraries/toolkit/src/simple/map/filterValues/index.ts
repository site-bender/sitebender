/**
 * Filters a Map based on a value predicate
 * 
 * Creates a new Map containing only the key-value pairs whose values satisfy
 * the predicate function. This is a specialized version of filter that only
 * examines values, making it clearer and more efficient when filtering is
 * based solely on value properties.
 * 
 * @curried (predicate) => (map) => result
 * @param predicate - Function that returns true for values to keep
 * @param map - The Map to filter
 * @returns A new Map with only entries whose values satisfy the predicate
 * @example
 * ```typescript
 * // Basic usage - filter by value
 * const scores = new Map([
 *   ["Alice", 95],
 *   ["Bob", 72],
 *   ["Charlie", 88],
 *   ["Diana", 91]
 * ])
 * const highScores = filterValues((score: number) => score >= 90)
 * highScores(scores)
 * // Map { "Alice" => 95, "Diana" => 91 }
 * 
 * // Filter by value type
 * const mixed = new Map([
 *   ["a", 1],
 *   ["b", "hello"],
 *   ["c", 2],
 *   ["d", "world"],
 *   ["e", 3]
 * ])
 * filterValues((v: any) => typeof v === "number")(mixed)
 * // Map { "a" => 1, "c" => 2, "e" => 3 }
 * 
 * // Filter object values by property
 * const users = new Map([
 *   ["user1", { name: "Alice", active: true, age: 30 }],
 *   ["user2", { name: "Bob", active: false, age: 25 }],
 *   ["user3", { name: "Charlie", active: true, age: 35 }]
 * ])
 * filterValues((user: any) => user.active && user.age >= 30)(users)
 * // Map { "user1" => {...}, "user3" => {...} }
 * 
 * // Empty Map
 * filterValues((v: any) => true)(new Map())
 * // Map {}
 * 
 * // No matches
 * const numbers = new Map([["a", 1], ["b", 2], ["c", 3]])
 * filterValues((n: number) => n > 10)(numbers)
 * // Map {}
 * 
 * // All values match
 * const positive = new Map([["a", 1], ["b", 2], ["c", 3]])
 * filterValues((n: number) => n > 0)(positive)
 * // Map { "a" => 1, "b" => 2, "c" => 3 }
 * 
 * // Using with pipe
 * import { pipe } from "../../combinator/pipe/index.ts"
 * 
 * const inventory = new Map([
 *   ["apple", { count: 50, price: 1.99, category: "fruit" }],
 *   ["carrot", { count: 0, price: 0.59, category: "vegetable" }],
 *   ["banana", { count: 25, price: 0.99, category: "fruit" }],
 *   ["broccoli", { count: 10, price: 2.49, category: "vegetable" }]
 * ])
 * 
 * pipe(
 *   inventory,
 *   filterValues((item: any) => item.count > 0),
 *   filterValues((item: any) => item.category === "fruit")
 * )
 * // Map { "apple" => {...}, "banana" => {...} }
 * 
 * // Partial application for reuse
 * const nonEmpty = filterValues((v: string) => v.length > 0)
 * 
 * const config1 = new Map([
 *   ["name", "MyApp"],
 *   ["version", ""],
 *   ["author", "Alice"]
 * ])
 * nonEmpty(config1)
 * // Map { "name" => "MyApp", "author" => "Alice" }
 * 
 * const config2 = new Map([
 *   ["title", ""],
 *   ["description", "A great app"],
 *   ["license", "MIT"]
 * ])
 * nonEmpty(config2)
 * // Map { "description" => "A great app", "license" => "MIT" }
 * 
 * // Numeric range filtering
 * const temperatures = new Map([
 *   ["sensor1", 23.5],
 *   ["sensor2", 18.2],
 *   ["sensor3", 25.8],
 *   ["sensor4", 30.1],
 *   ["sensor5", 19.7]
 * ])
 * filterValues((temp: number) => temp >= 20 && temp <= 25)(temperatures)
 * // Map { "sensor1" => 23.5 }
 * 
 * // Array value filtering
 * const lists = new Map([
 *   ["empty", []],
 *   ["single", [1]],
 *   ["double", [1, 2]],
 *   ["triple", [1, 2, 3]],
 *   ["many", [1, 2, 3, 4, 5]]
 * ])
 * filterValues((arr: Array<any>) => arr.length > 2)(lists)
 * // Map { "triple" => [1,2,3], "many" => [1,2,3,4,5] }
 * 
 * // String pattern matching
 * const messages = new Map([
 *   ["error1", "[ERROR] Failed to connect"],
 *   ["info1", "[INFO] Connection established"],
 *   ["error2", "[ERROR] Invalid credentials"],
 *   ["debug1", "[DEBUG] Request sent"],
 *   ["info2", "[INFO] Response received"]
 * ])
 * filterValues((msg: string) => msg.startsWith("[ERROR]"))(messages)
 * // Map { "error1" => "[ERROR] Failed to connect", "error2" => "[ERROR] Invalid credentials" }
 * 
 * // Date value filtering
 * const events = new Map([
 *   ["event1", new Date("2024-01-15")],
 *   ["event2", new Date("2024-02-20")],
 *   ["event3", new Date("2024-03-10")],
 *   ["event4", new Date("2024-04-05")]
 * ])
 * const cutoff = new Date("2024-03-01")
 * filterValues((date: Date) => date >= cutoff)(events)
 * // Map { "event3" => Date("2024-03-10"), "event4" => Date("2024-04-05") }
 * 
 * // Boolean filtering
 * const flags = new Map([
 *   ["isActive", true],
 *   ["isVerified", false],
 *   ["isPremium", true],
 *   ["isBlocked", false],
 *   ["isAdmin", true]
 * ])
 * filterValues((flag: boolean) => flag === true)(flags)
 * // Map { "isActive" => true, "isPremium" => true, "isAdmin" => true }
 * 
 * // Null/undefined filtering
 * const nullable = new Map([
 *   ["a", null],
 *   ["b", undefined],
 *   ["c", 0],
 *   ["d", ""],
 *   ["e", "value"],
 *   ["f", false]
 * ])
 * filterValues((v: any) => v != null)(nullable)
 * // Map { "c" => 0, "d" => "", "e" => "value", "f" => false }
 * 
 * // Complex object filtering
 * const products = new Map([
 *   ["p1", { name: "Laptop", price: 999, tags: ["electronics", "computers"] }],
 *   ["p2", { name: "Book", price: 29, tags: ["education"] }],
 *   ["p3", { name: "Phone", price: 699, tags: ["electronics", "mobile"] }],
 *   ["p4", { name: "Desk", price: 299, tags: ["furniture"] }]
 * ])
 * filterValues((product: any) => 
 *   product.price < 500 && product.tags.includes("electronics")
 * )(products)
 * // Map { "p3" => {name:"Phone", price:699, tags:["electronics","mobile"]} }
 * 
 * // Regular expression testing
 * const emails = new Map([
 *   ["user1", "alice@example.com"],
 *   ["user2", "bob@gmail.com"],
 *   ["user3", "charlie@example.com"],
 *   ["user4", "diana@yahoo.com"]
 * ])
 * const emailPattern = /@example\.com$/
 * filterValues((email: string) => emailPattern.test(email))(emails)
 * // Map { "user1" => "alice@example.com", "user3" => "charlie@example.com" }
 * 
 * // Set membership checking
 * const validStatuses = new Set(["active", "pending", "processing"])
 * const orders = new Map([
 *   ["order1", { id: 1, status: "active" }],
 *   ["order2", { id: 2, status: "cancelled" }],
 *   ["order3", { id: 3, status: "pending" }],
 *   ["order4", { id: 4, status: "completed" }],
 *   ["order5", { id: 5, status: "processing" }]
 * ])
 * filterValues((order: any) => validStatuses.has(order.status))(orders)
 * // Map { "order1" => {...}, "order3" => {...}, "order5" => {...} }
 * 
 * // Function value filtering
 * const handlers = new Map([
 *   ["click", () => console.log("click")],
 *   ["hover", null],
 *   ["focus", () => console.log("focus")],
 *   ["blur", undefined],
 *   ["submit", () => console.log("submit")]
 * ])
 * filterValues((v: any) => typeof v === "function")(handlers)
 * // Map { "click" => Function, "focus" => Function, "submit" => Function }
 * 
 * // Async value filtering (with resolved promises)
 * const results = new Map([
 *   ["task1", { success: true, data: "Result 1" }],
 *   ["task2", { success: false, error: "Failed" }],
 *   ["task3", { success: true, data: "Result 3" }],
 *   ["task4", { success: false, error: "Timeout" }]
 * ])
 * filterValues((result: any) => result.success)(results)
 * // Map { "task1" => {...}, "task3" => {...} }
 * 
 * // Statistical filtering
 * const data = new Map([
 *   ["sample1", 10.5],
 *   ["sample2", 8.2],
 *   ["sample3", 12.7],
 *   ["sample4", 9.8],
 *   ["sample5", 11.3]
 * ])
 * const mean = [...data.values()].reduce((a, b) => a + b, 0) / data.size
 * filterValues((value: number) => value > mean)(data)
 * // Map { "sample3" => 12.7, "sample5" => 11.3 }
 * 
 * // Chaining with map operations
 * const raw = new Map([
 *   ["a", "  hello  "],
 *   ["b", ""],
 *   ["c", "  "],
 *   ["d", "world"],
 *   ["e", " foo bar "]
 * ])
 * pipe(
 *   raw,
 *   map((s: string) => s.trim()),
 *   filterValues((s: string) => s.length > 0)
 * )
 * // Map { "a" => "hello", "d" => "world", "e" => "foo bar" }
 * 
 * // Type safety
 * const typed = new Map<string, number>([["a", 1], ["b", 2], ["c", 3]])
 * const filtered: Map<string, number> = filterValues<string, number>(
 *   (v) => v >= 2
 * )(typed)
 * // Map<string, number> { "b" => 2, "c" => 3 }
 * 
 * // Performance with large Maps
 * const large = new Map(
 *   Array.from({ length: 10000 }, (_, i) => [`key${i}`, i])
 * )
 * const highValues = filterValues((v: number) => v > 5000)
 * highValues(large)
 * // Map with ~5000 entries
 * ```
 * @property Pure - Creates new Map, doesn't modify original
 * @property Curried - Allows partial application
 * @property Specialized - Focused on value-based filtering only
 */
const filterValues = <K, V>(
	predicate: (value: V) => boolean
) =>
	(map: Map<K, V>): Map<K, V> => {
		const result = new Map<K, V>()
		for (const [key, value] of map) {
			if (predicate(value)) {
				result.set(key, value)
			}
		}
		return result
	}

export default filterValues