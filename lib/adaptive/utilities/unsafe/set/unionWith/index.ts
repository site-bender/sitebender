/**
 * Returns a Set containing all unique elements from both Sets using custom equality
 * 
 * Performs a union operation using a custom equality function to determine
 * element uniqueness. When elements are considered equal by the comparator,
 * the element from the first Set is kept in the result.
 * 
 * @curried (equals) => (set2) => (set1) => result
 * @param equals - Function to test element equality (a, b) => boolean
 * @param set2 - Second Set to union with
 * @param set1 - First Set to union
 * @returns New Set containing all unique elements per custom equality
 * @example
 * ```typescript
 * // Case-insensitive union
 * unionWith(
 *   (a: string, b: string) => a.toLowerCase() === b.toLowerCase()
 * )(new Set(["WORLD", "FOO"]))(new Set(["hello", "world"]))
 * // Set { "hello", "world", "FOO" }
 * // ("world" kept from set1, "WORLD" considered duplicate)
 * 
 * // Numeric tolerance
 * unionWith(
 *   (a: number, b: number) => Math.abs(a - b) < 0.1
 * )(new Set([1.05, 2.0, 3.0]))(new Set([1.0, 2.5, 4.0]))
 * // Set { 1.0, 2.5, 4.0, 2.0, 3.0 }
 * // (1.0≈1.05 considered equal, 1.0 kept)
 * 
 * // Object property comparison
 * interface User { id: number; name: string }
 * unionWith(
 *   (a: User, b: User) => a.id === b.id
 * )(
 *   new Set([{ id: 2, name: "Bob" }, { id: 3, name: "Charlie" }])
 * )(
 *   new Set([{ id: 1, name: "Alice" }, { id: 2, name: "Robert" }])
 * )
 * // Set { 
 * //   { id: 1, name: "Alice" },
 * //   { id: 2, name: "Robert" },  // First occurrence kept
 * //   { id: 3, name: "Charlie" }
 * // }
 * 
 * // Array length comparison
 * unionWith(
 *   (a: Array<number>, b: Array<number>) => a.length === b.length
 * )(new Set([[4, 5], [7, 8, 9]]))(new Set([[1], [2, 3]]))
 * // Set { [1], [2, 3], [7, 8, 9] }
 * // ([4,5] has same length as [2,3], so [2,3] kept)
 * 
 * // Prefix matching
 * unionWith(
 *   (a: string, b: string) => a.startsWith(b) || b.startsWith(a)
 * )(new Set(["test123", "foo"]))(new Set(["test", "bar"]))
 * // Set { "test", "bar", "foo" }
 * // ("test" and "test123" are prefix-related, "test" kept)
 * 
 * // Date comparison (same day)
 * unionWith(
 *   (a: Date, b: Date) => 
 *     a.toDateString() === b.toDateString()
 * )(
 *   new Set([new Date("2024-01-02T20:00"), new Date("2024-01-03")])
 * )(
 *   new Set([new Date("2024-01-01"), new Date("2024-01-02T10:00")])
 * )
 * // Set { 
 * //   Date("2024-01-01"),
 * //   Date("2024-01-02T10:00"),  // First Jan 2 kept
 * //   Date("2024-01-03")
 * // }
 * 
 * // Partial application for reusable combiners
 * const caseInsensitiveUnion = unionWith(
 *   (a: string, b: string) => a.toLowerCase() === b.toLowerCase()
 * )
 * 
 * const set1 = new Set(["Apple", "Banana"])
 * const set2 = new Set(["apple", "Cherry"])
 * caseInsensitiveUnion(set2)(set1)
 * // Set { "Apple", "Banana", "Cherry" }
 * 
 * // Empty Sets
 * unionWith(
 *   (a: number, b: number) => a === b
 * )(new Set())(new Set([1, 2, 3]))
 * // Set { 1, 2, 3 }
 * 
 * unionWith(
 *   (a: number, b: number) => a === b
 * )(new Set([1, 2, 3]))(new Set())
 * // Set { 1, 2, 3 }
 * 
 * // All elements match
 * unionWith(
 *   (a: number, b: number) => Math.floor(a) === Math.floor(b)
 * )(new Set([1.5, 2.5]))(new Set([1.1, 2.9]))
 * // Set { 1.1, 2.9 }  // First occurrences kept
 * 
 * // No elements match
 * unionWith(
 *   (a: number, b: number) => a === b
 * )(new Set([4, 5, 6]))(new Set([1, 2, 3]))
 * // Set { 1, 2, 3, 4, 5, 6 }
 * 
 * // URL path comparison
 * unionWith(
 *   (a: string, b: string) => {
 *     const pathA = new URL(a).pathname
 *     const pathB = new URL(b).pathname
 *     return pathA === pathB
 *   }
 * )(
 *   new Set(["https://example.com/page", "https://test.com/other"])
 * )(
 *   new Set(["http://site.com/page", "http://site.com/home"])
 * )
 * // Set { 
 * //   "http://site.com/page",    // First /page URL
 * //   "http://site.com/home",
 * //   "https://test.com/other"
 * // }
 * 
 * // Version deduplication
 * unionWith(
 *   (a: string, b: string) => {
 *     const [majorA] = a.split('.')
 *     const [majorB] = b.split('.')
 *     return majorA === majorB
 *   }
 * )(new Set(["2.1.0", "3.0.0"]))(new Set(["1.0.0", "2.0.0"]))
 * // Set { "1.0.0", "2.0.0", "3.0.0" }
 * // (2.0.0 and 2.1.0 have same major, 2.0.0 kept)
 * 
 * // Merge with normalization
 * unionWith(
 *   (a: string, b: string) => 
 *     a.trim().toLowerCase() === b.trim().toLowerCase()
 * )(new Set(["  HELLO  ", "WORLD"]))(new Set(["hello", "foo"]))
 * // Set { "hello", "foo", "WORLD" }
 * 
 * // Handle null/undefined gracefully
 * unionWith(
 *   (a: number, b: number) => a === b
 * )(new Set([1, 2]))(null)
 * // Set { 1, 2 }
 * 
 * unionWith(
 *   (a: number, b: number) => a === b
 * )(null)(new Set([1, 2]))
 * // Set { 1, 2 }
 * 
 * // Business logic: merge products by SKU
 * interface Product { sku: string; name: string; price: number }
 * const currentProducts = new Set([
 *   { sku: "A001", name: "Product A", price: 10 },
 *   { sku: "B002", name: "Product B", price: 20 }
 * ])
 * const newProducts = new Set([
 *   { sku: "A001", name: "Product A Updated", price: 12 },
 *   { sku: "C003", name: "Product C", price: 30 }
 * ])
 * unionWith(
 *   (a: Product, b: Product) => a.sku === b.sku
 * )(newProducts)(currentProducts)
 * // Set {
 * //   { sku: "A001", name: "Product A", price: 10 },  // Original kept
 * //   { sku: "B002", name: "Product B", price: 20 },
 * //   { sku: "C003", name: "Product C", price: 30 }
 * // }
 * 
 * // Filter duplicates while merging
 * const emails1 = new Set(["user@example.com", "ADMIN@example.com"])
 * const emails2 = new Set(["admin@EXAMPLE.com", "support@example.com"])
 * unionWith(
 *   (a: string, b: string) => 
 *     a.toLowerCase() === b.toLowerCase()
 * )(emails2)(emails1)
 * // Set { 
 * //   "user@example.com",
 * //   "ADMIN@example.com",     // First admin@ kept
 * //   "support@example.com"
 * // }
 * ```
 * @property Custom-equality - uses provided function for uniqueness
 * @property Preserves-first - when equal, keeps element from first Set encountered
 * @property Order-preserving - maintains insertion order from both Sets
 */
const unionWith = <T>(
	equals: (a: T, b: T) => boolean
) => (
	set2: Set<T> | null | undefined
) => (
	set1: Set<T> | null | undefined
): Set<T> => {
	if (set1 == null || !(set1 instanceof Set)) {
		if (set2 == null || !(set2 instanceof Set)) {
			return new Set()
		}
		return new Set(set2)
	}
	
	if (set2 == null || !(set2 instanceof Set)) {
		return new Set(set1)
	}
	
	const result = new Set<T>()
	
	// Add all elements from set1
	for (const elem1 of set1) {
		result.add(elem1)
	}
	
	// Add elements from set2 that don't have an equal in result
	for (const elem2 of set2) {
		let hasEqual = false
		for (const existing of result) {
			if (equals(elem2, existing)) {
				hasEqual = true
				break
			}
		}
		if (!hasEqual) {
			result.add(elem2)
		}
	}
	
	return result
}

export default unionWith