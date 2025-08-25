/**
 * Returns a Map with keys present in both Maps, using custom equality
 *
 * Creates a new Map containing only the key-value pairs from the first Map
 * whose keys are present in the second Map, as determined by a custom
 * equality function. This allows for complex key comparisons beyond the
 * standard Map equality. Values are taken from the first Map.
 *
 * @curried (equalsFn) => (second) => (first) => result
 * @param equalsFn - Function to compare keys for equality
 * @param second - The Map to intersect with
 * @param first - The Map to take values from
 * @returns A new Map with matching keys, values from first
 * @example
 * ```typescript
 * // Case-insensitive string comparison
 * const caseInsensitiveEq = (a: string, b: string) =>
 *   a.toLowerCase() === b.toLowerCase()
 *
 * const map1 = new Map([["Alice", 1], ["Bob", 2], ["Charlie", 3]])
 * const map2 = new Map([["alice", 10], ["BOB", 20], ["Diana", 30]])
 *
 * intersectionWith(caseInsensitiveEq)(map2)(map1)
 * // Map { "Alice" => 1, "Bob" => 2 }
 *
 * // Object key comparison by property
 * type User = { id: number; name: string }
 * const userEq = (a: User, b: User) => a.id === b.id
 *
 * const user1 = { id: 1, name: "Alice" }
 * const user2 = { id: 2, name: "Bob" }
 * const user3 = { id: 3, name: "Charlie" }
 * const user1Alt = { id: 1, name: "Alicia" }
 * const user2Alt = { id: 2, name: "Robert" }
 *
 * const map1 = new Map([[user1, "A"], [user2, "B"], [user3, "C"]])
 * const map2 = new Map([[user1Alt, "X"], [user2Alt, "Y"], [{ id: 4, name: "Diana" }, "Z"]])
 *
 * intersectionWith(userEq)(map2)(map1)
 * // Map { {id:1, name:"Alice"} => "A", {id:2, name:"Bob"} => "B" }
 *
 * // Prefix matching
 * const prefixMatch = (a: string, b: string) =>
 *   a.startsWith(b.split(":")[0]) || b.startsWith(a.split(":")[0])
 *
 * const routes = new Map([
 *   ["api:users", "Users API"],
 *   ["api:posts", "Posts API"],
 *   ["auth:login", "Login"],
 *   ["auth:logout", "Logout"]
 * ])
 * const allowed = new Map([
 *   ["api", "Allowed"],
 *   ["admin", "Allowed"]
 * ])
 *
 * intersectionWith(prefixMatch)(allowed)(routes)
 * // Map { "api:users" => "Users API", "api:posts" => "Posts API" }
 *
 * // Numeric tolerance comparison
 * const approxEq = (tolerance: number) => (a: number, b: number) =>
 *   Math.abs(a - b) <= tolerance
 *
 * const measurements = new Map([
 *   [10.1, "Sample A"],
 *   [20.5, "Sample B"],
 *   [30.2, "Sample C"],
 *   [40.8, "Sample D"]
 * ])
 * const targets = new Map([
 *   [10, "Target 1"],
 *   [30, "Target 2"],
 *   [50, "Target 3"]
 * ])
 *
 * intersectionWith(approxEq(0.5))(targets)(measurements)
 * // Map { 10.1 => "Sample A", 30.2 => "Sample C" }
 *
 * // Array key comparison by contents
 * const arrayEq = <T>(a: Array<T>, b: Array<T>) =>
 *   a.length === b.length && a.every((v, i) => v === b[i])
 *
 * const map1 = new Map([
 *   [[1, 2, 3], "A"],
 *   [[4, 5, 6], "B"],
 *   [[7, 8, 9], "C"]
 * ])
 * const map2 = new Map([
 *   [[1, 2, 3], "X"],
 *   [[4, 5, 6], "Y"],
 *   [[10, 11, 12], "Z"]
 * ])
 *
 * intersectionWith(arrayEq)(map2)(map1)
 * // Map { [1,2,3] => "A", [4,5,6] => "B" }
 *
 * // No matches
 * const map1 = new Map([["a", 1], ["b", 2]])
 * const map2 = new Map([["c", 3], ["d", 4]])
 * intersectionWith((a, b) => a === b)(map2)(map1)
 * // Map {}
 *
 * // Empty Maps
 * const eq = (a: any, b: any) => a === b
 * intersectionWith(eq)(new Map())(new Map([["a", 1]]))
 * // Map {}
 *
 * // Using with pipe
 * import { pipe } from "../../combinator/pipe/index.ts"
 *
 * const inventory = new Map([
 *   ["PROD-001", 50],
 *   ["prod-002", 30],
 *   ["PROD-003", 25],
 *   ["test-001", 10]
 * ])
 *
 * const available = new Map([["prod-001", 0], ["PROD-002", 0], ["prod-003", 0]])
 * const featured = new Map([["prod-002", true], ["PROD-003", true]])
 *
 * pipe(
 *   inventory,
 *   intersectionWith(caseInsensitiveEq)(available),
 *   intersectionWith(caseInsensitiveEq)(featured)
 * )
 * // Map { "prod-002" => 30, "PROD-003" => 25 }
 *
 * // Date comparison with day precision
 * const sameDayEq = (a: Date, b: Date) =>
 *   a.getFullYear() === b.getFullYear() &&
 *   a.getMonth() === b.getMonth() &&
 *   a.getDate() === b.getDate()
 *
 * const events = new Map([
 *   [new Date("2024-01-15T10:00:00"), "Meeting"],
 *   [new Date("2024-01-16T14:00:00"), "Lunch"],
 *   [new Date("2024-01-17T09:00:00"), "Workshop"]
 * ])
 * const important = new Map([
 *   [new Date("2024-01-15T00:00:00"), "Important"],
 *   [new Date("2024-01-17T00:00:00"), "Important"]
 * ])
 *
 * intersectionWith(sameDayEq)(important)(events)
 * // Map { Date("2024-01-15T10:00:00") => "Meeting", Date("2024-01-17T09:00:00") => "Workshop" }
 *
 * // Regular expression pattern matching
 * const regexMatch = (a: string, b: string) => {
 *   try {
 *     return new RegExp(b).test(a)
 *   } catch {
 *     return false
 *   }
 * }
 *
 * const files = new Map([
 *   ["index.ts", "TypeScript"],
 *   ["styles.css", "CSS"],
 *   ["test.spec.ts", "Test"],
 *   ["README.md", "Docs"]
 * ])
 * const patterns = new Map([
 *   ["\\.ts$", "TypeScript files"],
 *   ["\\.md$", "Markdown files"]
 * ])
 *
 * intersectionWith(regexMatch)(patterns)(files)
 * // Map { "index.ts" => "TypeScript", "test.spec.ts" => "Test", "README.md" => "Docs" }
 *
 * // Partial object matching
 * const partialMatch = <T extends Record<string, any>>(a: T, b: Partial<T>) =>
 *   Object.entries(b).every(([key, value]) => a[key] === value)
 *
 * const products = new Map([
 *   [{ id: 1, category: "electronics", brand: "A" }, 100],
 *   [{ id: 2, category: "books", brand: "B" }, 50],
 *   [{ id: 3, category: "electronics", brand: "B" }, 200]
 * ])
 * const filter = new Map([
 *   [{ category: "electronics" }, true],
 *   [{ category: "clothing" }, true]
 * ])
 *
 * intersectionWith(partialMatch)(filter)(products)
 * // Map { {id:1, ...} => 100, {id:3, ...} => 200 }
 *
 * // Set membership comparison
 * const inSet = <T>(set: Set<T>) => (a: T, b: any) => set.has(a)
 * const allowedSet = new Set(["a", "b", "c"])
 *
 * const map = new Map([["a", 1], ["b", 2], ["d", 4], ["e", 5]])
 * const dummy = new Map([["dummy", 0]]) // Just need any Map for intersection
 *
 * intersectionWith(inSet(allowedSet))(dummy)(map)
 * // Map { "a" => 1, "b" => 2 }
 *
 * // Custom domain comparison
 * const domainEq = (a: string, b: string) => {
 *   const getDomain = (url: string) => {
 *     try {
 *       return new URL(url).hostname
 *     } catch {
 *       return url
 *     }
 *   }
 *   return getDomain(a) === getDomain(b)
 * }
 *
 * const links = new Map([
 *   ["https://example.com/page1", "Page 1"],
 *   ["https://example.com/page2", "Page 2"],
 *   ["https://other.com/page", "Other"],
 *   ["https://third.com/page", "Third"]
 * ])
 * const allowed = new Map([
 *   ["http://example.com", "Allowed"],
 *   ["https://other.com/different", "Allowed"]
 * ])
 *
 * intersectionWith(domainEq)(allowed)(links)
 * // Map { "https://example.com/page1" => "Page 1", "https://example.com/page2" => "Page 2", "https://other.com/page" => "Other" }
 *
 * // Range overlap
 * const rangeOverlap = (a: [number, number], b: [number, number]) =>
 *   a[0] <= b[1] && b[0] <= a[1]
 *
 * const timeSlots = new Map([
 *   [[9, 11], "Morning meeting"],
 *   [[13, 14], "Lunch"],
 *   [[15, 17], "Afternoon work"]
 * ])
 * const available = new Map([
 *   [[10, 12], "Available"],
 *   [[14, 16], "Available"]
 * ])
 *
 * intersectionWith(rangeOverlap)(available)(timeSlots)
 * // Map { [9,11] => "Morning meeting", [15,17] => "Afternoon work" }
 *
 * // Fuzzy string matching
 * const fuzzyMatch = (threshold: number) => (a: string, b: string) => {
 *   const distance = (s1: string, s2: string) => {
 *     // Simplified edit distance
 *     if (s1 === s2) return 0
 *     if (s1.includes(s2) || s2.includes(s1)) return 1
 *     return 999
 *   }
 *   return distance(a.toLowerCase(), b.toLowerCase()) <= threshold
 * }
 *
 * const names = new Map([
 *   ["Jonathan", 1],
 *   ["Jon", 2],
 *   ["John", 3],
 *   ["Johnny", 4]
 * ])
 * const search = new Map([["Jon", true]])
 *
 * intersectionWith(fuzzyMatch(1))(search)(names)
 * // Map { "Jonathan" => 1, "Jon" => 2 }
 *
 * // Complex predicate with multiple Maps
 * const hasAllProperties = (keys: Array<string>) =>
 *   (a: Record<string, any>, b: Record<string, any>) =>
 *     keys.every(k => k in a && k in b)
 *
 * const entities = new Map([
 *   [{ id: 1, name: "A", type: "X" }, "Entity 1"],
 *   [{ id: 2, name: "B" }, "Entity 2"],
 *   [{ id: 3, name: "C", type: "Y" }, "Entity 3"]
 * ])
 * const valid = new Map([
 *   [{ name: "Any", type: "Any" }, true]
 * ])
 *
 * intersectionWith(hasAllProperties(["name", "type"]))(valid)(entities)
 * // Map { {id:1, ...} => "Entity 1", {id:3, ...} => "Entity 3" }
 *
 * // Type safety
 * const typed1 = new Map<string, number>([["a", 1], ["b", 2]])
 * const typed2 = new Map<string, boolean>([["A", true], ["B", false]])
 * const result: Map<string, number> = intersectionWith<string, number, boolean>(
 *   (a, b) => a.toLowerCase() === b.toLowerCase()
 * )(typed2)(typed1)
 * // Map<string, number> { "a" => 1, "b" => 2 }
 *
 * // Performance with large Maps
 * const large1 = new Map(
 *   Array.from({ length: 10000 }, (_, i) => [`key${i}`, i])
 * )
 * const large2 = new Map(
 *   Array.from({ length: 5000 }, (_, i) => [`KEY${i * 2}`, i])
 * )
 * intersectionWith((a: string, b: string) =>
 *   a.toLowerCase() === b.toLowerCase()
 * )(large2)(large1)
 * // Map with matching keys (case-insensitive)
 * ```
 * @property Pure - Creates new Map, doesn't modify inputs
 * @property Curried - Allows partial application
 * @property Flexible - Custom equality enables complex comparisons
 */
const intersectionWith = <K, V, K2, V2>(
	equalsFn: (a: K, b: K2) => boolean,
) =>
(second: Map<K2, V2>) =>
(first: Map<K, V>): Map<K, V> => {
	const result = new Map<K, V>()

	for (const [firstKey, firstValue] of first) {
		for (const [secondKey] of second) {
			if (equalsFn(firstKey, secondKey)) {
				result.set(firstKey, firstValue)
				break
			}
		}
	}

	return result
}

export default intersectionWith
