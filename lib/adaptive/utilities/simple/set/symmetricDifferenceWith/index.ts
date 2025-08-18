/**
 * Returns elements in either Set but not both, using custom equality
 * 
 * Performs a symmetric difference operation (XOR for sets) using a custom
 * equality function to determine element equivalence. Returns a new Set
 * containing elements that appear in exactly one of the two Sets according
 * to the custom equality test. Elements that are considered equal by the
 * comparator are excluded from the result.
 * 
 * @curried (equals) => (set2) => (set1) => result
 * @param equals - Function to test element equality (a, b) => boolean
 * @param set2 - Second Set to compare
 * @param set1 - First Set to compare
 * @returns New Set with elements in exactly one Set per custom equality
 * @example
 * ```typescript
 * // Case-insensitive symmetric difference
 * symmetricDifferenceWith(
 *   (a: string, b: string) => a.toLowerCase() === b.toLowerCase()
 * )(new Set(["WORLD", "FOO"]))(new Set(["hello", "world"]))
 * // Set { "hello", "FOO" } ("world"/"WORLD" excluded as equal)
 * 
 * // Numeric tolerance
 * symmetricDifferenceWith(
 *   (a: number, b: number) => Math.abs(a - b) < 0.1
 * )(new Set([1.05, 2.0, 3.0]))(new Set([1.0, 2.5, 4.0]))
 * // Set { 2.5, 3.0, 4.0 } (1.0≈1.05, 2.0 kept from set1)
 * 
 * // Object property comparison
 * interface User { id: number; name: string }
 * symmetricDifferenceWith(
 *   (a: User, b: User) => a.id === b.id
 * )(
 *   new Set([{ id: 2, name: "Bob" }, { id: 3, name: "Charlie" }])
 * )(
 *   new Set([{ id: 1, name: "Alice" }, { id: 2, name: "Robert" }])
 * )
 * // Set { { id: 1, name: "Alice" }, { id: 3, name: "Charlie" } }
 * // (id:2 objects excluded as equal)
 * 
 * // Array length comparison
 * symmetricDifferenceWith(
 *   (a: Array<number>, b: Array<number>) => a.length === b.length
 * )(new Set([[1], [1, 2, 3]]))(new Set([[1, 2], [1, 2, 3, 4]]))
 * // Set { [1, 2], [1, 2, 3, 4], [1] }
 * // ([1,2,3] excluded as same length in both)
 * 
 * // Prefix matching
 * symmetricDifferenceWith(
 *   (a: string, b: string) => a.startsWith(b) || b.startsWith(a)
 * )(new Set(["test123", "foo"]))(new Set(["test", "bar"]))
 * // Set { "bar", "foo" } ("test"/"test123" are prefix-related)
 * 
 * // Date comparison (same day)
 * symmetricDifferenceWith(
 *   (a: Date, b: Date) => 
 *     a.toDateString() === b.toDateString()
 * )(
 *   new Set([new Date("2024-01-02"), new Date("2024-01-03")])
 * )(
 *   new Set([new Date("2024-01-01T10:00"), new Date("2024-01-02T15:00")])
 * )
 * // Set { Date("2024-01-01T10:00"), Date("2024-01-03") }
 * // (Jan 2 dates excluded as same day)
 * 
 * // Partial application for reusable comparisons
 * const caseInsensitiveXor = symmetricDifferenceWith(
 *   (a: string, b: string) => a.toLowerCase() === b.toLowerCase()
 * )
 * 
 * const set1 = new Set(["Apple", "Banana"])
 * const set2 = new Set(["apple", "Cherry"])
 * caseInsensitiveXor(set2)(set1)
 * // Set { "Banana", "Cherry" }
 * 
 * // Empty Sets
 * symmetricDifferenceWith(
 *   (a: number, b: number) => a === b
 * )(new Set())(new Set([1, 2, 3]))
 * // Set { 1, 2, 3 }
 * 
 * symmetricDifferenceWith(
 *   (a: number, b: number) => a === b
 * )(new Set([1, 2, 3]))(new Set())
 * // Set { 1, 2, 3 }
 * 
 * // All elements match (returns empty)
 * symmetricDifferenceWith(
 *   (a: number, b: number) => Math.floor(a) === Math.floor(b)
 * )(new Set([1.5, 2.5]))(new Set([1.1, 2.9]))
 * // Set { } (all match by floor value)
 * 
 * // No elements match (returns all)
 * symmetricDifferenceWith(
 *   (a: number, b: number) => a === b
 * )(new Set([4, 5, 6]))(new Set([1, 2, 3]))
 * // Set { 1, 2, 3, 4, 5, 6 }
 * 
 * // URL path comparison
 * symmetricDifferenceWith(
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
 * // Set { "http://site.com/home", "https://test.com/other" }
 * // (/page URLs excluded as equal paths)
 * 
 * // Version comparison
 * symmetricDifferenceWith(
 *   (a: string, b: string) => {
 *     const [majorA] = a.split('.')
 *     const [majorB] = b.split('.')
 *     return majorA === majorB
 *   }
 * )(new Set(["2.0.0", "3.0.0"]))(new Set(["1.0.0", "2.5.1"]))
 * // Set { "1.0.0", "3.0.0" }
 * // (2.x.x versions excluded as same major)
 * 
 * // Handle null/undefined gracefully
 * symmetricDifferenceWith(
 *   (a: number, b: number) => a === b
 * )(new Set([1, 2]))(null)
 * // Set { 1, 2 }
 * 
 * symmetricDifferenceWith(
 *   (a: number, b: number) => a === b
 * )(null)(new Set([1, 2]))
 * // Set { 1, 2 }
 * 
 * // Business logic: find changed products
 * interface Product { sku: string; price: number }
 * const oldProducts = new Set([
 *   { sku: "A001", price: 10 },
 *   { sku: "B002", price: 20 }
 * ])
 * const newProducts = new Set([
 *   { sku: "A001", price: 12 },  // Price changed
 *   { sku: "C003", price: 30 }
 * ])
 * symmetricDifferenceWith(
 *   (a: Product, b: Product) => a.sku === b.sku
 * )(newProducts)(oldProducts)
 * // Set { { sku: "B002", price: 20 }, { sku: "C003", price: 30 } }
 * // (removed and added products)
 * ```
 * @property Custom-equality - uses provided function for comparison
 * @property Preserves-first - when equal, keeps element from first Set
 * @property Commutative - result contains same elements regardless of order
 */
const symmetricDifferenceWith = <T>(
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
	
	// Add elements from set1 that have no equal in set2
	for (const elem1 of set1) {
		let hasEqual = false
		for (const elem2 of set2) {
			if (equals(elem1, elem2)) {
				hasEqual = true
				break
			}
		}
		if (!hasEqual) {
			result.add(elem1)
		}
	}
	
	// Add elements from set2 that have no equal in set1
	for (const elem2 of set2) {
		let hasEqual = false
		for (const elem1 of set1) {
			if (equals(elem2, elem1)) {
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

export default symmetricDifferenceWith