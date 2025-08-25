/**
 * Returns a Map with keys in the first Map but not in the second, using custom equality
 *
 * Creates a new Map containing only the key-value pairs from the first Map
 * whose keys are not present in the second Map, as determined by a custom
 * equality function. This allows for complex key comparisons beyond the
 * standard Map equality.
 *
 * @curried (equalsFn) => (subtrahend) => (minuend) => result
 * @param equalsFn - Function to compare keys for equality
 * @param subtrahend - The Map whose keys to exclude
 * @param minuend - The Map to subtract from
 * @returns A new Map with keys from minuend not matching any in subtrahend
 * @example
 * ```typescript
 * // Case-insensitive string comparison
 * const caseInsensitiveEq = (a: string, b: string) =>
 *   a.toLowerCase() === b.toLowerCase()
 *
 * const map1 = new Map([["Alice", 1], ["Bob", 2], ["Charlie", 3]])
 * const map2 = new Map([["alice", 10], ["BOB", 20]])
 *
 * differenceWith(caseInsensitiveEq)(map2)(map1)
 * // Map { "Charlie" => 3 }
 *
 * // Object key comparison by property
 * type User = { id: number; name: string }
 * const userEq = (a: User, b: User) => a.id === b.id
 *
 * const user1 = { id: 1, name: "Alice" }
 * const user2 = { id: 2, name: "Bob" }
 * const user3 = { id: 3, name: "Charlie" }
 * const user1Alt = { id: 1, name: "Alicia" }
 *
 * const map1 = new Map([[user1, "A"], [user2, "B"], [user3, "C"]])
 * const map2 = new Map([[user1Alt, "X"], [user3, "Y"]])
 *
 * differenceWith(userEq)(map2)(map1)
 * // Map { {id:2, name:"Bob"} => "B" }
 *
 * // Prefix matching
 * const prefixMatch = (a: string, b: string) =>
 *   a.startsWith(b) || b.startsWith(a)
 *
 * const routes = new Map([
 *   ["/api/users", "Users API"],
 *   ["/api/posts", "Posts API"],
 *   ["/auth/login", "Login"],
 *   ["/auth/logout", "Logout"]
 * ])
 * const blocked = new Map([["/api", "Blocked"], ["/admin", "Blocked"]])
 *
 * differenceWith(prefixMatch)(blocked)(routes)
 * // Map { "/auth/login" => "Login", "/auth/logout" => "Logout" }
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
 * const baseline = new Map([[10, "Base"], [30, "Base"]])
 *
 * differenceWith(approxEq(0.5))(baseline)(measurements)
 * // Map { 20.5 => "Sample B", 40.8 => "Sample D" }
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
 *   [[7, 8, 9], "Y"]
 * ])
 *
 * differenceWith(arrayEq)(map2)(map1)
 * // Map { [4,5,6] => "B" }
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
 * const discontinued = new Map([["prod-002", 0], ["PROD-003", 0]])
 * const testItems = new Map([["test", 0]])
 *
 * pipe(
 *   inventory,
 *   differenceWith(caseInsensitiveEq)(discontinued),
 *   differenceWith(prefixMatch)(testItems)
 * )
 * // Map { "PROD-001" => 50 }
 *
 * // Date comparison with day precision
 * const sameDayEq = (a: Date, b: Date) =>
 *   a.getFullYear() === b.getFullYear() &&
 *   a.getMonth() === b.getMonth() &&
 *   a.getDate() === b.getDate()
 *
 * const events = new Map([
 *   [new Date("2024-01-15T10:00:00"), "Meeting"],
 *   [new Date("2024-01-15T14:00:00"), "Lunch"],
 *   [new Date("2024-01-16T09:00:00"), "Workshop"]
 * ])
 * const holidays = new Map([
 *   [new Date("2024-01-15T00:00:00"), "Holiday"]
 * ])
 *
 * differenceWith(sameDayEq)(holidays)(events)
 * // Map { Date("2024-01-16T09:00:00") => "Workshop" }
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
 * const patterns = new Map([["\\.ts$", "TypeScript"]])
 *
 * differenceWith(regexMatch)(patterns)(files)
 * // Map { "styles.css" => "CSS", "README.md" => "Docs" }
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
 * const filter = new Map([[{ category: "electronics" }, true]])
 *
 * differenceWith(partialMatch)(filter)(products)
 * // Map { {id:2, category:"books", brand:"B"} => 50 }
 *
 * // Set membership comparison
 * const inSet = <T>(set: Set<T>) => (a: T, _: any) => set.has(a)
 * const excludeSet = new Set(["a", "b", "c"])
 *
 * const map = new Map([["a", 1], ["b", 2], ["d", 4], ["e", 5]])
 * const dummy = new Map([["dummy", 0]])
 *
 * differenceWith(inSet(excludeSet))(dummy)(map)
 * // Map { "d" => 4, "e" => 5 }
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
 * const blocked = new Map([
 *   ["http://example.com", "Blocked"],
 *   ["https://other.com/different", "Blocked"]
 * ])
 *
 * differenceWith(domainEq)(blocked)(links)
 * // Map { "https://third.com/page" => "Third" }
 *
 * // Type safety
 * const typed1 = new Map<string, number>([["a", 1], ["b", 2]])
 * const typed2 = new Map<string, boolean>([["b", true]])
 * differenceWith<string, number, boolean>(
 *   (a, b) => a === b
 * )(typed2)(typed1)
 * // Map<string, number> { "a" => 1 }
 *
 * // Empty cases
 * const eq = (a: any, b: any) => a === b
 * differenceWith(eq)(new Map())(new Map([["a", 1]]))
 * // Map { "a" => 1 }
 * differenceWith(eq)(new Map([["a", 1]]))(new Map())
 * // Map {}
 * ```
 * @property Pure - Creates new Map, doesn't modify inputs
 * @property Curried - Allows partial application
 * @property Flexible - Custom equality enables complex comparisons
 */
const differenceWith = <K, V, K2, V2>(
	equalsFn: (a: K, b: K2) => boolean,
) =>
(subtrahend: Map<K2, V2>) =>
(minuend: Map<K, V>): Map<K, V> => {
	const result = new Map<K, V>()

	for (const [key, value] of minuend) {
		let found = false
		for (const [subtrahendKey] of subtrahend) {
			if (equalsFn(key, subtrahendKey)) {
				found = true
				break
			}
		}
		if (!found) {
			result.set(key, value)
		}
	}

	return result
}

export default differenceWith
