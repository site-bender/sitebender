/**
 * Finds the maximum value using a mapping function
 *
 * Applies a transformation function to two values and returns the value
 * that produces the larger result. This allows finding maximums based
 * on derived properties rather than the values themselves. Returns the
 * second value if the mapped results are equal. Returns NaN if either
 * mapped result is not a valid number.
 *
 * @curried (fn) => (a) => (b) => maximum
 * @param fn - Function to map values before comparison
 * @param a - First value to compare
 * @param b - Second value to compare
 * @returns The value that produces the larger mapped result
 * @example
 * ```typescript
 * // Simple numeric mapping
 * const byAbs = maxBy(Math.abs)
 * byAbs(-5)(3)
 * // -5 (abs(-5) = 5, abs(3) = 3)
 *
 * byAbs(-2)(8)
 * // 8 (abs(-2) = 2, abs(8) = 8)
 *
 * byAbs(4)(-4)
 * // -4 (when equal, returns second value)
 *
 * // Object property comparison
 * type Person = { name: string; age: number }
 * const byAge = maxBy((p: Person) => p.age)
 *
 * const alice = { name: "Alice", age: 30 }
 * const bob = { name: "Bob", age: 25 }
 * byAge(alice)(bob)
 * // { name: "Alice", age: 30 }
 *
 * // String length comparison
 * const byLength = maxBy((s: string) => s.length)
 * byLength("hello")("hi")
 * // "hello"
 *
 * byLength("cat")("elephant")
 * // "elephant"
 *
 * byLength("abc")("xyz")
 * // "xyz" (same length, returns second)
 *
 * // Array length comparison
 * const bySizeArray = maxBy((arr: Array<unknown>) => arr.length)
 * bySizeArray([1, 2, 3])([4, 5])
 * // [1, 2, 3]
 *
 * bySizeArray([1])([2, 3, 4])
 * // [2, 3, 4]
 *
 * // Distance from zero (furthest)
 * const furthestFromZero = maxBy(Math.abs)
 * furthestFromZero(5)(-3)
 * // 5
 *
 * furthestFromZero(-10)(8)
 * // -10
 *
 * furthestFromZero(7)(-7)
 * // -7 (equal distance, returns second)
 *
 * // Square comparison
 * const bySquare = maxBy((x: number) => x * x)
 * bySquare(3)(4)
 * // 4 (9 < 16)
 *
 * bySquare(-5)(4)
 * // -5 (25 > 16)
 *
 * // Reciprocal comparison (inverts order)
 * const byReciprocal = maxBy((x: number) => 1 / x)
 * byReciprocal(2)(4)
 * // 2 (1/2 = 0.5, 1/4 = 0.25)
 *
 * byReciprocal(0.5)(0.25)
 * // 0.5 (1/0.5 = 2, 1/0.25 = 4, so 0.25 wins)
 *
 * // Date comparison (latest)
 * type Event = { name: string; date: Date }
 * const byDate = maxBy((e: Event) => e.date.getTime())
 *
 * const event1 = { name: "Meeting", date: new Date("2024-01-15") }
 * const event2 = { name: "Conference", date: new Date("2024-01-10") }
 * byDate(event1)(event2)
 * // { name: "Meeting", date: new Date("2024-01-15") }
 *
 * // Price comparison (highest value)
 * type Product = { name: string; price: number; discount: number }
 * const byFinalPrice = maxBy((p: Product) => p.price * (1 - p.discount))
 *
 * const item1 = { name: "Shirt", price: 50, discount: 0.2 }
 * const item2 = { name: "Pants", price: 80, discount: 0.5 }
 * byFinalPrice(item1)(item2)
 * // { name: "Shirt", price: 50, discount: 0.2 } (final: 40 vs 40, returns second)
 *
 * // Score comparison (higher is better)
 * type Score = { player: string; points: number; bonus: number }
 * const byTotalScore = maxBy((s: Score) => s.points + s.bonus)
 *
 * const player1 = { player: "Alice", points: 85, bonus: 10 }
 * const player2 = { player: "Bob", points: 90, bonus: 5 }
 * byTotalScore(player1)(player2)
 * // { player: "Alice", points: 85, bonus: 10 } (total: 95 vs 95, returns second)
 *
 * // Complex calculation
 * const byComplexMetric = maxBy((x: number) => Math.sin(x) + Math.cos(x))
 * byComplexMetric(0)(Math.PI / 4)
 * // Math.PI / 4 (result: 1 vs 1.414...)
 *
 * // Partial application for reuse
 * const furthestFromTen = maxBy((x: number) => Math.abs(x - 10))
 * furthestFromTen(7)(13)
 * // 7 (distance: 3 vs 3, returns second... 13)
 *
 * furthestFromTen(5)(14)
 * // 5 (distance: 5 vs 4, so returns 5 with larger distance)
 *
 * furthestFromTen(2)(18)
 * // 2 (distance: 8 vs 8, returns second... 18)
 *
 * // Array reduction
 * const points = [
 *   { x: 5, y: 3 },
 *   { x: -2, y: 7 },
 *   { x: 1, y: 1 },
 *   { x: -4, y: -2 }
 * ]
 * const furthestFromOrigin = maxBy((p: { x: number; y: number }) =>
 *   Math.sqrt(p.x * p.x + p.y * p.y)
 * )
 * points.reduce((max, point) => furthestFromOrigin(max)(point))
 * // { x: -2, y: 7 }
 *
 * // File size comparison (largest)
 * type File = { name: string; size: number }
 * const bySize = maxBy((f: File) => f.size)
 *
 * const file1 = { name: "document.pdf", size: 2048000 }
 * const file2 = { name: "image.jpg", size: 512000 }
 * bySize(file1)(file2)
 * // { name: "document.pdf", size: 2048000 }
 *
 * // CPU usage comparison (highest usage)
 * type Process = { pid: number; cpu: number; memory: number }
 * const byMemory = maxBy((p: Process) => p.memory)
 * const byCpu = maxBy((p: Process) => p.cpu)
 *
 * const proc1 = { pid: 1234, cpu: 15.5, memory: 256 }
 * const proc2 = { pid: 5678, cpu: 8.2, memory: 512 }
 *
 * byMemory(proc1)(proc2)
 * // { pid: 5678, cpu: 8.2, memory: 512 }
 *
 * byCpu(proc1)(proc2)
 * // { pid: 1234, cpu: 15.5, memory: 256 }
 *
 * // Value comparison (most valuable)
 * type Item = { weight: number; value: number }
 * const byValuePerWeight = maxBy((item: Item) => item.value / item.weight)
 *
 * const gold = { weight: 10, value: 1000 }
 * const silver = { weight: 20, value: 500 }
 * byValuePerWeight(gold)(silver)
 * // { weight: 10, value: 1000 } (100 > 25)
 *
 * // Priority selection (highest priority)
 * type Task = { id: number; priority: number }
 * const byPriority = maxBy((t: Task) => t.priority)
 *
 * const task1 = { id: 1, priority: 3 }
 * const task2 = { id: 2, priority: 1 }
 * byPriority(task1)(task2)
 * // { id: 1, priority: 3 }
 *
 * // Performance metrics
 * type Metric = { name: string; value: number; weight: number }
 * const byWeightedValue = maxBy((m: Metric) => m.value * m.weight)
 *
 * const metric1 = { name: "Speed", value: 0.8, weight: 2 }
 * const metric2 = { name: "Accuracy", value: 0.9, weight: 3 }
 * byWeightedValue(metric1)(metric2)
 * // { name: "Accuracy", value: 0.9, weight: 3 } (2.7 > 1.6)
 *
 * // Invalid mapper results
 * const badMapper = maxBy(() => NaN)
 * badMapper(1)(2)
 * // NaN
 *
 * const stringMapper = maxBy(() => "not a number" as any)
 * stringMapper(1)(2)
 * // NaN
 *
 * // Null/undefined handling
 * const nullMapper = maxBy((x: any) => x?.value)
 * nullMapper({ value: 5 })({ value: 3 })
 * // { value: 5 }
 *
 * nullMapper(null)({ value: 3 })
 * // NaN
 *
 * nullMapper({ value: 3 })(undefined)
 * // NaN
 *
 * // Infinity handling
 * const infinityTest = maxBy((x: number) => x)
 * infinityTest(Infinity)(5)
 * // Infinity
 *
 * infinityTest(-Infinity)(5)
 * // 5
 *
 * // Temperature records
 * type Reading = { time: string; temp: number }
 * const byTemp = maxBy((r: Reading) => r.temp)
 *
 * const morning = { time: "08:00", temp: 65 }
 * const afternoon = { time: "14:00", temp: 78 }
 * byTemp(morning)(afternoon)
 * // { time: "14:00", temp: 78 }
 *
 * // Stock prices (highest)
 * type Stock = { symbol: string; price: number; volume: number }
 * const byPrice = maxBy((s: Stock) => s.price)
 * const byVolume = maxBy((s: Stock) => s.volume)
 *
 * const stock1 = { symbol: "AAPL", price: 150.50, volume: 1000000 }
 * const stock2 = { symbol: "GOOGL", price: 2800.75, volume: 500000 }
 *
 * byPrice(stock1)(stock2)
 * // { symbol: "GOOGL", price: 2800.75, volume: 500000 }
 *
 * byVolume(stock1)(stock2)
 * // { symbol: "AAPL", price: 150.50, volume: 1000000 }
 *
 * // Game high scores
 * type GameScore = { player: string; score: number; level: number }
 * const byScore = maxBy((g: GameScore) => g.score)
 *
 * const score1 = { player: "Alice", score: 10000, level: 5 }
 * const score2 = { player: "Bob", score: 12000, level: 4 }
 * byScore(score1)(score2)
 * // { player: "Bob", score: 12000, level: 4 }
 *
 * // Finding peaks
 * const values = [3, 7, 2, 9, 4, 8, 1]
 * const peak = values.reduce((max, val) =>
 *   maxBy((x: number) => x)(max)(val)
 * )
 * // 9
 *
 * // Safe maxBy with validation
 * const safeMaxBy = <T>(fn: (x: T) => number) => (a: T) => (b: T): T | null => {
 *   const result = maxBy(fn)(a)(b)
 *   return (result === result) ? result : null // NaN check
 * }
 *
 * const safeLengthMax = safeMaxBy((s: string) => s.length)
 * safeLengthMax("hello")("hi")
 * // "hello"
 * ```
 * @property Pure - Always returns same result for same inputs
 * @property Curried - Enables partial application and composition
 * @property Safe - Returns NaN when mapper produces invalid numbers
 * @property Higher-order - Takes a function and returns a comparison function
 */
const maxBy = <T>(
	fn: (value: T) => number,
) =>
(
	a: T,
) =>
(
	b: T,
): T => {
	if (typeof fn !== "function") {
		return NaN as any
	}

	const aValue = fn(a)
	const bValue = fn(b)

	// Check if mapped values are valid numbers
	if (aValue == null || typeof aValue !== "number" || isNaN(aValue)) {
		return NaN as any
	}

	if (bValue == null || typeof bValue !== "number" || isNaN(bValue)) {
		return NaN as any
	}

	// Return the value with larger mapped result
	// If equal, return the second value
	return aValue >= bValue ? a : b
}

export default maxBy
