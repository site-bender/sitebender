/**
 * Sorts an array using multiple comparator functions
 * 
 * Applies comparator functions in order until one returns a non-zero value,
 * providing multi-level sorting. Each comparator should return negative for
 * less than, positive for greater than, and zero for equal. Useful for
 * complex sorting with primary, secondary, tertiary sort keys, or different
 * sort directions per field.
 * 
 * @curried (comparators) => (array) => result
 * @param comparators - Array of comparator functions to apply in order
 * @param array - Array to sort
 * @returns New sorted array (original unchanged)
 * @example
 * ```typescript
 * // Sort by age ascending, then name ascending
 * const byAge = (a: any, b: any) => a.age - b.age
 * const byName = (a: any, b: any) => a.name.localeCompare(b.name)
 * const people = [
 *   { name: "Charlie", age: 30 },
 *   { name: "Alice", age: 25 },
 *   { name: "Bob", age: 25 },
 *   { name: "David", age: 30 }
 * ]
 * sortWith([byAge, byName])(people)
 * // [
 * //   { name: "Alice", age: 25 },
 * //   { name: "Bob", age: 25 },
 * //   { name: "Charlie", age: 30 },
 * //   { name: "David", age: 30 }
 * // ]
 * 
 * // Sort with different directions per field
 * const byPriceDesc = (a: any, b: any) => b.price - a.price  // descending
 * const byNameAsc = (a: any, b: any) => a.name.localeCompare(b.name)  // ascending
 * const products = [
 *   { name: "Widget", price: 10 },
 *   { name: "Gadget", price: 20 },
 *   { name: "Doohickey", price: 20 },
 *   { name: "Thingamajig", price: 10 }
 * ]
 * sortWith([byPriceDesc, byNameAsc])(products)
 * // [
 * //   { name: "Doohickey", price: 20 },
 * //   { name: "Gadget", price: 20 },
 * //   { name: "Thingamajig", price: 10 },
 * //   { name: "Widget", price: 10 }
 * // ]
 * 
 * // Three-level sorting
 * const byCategory = (a: any, b: any) => a.category.localeCompare(b.category)
 * const byPriority = (a: any, b: any) => a.priority - b.priority
 * const byDate = (a: any, b: any) => a.date.getTime() - b.date.getTime()
 * const tasks = [
 *   { category: "Work", priority: 2, date: new Date("2024-01-15") },
 *   { category: "Personal", priority: 1, date: new Date("2024-01-10") },
 *   { category: "Work", priority: 1, date: new Date("2024-01-20") },
 *   { category: "Work", priority: 1, date: new Date("2024-01-05") },
 *   { category: "Personal", priority: 2, date: new Date("2024-01-12") }
 * ]
 * sortWith([byCategory, byPriority, byDate])(tasks)
 * // Sorted by category, then priority within category, then date
 * 
 * // Custom comparators
 * const compareLength = (a: string, b: string) => a.length - b.length
 * const compareAlpha = (a: string, b: string) => a.localeCompare(b)
 * const words = ["cat", "dog", "elephant", "ant", "bee", "ox"]
 * sortWith([compareLength, compareAlpha])(words)
 * // ["ox", "ant", "bee", "cat", "dog", "elephant"]
 * // (sorted by length, alphabetically within same length)
 * 
 * // Boolean comparisons
 * const byActive = (a: any, b: any) => Number(b.active) - Number(a.active)  // true first
 * const byScore = (a: any, b: any) => b.score - a.score  // high score first
 * const users = [
 *   { name: "Alice", active: false, score: 85 },
 *   { name: "Bob", active: true, score: 90 },
 *   { name: "Charlie", active: true, score: 85 },
 *   { name: "David", active: false, score: 95 }
 * ]
 * sortWith([byActive, byScore])(users)
 * // [
 * //   { name: "Bob", active: true, score: 90 },
 * //   { name: "Charlie", active: true, score: 85 },
 * //   { name: "David", active: false, score: 95 },
 * //   { name: "Alice", active: false, score: 85 }
 * // ]
 * 
 * // Null/undefined handling
 * const nullsLast = (a: any, b: any) => {
 *   if (a.value == null && b.value == null) return 0
 *   if (a.value == null) return 1
 *   if (b.value == null) return -1
 *   return a.value - b.value
 * }
 * const items = [
 *   { id: 1, value: 5 },
 *   { id: 2, value: null },
 *   { id: 3, value: 3 },
 *   { id: 4, value: undefined },
 *   { id: 5, value: 7 }
 * ]
 * sortWith([nullsLast])(items)
 * // [
 * //   { id: 3, value: 3 },
 * //   { id: 1, value: 5 },
 * //   { id: 5, value: 7 },
 * //   { id: 2, value: null },
 * //   { id: 4, value: undefined }
 * // ]
 * 
 * // Case-insensitive with case-sensitive tiebreaker
 * const caseInsensitive = (a: string, b: string) => 
 *   a.toLowerCase().localeCompare(b.toLowerCase())
 * const caseSensitive = (a: string, b: string) => a.localeCompare(b)
 * const strings = ["apple", "Apple", "APPLE", "banana", "Banana"]
 * sortWith([caseInsensitive, caseSensitive])(strings)
 * // ["APPLE", "Apple", "apple", "Banana", "banana"]
 * 
 * // Date and time sorting
 * const byDateOnly = (a: any, b: any) => {
 *   const dateA = new Date(a.datetime).toDateString()
 *   const dateB = new Date(b.datetime).toDateString()
 *   return dateA.localeCompare(dateB)
 * }
 * const byTime = (a: any, b: any) => 
 *   a.datetime.getTime() - b.datetime.getTime()
 * const events = [
 *   { name: "Event1", datetime: new Date("2024-01-15T10:00") },
 *   { name: "Event2", datetime: new Date("2024-01-15T08:00") },
 *   { name: "Event3", datetime: new Date("2024-01-14T14:00") }
 * ]
 * sortWith([byDateOnly, byTime])(events)
 * // Sorted by date, then by time within same date
 * 
 * // Single comparator (works like regular sort)
 * sortWith([(a: number, b: number) => a - b])([3, 1, 4, 1, 5])
 * // [1, 1, 3, 4, 5]
 * 
 * // Empty comparators array (no sorting)
 * sortWith([])(["b", "a", "c"])
 * // ["b", "a", "c"]
 * 
 * // Empty array
 * sortWith([compareAlpha])([])
 * // []
 * 
 * // Single element
 * sortWith([compareAlpha])(["only"])
 * // ["only"]
 * 
 * // Handle null/undefined
 * sortWith([(a, b) => a - b])(null)       // []
 * sortWith([(a, b) => a - b])(undefined)  // []
 * 
 * // Complex object sorting
 * type Employee = {
 *   department: string
 *   position: string
 *   salary: number
 *   name: string
 * }
 * const byDepartment = (a: Employee, b: Employee) => 
 *   a.department.localeCompare(b.department)
 * const bySalaryDesc = (a: Employee, b: Employee) => 
 *   b.salary - a.salary
 * const byPosition = (a: Employee, b: Employee) => 
 *   a.position.localeCompare(b.position)
 * const employees: Employee[] = [
 *   { department: "IT", position: "Developer", salary: 70000, name: "Alice" },
 *   { department: "HR", position: "Manager", salary: 80000, name: "Bob" },
 *   { department: "IT", position: "Manager", salary: 90000, name: "Charlie" },
 *   { department: "IT", position: "Developer", salary: 75000, name: "David" }
 * ]
 * sortWith([byDepartment, byPosition, bySalaryDesc])(employees)
 * // Sorted by dept, position within dept, salary within position
 * 
 * // Score with tiebreakers
 * const byWins = (a: any, b: any) => b.wins - a.wins
 * const byLosses = (a: any, b: any) => a.losses - b.losses  // fewer losses better
 * const byPointDiff = (a: any, b: any) => b.pointDiff - a.pointDiff
 * const teams = [
 *   { name: "Team A", wins: 10, losses: 5, pointDiff: 25 },
 *   { name: "Team B", wins: 10, losses: 5, pointDiff: 30 },
 *   { name: "Team C", wins: 10, losses: 4, pointDiff: 20 },
 *   { name: "Team D", wins: 9, losses: 6, pointDiff: 15 }
 * ]
 * sortWith([byWins, byLosses, byPointDiff])(teams)
 * // Rankings with multiple tiebreakers
 * 
 * // Version number sorting
 * const compareVersion = (a: string, b: string) => {
 *   const partsA = a.split(".").map(Number)
 *   const partsB = b.split(".").map(Number)
 *   for (let i = 0; i < Math.max(partsA.length, partsB.length); i++) {
 *     const diff = (partsA[i] || 0) - (partsB[i] || 0)
 *     if (diff !== 0) return diff
 *   }
 *   return 0
 * }
 * const versions = ["1.0.0", "2.1.0", "1.2.0", "1.0.10", "2.0.0"]
 * sortWith([compareVersion])(versions)
 * // ["1.0.0", "1.0.10", "1.2.0", "2.0.0", "2.1.0"]
 * 
 * // Partial application for reusable multi-sorters
 * const standardSort = sortWith([byCategory, byPriority, byDate])
 * standardSort(tasks)  // Apply standard sorting to any task list
 * 
 * // File system sorting (folders first, then alphabetical)
 * const byType = (a: any, b: any) => {
 *   if (a.isFolder === b.isFolder) return 0
 *   return a.isFolder ? -1 : 1
 * }
 * const files = [
 *   { name: "readme.txt", isFolder: false },
 *   { name: "src", isFolder: true },
 *   { name: "package.json", isFolder: false },
 *   { name: "docs", isFolder: true }
 * ]
 * sortWith([byType, byName])(files)
 * // [
 * //   { name: "docs", isFolder: true },
 * //   { name: "src", isFolder: true },
 * //   { name: "package.json", isFolder: false },
 * //   { name: "readme.txt", isFolder: false }
 * // ]
 * ```
 * @property Immutable - doesn't modify input array
 * @property Multi-level - applies comparators in sequence
 * @property Flexible - different sort directions per level
 */
const sortWith = <T>(
	comparators: ReadonlyArray<(a: T, b: T) => number>
) => (
	array: ReadonlyArray<T> | null | undefined
): Array<T> => {
	if (array == null || !Array.isArray(array) || array.length === 0) {
		return []
	}
	
	if (comparators.length === 0) {
		return [...array]
	}
	
	// Create a copy and sort with combined comparator
	return [...array].sort((a, b) => {
		// Apply comparators in order until one returns non-zero
		for (const comparator of comparators) {
			const result = comparator(a, b)
			if (result !== 0) {
				return result
			}
		}
		// All comparators returned 0 (elements are equal)
		return 0
	})
}

export default sortWith