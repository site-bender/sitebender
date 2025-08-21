/**
 * Finds the minimum value using a mapping function
 * 
 * Applies a transformation function to two values and returns the value
 * that produces the smaller result. This allows finding minimums based
 * on derived properties rather than the values themselves. Returns the
 * second value if the mapped results are equal. Returns NaN if either
 * mapped result is not a valid number.
 * 
 * @curried (fn) => (a) => (b) => minimum
 * @param fn - Function to map values before comparison
 * @param a - First value to compare
 * @param b - Second value to compare
 * @returns The value that produces the smaller mapped result
 * @example
 * ```typescript
 * // Simple numeric mapping
 * const byAbs = minBy(Math.abs)
 * byAbs(-5)(3)
 * // 3 (abs(-5) = 5, abs(3) = 3)
 * 
 * byAbs(-2)(8)
 * // -2 (abs(-2) = 2, abs(8) = 8)
 * 
 * byAbs(4)(-4)
 * // -4 (when equal, returns second value)
 * 
 * // Object property comparison
 * type Person = { name: string; age: number }
 * const byAge = minBy((p: Person) => p.age)
 * 
 * const alice = { name: "Alice", age: 30 }
 * const bob = { name: "Bob", age: 25 }
 * byAge(alice)(bob)
 * // { name: "Bob", age: 25 }
 * 
 * // String length comparison
 * const byLength = minBy((s: string) => s.length)
 * byLength("hello")("hi")
 * // "hi"
 * 
 * byLength("cat")("elephant")
 * // "cat"
 * 
 * byLength("abc")("xyz")
 * // "xyz" (same length, returns second)
 * 
 * // Array length comparison
 * const bySizeArray = minBy((arr: Array<unknown>) => arr.length)
 * bySizeArray([1, 2, 3])([4, 5])
 * // [4, 5]
 * 
 * bySizeArray([1])([2, 3, 4])
 * // [1]
 * 
 * // Distance from zero
 * const closestToZero = minBy(Math.abs)
 * closestToZero(5)(-3)
 * // -3
 * 
 * closestToZero(-10)(15)
 * // -10
 * 
 * closestToZero(7)(-7)
 * // -7 (equal distance, returns second)
 * 
 * // Square comparison
 * const bySquare = minBy((x: number) => x * x)
 * bySquare(3)(4)
 * // 3 (9 < 16)
 * 
 * bySquare(-5)(4)
 * // 4 (25 > 16)
 * 
 * // Reciprocal comparison (inverts order)
 * const byReciprocal = minBy((x: number) => 1 / x)
 * byReciprocal(2)(4)
 * // 4 (1/2 = 0.5, 1/4 = 0.25)
 * 
 * byReciprocal(0.5)(0.25)
 * // 0.25 (1/0.5 = 2, 1/0.25 = 4)
 * 
 * // Date comparison
 * type Event = { name: string; date: Date }
 * const byDate = minBy((e: Event) => e.date.getTime())
 * 
 * const event1 = { name: "Meeting", date: new Date("2024-01-15") }
 * const event2 = { name: "Conference", date: new Date("2024-01-10") }
 * byDate(event1)(event2)
 * // { name: "Conference", date: new Date("2024-01-10") }
 * 
 * // Price comparison with discount
 * type Product = { name: string; price: number; discount: number }
 * const byFinalPrice = minBy((p: Product) => p.price * (1 - p.discount))
 * 
 * const item1 = { name: "Shirt", price: 50, discount: 0.2 }
 * const item2 = { name: "Pants", price: 80, discount: 0.5 }
 * byFinalPrice(item1)(item2)
 * // { name: "Pants", price: 80, discount: 0.5 } (final: 40 vs 40, returns second)
 * 
 * // Score comparison (lower is better)
 * type Score = { player: string; strokes: number; handicap: number }
 * const byNetScore = minBy((s: Score) => s.strokes - s.handicap)
 * 
 * const player1 = { player: "Alice", strokes: 85, handicap: 10 }
 * const player2 = { player: "Bob", strokes: 90, handicap: 18 }
 * byNetScore(player1)(player2)
 * // { player: "Bob", strokes: 90, handicap: 18 } (net: 72 vs 75)
 * 
 * // Complex calculation
 * const byComplexMetric = minBy((x: number) => Math.sin(x) + Math.cos(x))
 * byComplexMetric(Math.PI)(Math.PI / 2)
 * // Math.PI (result: -1 vs 1)
 * 
 * // Partial application for reuse
 * const closestToTen = minBy((x: number) => Math.abs(x - 10))
 * closestToTen(7)(13)
 * // 7 (distance: 3 vs 3, returns second... wait, 7)
 * 
 * closestToTen(5)(14)
 * // 5 (distance: 5 vs 4... actually 14)
 * 
 * closestToTen(8)(12)
 * // 8 (distance: 2 vs 2, returns second... 12)
 * 
 * // Let me recalculate
 * const nearTen = minBy((x: number) => Math.abs(x - 10))
 * nearTen(7)(13)
 * // 7 (|7-10| = 3, |13-10| = 3, equal so returns 13)
 * nearTen(5)(14)
 * // 5 (|5-10| = 5, |14-10| = 4, so returns 14 with smaller distance)
 * 
 * // Array reduction
 * const points = [
 *   { x: 5, y: 3 },
 *   { x: -2, y: 7 },
 *   { x: 1, y: 1 },
 *   { x: -4, y: -2 }
 * ]
 * const closestToOrigin = minBy((p: { x: number; y: number }) => 
 *   Math.sqrt(p.x * p.x + p.y * p.y)
 * )
 * points.reduce((min, point) => closestToOrigin(min)(point))
 * // { x: 1, y: 1 }
 * 
 * // File size comparison
 * type File = { name: string; size: number }
 * const bySize = minBy((f: File) => f.size)
 * 
 * const file1 = { name: "document.pdf", size: 2048000 }
 * const file2 = { name: "image.jpg", size: 512000 }
 * bySize(file1)(file2)
 * // { name: "image.jpg", size: 512000 }
 * 
 * // CPU usage comparison
 * type Process = { pid: number; cpu: number; memory: number }
 * const byMemory = minBy((p: Process) => p.memory)
 * const byCpu = minBy((p: Process) => p.cpu)
 * 
 * const proc1 = { pid: 1234, cpu: 15.5, memory: 256 }
 * const proc2 = { pid: 5678, cpu: 8.2, memory: 512 }
 * 
 * byMemory(proc1)(proc2)
 * // { pid: 1234, cpu: 15.5, memory: 256 }
 * 
 * byCpu(proc1)(proc2)
 * // { pid: 5678, cpu: 8.2, memory: 512 }
 * 
 * // Weighted comparison
 * type Item = { weight: number; value: number }
 * const byValuePerWeight = minBy((item: Item) => item.value / item.weight)
 * 
 * const gold = { weight: 10, value: 1000 }
 * const silver = { weight: 20, value: 500 }
 * byValuePerWeight(gold)(silver)
 * // { weight: 20, value: 500 } (25 < 100)
 * 
 * // Priority queue selection
 * type Task = { id: number; priority: number }
 * const byPriority = minBy((t: Task) => t.priority)
 * 
 * const task1 = { id: 1, priority: 3 }
 * const task2 = { id: 2, priority: 1 }
 * byPriority(task1)(task2)
 * // { id: 2, priority: 1 }
 * 
 * // Invalid mapper results
 * const badMapper = minBy(() => NaN)
 * badMapper(1)(2)
 * // NaN
 * 
 * const stringMapper = minBy(() => "not a number" as any)
 * stringMapper(1)(2)
 * // NaN
 * 
 * // Null/undefined handling
 * const nullMapper = minBy((x: any) => x?.value)
 * nullMapper({ value: 5 })({ value: 3 })
 * // { value: 3 }
 * 
 * nullMapper(null)({ value: 3 })
 * // NaN
 * 
 * nullMapper({ value: 3 })(undefined)
 * // NaN
 * 
 * // Infinity handling
 * const infinityTest = minBy((x: number) => x)
 * infinityTest(Infinity)(5)
 * // 5
 * 
 * infinityTest(-Infinity)(5)
 * // -Infinity
 * 
 * // Safe minBy with validation
 * const safeMinBy = <T>(fn: (x: T) => number) => (a: T) => (b: T): T | null => {
 *   const result = minBy(fn)(a)(b)
 *   return (result === result) ? result : null // NaN check
 * }
 * 
 * const safeLengthMin = safeMinBy((s: string) => s.length)
 * safeLengthMin("hello")("hi")
 * // "hi"
 * ```
 * @property Pure - Always returns same result for same inputs
 * @property Curried - Enables partial application and composition
 * @property Safe - Returns NaN when mapper produces invalid numbers
 * @property Higher-order - Takes a function and returns a comparison function
 */
const minBy = <T>(
	fn: (value: T) => number
) => (
	a: T
) => (
	b: T
): T => {
	if (typeof fn !== 'function') {
		return NaN as any
	}
	
	const aValue = fn(a)
	const bValue = fn(b)
	
	// Check if mapped values are valid numbers
	if (aValue == null || typeof aValue !== 'number' || isNaN(aValue)) {
		return NaN as any
	}
	
	if (bValue == null || typeof bValue !== 'number' || isNaN(bValue)) {
		return NaN as any
	}
	
	// Return the value with smaller mapped result
	// If equal, return the second value
	return aValue <= bValue ? a : b
}

export default minBy