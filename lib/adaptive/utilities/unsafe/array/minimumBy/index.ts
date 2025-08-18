/**
 * Finds the minimum element according to a comparator function
 * 
 * Returns the element from the array that is smallest according to the
 * provided comparator function. The comparator should return a positive
 * number if the first argument is greater, negative if smaller, and zero
 * if equal (like standard sort comparators). Returns undefined for empty
 * arrays. Useful for finding minimum by custom criteria, complex comparisons,
 * or multi-field sorting.
 * 
 * @curried (comparator) => (array) => result
 * @param comparator - Function that compares two elements (returns negative if a < b)
 * @param array - Array to find minimum element from
 * @returns Minimum element according to comparator, or undefined if array is empty
 * @example
 * ```typescript
 * // Simple numeric comparison
 * const numCompare = (a: number, b: number) => a - b
 * minimumBy(numCompare)([3, 1, 4, 1, 5, 9, 2])
 * // 1
 * 
 * // String length comparison
 * const byLength = (a: string, b: string) => a.length - b.length
 * minimumBy(byLength)(["aaa", "b", "cc", "dddd"])
 * // "b"
 * 
 * // Object property comparison
 * const byAge = (a: { age: number }, b: { age: number }) => a.age - b.age
 * const people = [
 *   { name: "Alice", age: 30 },
 *   { name: "Bob", age: 25 },
 *   { name: "Charlie", age: 35 }
 * ]
 * minimumBy(byAge)(people)
 * // { name: "Bob", age: 25 }
 * 
 * // Multi-field comparison
 * type Score = { points: number; time: number }
 * const byScore = (a: Score, b: Score) => {
 *   if (a.points !== b.points) return a.points - b.points
 *   return a.time - b.time  // Lower time is better if points are equal
 * }
 * const scores: Score[] = [
 *   { points: 95, time: 50 },
 *   { points: 95, time: 45 },
 *   { points: 100, time: 40 }
 * ]
 * minimumBy(byScore)(scores)
 * // { points: 95, time: 45 }
 * 
 * // Date comparison (earliest)
 * const byDate = (a: Date, b: Date) => a.getTime() - b.getTime()
 * const dates = [
 *   new Date("2024-03-10"),
 *   new Date("2024-01-15"),
 *   new Date("2024-02-20")
 * ]
 * minimumBy(byDate)(dates)
 * // Date("2024-01-15")
 * 
 * // Alphabetical comparison
 * const alphabetical = (a: string, b: string) => a.localeCompare(b)
 * minimumBy(alphabetical)(["zebra", "apple", "mango", "banana"])
 * // "apple"
 * 
 * // Complex nested comparison
 * type Task = { priority: number; effort: number; id: string }
 * const byPriorityAndEffort = (a: Task, b: Task) => {
 *   const priorityDiff = a.priority - b.priority
 *   if (priorityDiff !== 0) return priorityDiff
 *   return a.effort - b.effort
 * }
 * const tasks: Task[] = [
 *   { priority: 2, effort: 5, id: "a" },
 *   { priority: 1, effort: 3, id: "b" },
 *   { priority: 1, effort: 2, id: "c" }
 * ]
 * minimumBy(byPriorityAndEffort)(tasks)
 * // { priority: 1, effort: 2, id: "c" }
 * 
 * // Array comparison (by minimum element)
 * const byMinElement = (a: number[], b: number[]) => {
 *   const minA = Math.min(...a)
 *   const minB = Math.min(...b)
 *   return minA - minB
 * }
 * minimumBy(byMinElement)([[5, 2, 8], [3, 4], [1, 9], [6]])
 * // [1, 9]
 * 
 * // Version comparison (oldest)
 * type Version = { major: number; minor: number; patch: number }
 * const byVersion = (a: Version, b: Version) => {
 *   if (a.major !== b.major) return a.major - b.major
 *   if (a.minor !== b.minor) return a.minor - b.minor
 *   return a.patch - b.patch
 * }
 * const versions: Version[] = [
 *   { major: 2, minor: 0, patch: 0 },
 *   { major: 1, minor: 9, patch: 5 },
 *   { major: 1, minor: 0, patch: 0 }
 * ]
 * minimumBy(byVersion)(versions)
 * // { major: 1, minor: 0, patch: 0 }
 * 
 * // Price comparison with availability
 * type Product = { price: number; inStock: boolean; name: string }
 * const byPriceAndStock = (a: Product, b: Product) => {
 *   // Prefer in-stock items
 *   if (a.inStock !== b.inStock) return a.inStock ? -1 : 1
 *   // Then by price
 *   return a.price - b.price
 * }
 * const products: Product[] = [
 *   { price: 50, inStock: false, name: "A" },
 *   { price: 60, inStock: true, name: "B" },
 *   { price: 55, inStock: true, name: "C" }
 * ]
 * minimumBy(byPriceAndStock)(products)
 * // { price: 55, inStock: true, name: "C" }
 * 
 * // Distance to origin
 * type Point = { x: number; y: number }
 * const byDistance = (a: Point, b: Point) => {
 *   const distA = Math.sqrt(a.x * a.x + a.y * a.y)
 *   const distB = Math.sqrt(b.x * b.x + b.y * b.y)
 *   return distA - distB
 * }
 * const points: Point[] = [
 *   { x: 3, y: 4 },
 *   { x: 1, y: 1 },
 *   { x: 5, y: 0 }
 * ]
 * minimumBy(byDistance)(points)
 * // { x: 1, y: 1 }
 * 
 * // Single element
 * minimumBy((a: number, b: number) => a - b)([42])
 * // 42
 * 
 * // Empty array
 * minimumBy((a: number, b: number) => a - b)([])
 * // undefined
 * 
 * // All equal elements (returns first)
 * minimumBy(() => 0)([3, 2, 1])
 * // 3
 * 
 * // Closest to target
 * const closestTo = (target: number) => 
 *   (a: number, b: number) => Math.abs(a - target) - Math.abs(b - target)
 * minimumBy(closestTo(10))([5, 15, 8, 20, 12])
 * // 12 (closest to 10)
 * 
 * // File size comparison
 * type File = { name: string; size: number; modified: Date }
 * const bySize = (a: File, b: File) => a.size - b.size
 * const files: File[] = [
 *   { name: "large.zip", size: 5000000, modified: new Date("2024-01-01") },
 *   { name: "small.txt", size: 1024, modified: new Date("2024-01-02") },
 *   { name: "medium.pdf", size: 500000, modified: new Date("2024-01-03") }
 * ]
 * minimumBy(bySize)(files)
 * // { name: "small.txt", size: 1024, modified: Date("2024-01-02") }
 * 
 * // CPU usage (find least loaded)
 * type Server = { name: string; cpu: number; memory: number }
 * const byLoad = (a: Server, b: Server) => {
 *   const loadA = a.cpu * 0.7 + a.memory * 0.3
 *   const loadB = b.cpu * 0.7 + b.memory * 0.3
 *   return loadA - loadB
 * }
 * const servers: Server[] = [
 *   { name: "server1", cpu: 60, memory: 80 },
 *   { name: "server2", cpu: 40, memory: 60 },
 *   { name: "server3", cpu: 50, memory: 40 }
 * ]
 * minimumBy(byLoad)(servers)
 * // { name: "server2", cpu: 40, memory: 60 }
 * 
 * // Partial application for reusable comparisons
 * const getYoungest = minimumBy((a: any, b: any) => a.age - b.age)
 * getYoungest([{ age: 25 }, { age: 30 }, { age: 20 }])
 * // { age: 20 }
 * 
 * const getShortest = minimumBy((a: string, b: string) => a.length - b.length)
 * getShortest(["short", "tiny", "minuscule"])
 * // "tiny"
 * 
 * // Handle null/undefined gracefully
 * minimumBy((a: number, b: number) => a - b)(null)       // undefined
 * minimumBy((a: number, b: number) => a - b)(undefined)  // undefined
 * 
 * // Cost optimization
 * type Route = { distance: number; tolls: number; time: number }
 * const byCost = (a: Route, b: Route) => {
 *   const costA = a.distance * 0.5 + a.tolls + a.time * 10
 *   const costB = b.distance * 0.5 + b.tolls + b.time * 10
 *   return costA - costB
 * }
 * const routes: Route[] = [
 *   { distance: 100, tolls: 10, time: 2 },
 *   { distance: 80, tolls: 20, time: 1.5 },
 *   { distance: 120, tolls: 0, time: 2.5 }
 * ]
 * minimumBy(byCost)(routes)
 * // { distance: 80, tolls: 20, time: 1.5 }
 * 
 * // Error rate comparison
 * type Service = { name: string; errors: number; requests: number }
 * const byErrorRate = (a: Service, b: Service) => {
 *   const rateA = a.requests > 0 ? a.errors / a.requests : 0
 *   const rateB = b.requests > 0 ? b.errors / b.requests : 0
 *   return rateA - rateB
 * }
 * const services: Service[] = [
 *   { name: "api1", errors: 5, requests: 1000 },
 *   { name: "api2", errors: 2, requests: 500 },
 *   { name: "api3", errors: 10, requests: 5000 }
 * ]
 * minimumBy(byErrorRate)(services)
 * // { name: "api3", errors: 10, requests: 5000 }
 * 
 * // Deadline comparison
 * type Deadline = { task: string; date: Date; priority: number }
 * const byDeadline = (a: Deadline, b: Deadline) => {
 *   const daysDiff = a.date.getTime() - b.date.getTime()
 *   if (Math.abs(daysDiff) < 86400000) {  // Same day
 *     return b.priority - a.priority  // Higher priority first
 *   }
 *   return daysDiff
 * }
 * const deadlines: Deadline[] = [
 *   { task: "Report", date: new Date("2024-03-15"), priority: 2 },
 *   { task: "Review", date: new Date("2024-03-10"), priority: 1 },
 *   { task: "Meeting", date: new Date("2024-03-10"), priority: 3 }
 * ]
 * minimumBy(byDeadline)(deadlines)
 * // { task: "Meeting", date: Date("2024-03-10"), priority: 3 }
 * ```
 * @property Immutable - doesn't modify input array
 * @property Undefined-safe - returns undefined for empty arrays
 * @property Stable - returns first minimum if multiple exist
 */
const minimumBy = <T>(
	comparator: (a: T, b: T) => number
) => (
	array: ReadonlyArray<T> | null | undefined
): T | undefined => {
	if (array == null || !Array.isArray(array) || array.length === 0) {
		return undefined
	}
	
	let minimum = array[0]
	
	for (let i = 1; i < array.length; i++) {
		if (comparator(array[i], minimum) < 0) {
			minimum = array[i]
		}
	}
	
	return minimum
}

export default minimumBy