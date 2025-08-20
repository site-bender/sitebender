/**
 * Reduces a Map to a single value
 * 
 * Applies a reducer function against an accumulator and each entry in the Map
 * (in iteration order) to reduce it to a single value. The reducer receives
 * the accumulator, current value, current key, and the Map itself. This is
 * the fundamental operation for aggregating Map data into summary values,
 * calculations, or transformed structures.
 * 
 * @curried (reducer) => (initial) => (map) => result
 * @param reducer - Function to execute on each entry
 * @param initial - Initial value for the accumulator
 * @param map - The Map to reduce
 * @returns The final accumulated value
 * @example
 * ```typescript
 * // Sum all values
 * const scores = new Map([
 *   ["Alice", 85],
 *   ["Bob", 92],
 *   ["Charlie", 78]
 * ])
 * const sum = (acc: number, val: number) => acc + val
 * reduce(sum)(0)(scores)
 * // 255
 * 
 * // Calculate average
 * const average = reduce(
 *   (acc: { sum: number; count: number }, val: number) => ({
 *     sum: acc.sum + val,
 *     count: acc.count + 1
 *   })
 * )({ sum: 0, count: 0 })(scores)
 * // { sum: 255, count: 3 } -> average = 255/3 = 85
 * 
 * // Concatenate strings
 * const words = new Map([
 *   ["1", "Hello"],
 *   ["2", " "],
 *   ["3", "World"]
 * ])
 * reduce((acc: string, val: string) => acc + val)("")(words)
 * // "Hello World"
 * 
 * // Build object from Map
 * const config = new Map([
 *   ["host", "localhost"],
 *   ["port", 3000],
 *   ["debug", true]
 * ])
 * reduce(
 *   (acc: any, val: any, key: string) => ({ ...acc, [key]: val })
 * )({})(config)
 * // { host: "localhost", port: 3000, debug: true }
 * 
 * // Find maximum value
 * const numbers = new Map([
 *   ["a", 5],
 *   ["b", 12],
 *   ["c", 8],
 *   ["d", 3]
 * ])
 * reduce((max: number, val: number) => val > max ? val : max)(-Infinity)(numbers)
 * // 12
 * 
 * // Find minimum with key
 * const temps = new Map([
 *   ["morning", 18],
 *   ["noon", 25],
 *   ["evening", 20],
 *   ["night", 15]
 * ])
 * reduce(
 *   (min: { key: string; value: number }, val: number, key: string) =>
 *     val < min.value ? { key, value: val } : min
 * )({ key: "", value: Infinity })(temps)
 * // { key: "night", value: 15 }
 * 
 * // Count by condition
 * const users = new Map([
 *   [1, { name: "Alice", active: true }],
 *   [2, { name: "Bob", active: false }],
 *   [3, { name: "Charlie", active: true }],
 *   [4, { name: "David", active: true }]
 * ])
 * reduce(
 *   (count: number, user: any) => user.active ? count + 1 : count
 * )(0)(users)
 * // 3
 * 
 * // Group by property
 * const products = new Map([
 *   ["p1", { name: "Apple", category: "fruit" }],
 *   ["p2", { name: "Carrot", category: "vegetable" }],
 *   ["p3", { name: "Banana", category: "fruit" }],
 *   ["p4", { name: "Lettuce", category: "vegetable" }]
 * ])
 * reduce(
 *   (groups: any, product: any, key: string) => {
 *     const cat = product.category
 *     if (!groups[cat]) groups[cat] = []
 *     groups[cat].push({ id: key, ...product })
 *     return groups
 *   }
 * )({})(products)
 * // { fruit: [{id:"p1",...}, {id:"p3",...}], vegetable: [{id:"p2",...}, {id:"p4",...}] }
 * 
 * // Collect values into array
 * const data = new Map([
 *   ["a", 1],
 *   ["b", 2],
 *   ["c", 3]
 * ])
 * reduce((arr: Array<number>, val: number) => [...arr, val])([])(data)
 * // [1, 2, 3]
 * 
 * // Empty Map
 * reduce(sum)(0)(new Map())
 * // 0
 * 
 * // Using all parameters
 * const inventory = new Map([
 *   ["apples", { count: 10, price: 0.5 }],
 *   ["oranges", { count: 5, price: 0.75 }],
 *   ["bananas", { count: 15, price: 0.3 }]
 * ])
 * reduce(
 *   (total: number, item: any, name: string, map: Map<string, any>) => {
 *     const value = item.count * item.price
 *     console.log(`${name}: ${item.count} × ${item.price} = ${value}`)
 *     return total + value
 *   }
 * )(0)(inventory)
 * // 12.75 (with console output showing calculations)
 * 
 * // Build Map-to-Map transformation
 * const original = new Map([
 *   ["a", 1],
 *   ["b", 2],
 *   ["c", 3]
 * ])
 * reduce(
 *   (newMap: Map<string, number>, val: number, key: string) => {
 *     newMap.set(key.toUpperCase(), val * 2)
 *     return newMap
 *   }
 * )(new Map())(original)
 * // Map { "A" => 2, "B" => 4, "C" => 6 }
 * 
 * // Complex aggregation
 * const sales = new Map([
 *   ["jan", { revenue: 1000, costs: 800 }],
 *   ["feb", { revenue: 1200, costs: 900 }],
 *   ["mar", { revenue: 1100, costs: 850 }]
 * ])
 * reduce(
 *   (acc: any, month: any) => ({
 *     totalRevenue: acc.totalRevenue + month.revenue,
 *     totalCosts: acc.totalCosts + month.costs,
 *     totalProfit: acc.totalProfit + (month.revenue - month.costs)
 *   })
 * )({ totalRevenue: 0, totalCosts: 0, totalProfit: 0 })(sales)
 * // { totalRevenue: 3300, totalCosts: 2550, totalProfit: 750 }
 * 
 * // Using with pipe
 * import { pipe } from "../../combinator/pipe/index.ts"
 * import { filter } from "../filter/index.ts"
 * 
 * const grades = new Map([
 *   ["Alice", 85],
 *   ["Bob", 72],
 *   ["Charlie", 90],
 *   ["David", 68],
 *   ["Eve", 95]
 * ])
 * 
 * pipe(
 *   grades,
 *   filter((grade: number) => grade >= 80),
 *   reduce((acc: number, grade: number) => acc + grade)(0)
 * )
 * // 270 (sum of passing grades)
 * 
 * // String building with formatting
 * const params = new Map([
 *   ["name", "Alice"],
 *   ["age", 30],
 *   ["city", "NYC"]
 * ])
 * reduce(
 *   (query: string, val: any, key: string) => 
 *     query + (query ? "&" : "") + `${key}=${encodeURIComponent(val)}`
 * )("")(params)
 * // "name=Alice&age=30&city=NYC"
 * 
 * // Frequency counting
 * const items = new Map([
 *   ["id1", "apple"],
 *   ["id2", "banana"],
 *   ["id3", "apple"],
 *   ["id4", "orange"],
 *   ["id5", "banana"],
 *   ["id6", "apple"]
 * ])
 * reduce(
 *   (freq: Map<string, number>, item: string) => {
 *     freq.set(item, (freq.get(item) || 0) + 1)
 *     return freq
 *   }
 * )(new Map())(items)
 * // Map { "apple" => 3, "banana" => 2, "orange" => 1 }
 * 
 * // Partial application
 * const sumReducer = reduce((a: number, b: number) => a + b)
 * const productReducer = reduce((a: number, b: number) => a * b)
 * 
 * const vals = new Map([["a", 2], ["b", 3], ["c", 4]])
 * sumReducer(0)(vals)     // 9
 * productReducer(1)(vals)  // 24
 * 
 * // Early termination simulation (not recommended, but possible)
 * const findFirst = <K, V>(predicate: (v: V) => boolean) =>
 *   reduce((found: V | null, val: V) => {
 *     if (found !== null) return found
 *     return predicate(val) ? val : null
 *   })(null)
 * 
 * const mixed = new Map([
 *   ["a", 5],
 *   ["b", 10],
 *   ["c", 15],
 *   ["d", 20]
 * ])
 * findFirst<string, number>((n: number) => n > 10)(mixed)
 * // 15 (first value > 10)
 * 
 * // Statistical calculations
 * const dataset = new Map([
 *   ["s1", 10],
 *   ["s2", 20],
 *   ["s3", 15],
 *   ["s4", 25],
 *   ["s5", 30]
 * ])
 * const stats = reduce(
 *   (acc: any, val: number) => {
 *     const newSum = acc.sum + val
 *     const newCount = acc.count + 1
 *     const newMean = newSum / newCount
 *     const newMin = Math.min(acc.min, val)
 *     const newMax = Math.max(acc.max, val)
 *     return { sum: newSum, count: newCount, mean: newMean, min: newMin, max: newMax }
 *   }
 * )({ sum: 0, count: 0, mean: 0, min: Infinity, max: -Infinity })(dataset)
 * // { sum: 100, count: 5, mean: 20, min: 10, max: 30 }
 * 
 * // Type safety
 * const typed = new Map<string, number>([
 *   ["a", 1],
 *   ["b", 2],
 *   ["c", 3]
 * ])
 * const result: string = reduce<string, number, string>(
 *   (acc, val, key) => acc + key + val
 * )("")(typed)
 * // "a1b2c3"
 * 
 * // Use in state management
 * type State = Map<string, any>
 * type Action = { type: "SUM_VALUES" }
 * 
 * const reducer = (state: State, action: Action) => {
 *   switch (action.type) {
 *     case "SUM_VALUES":
 *       return reduce((sum: number, val: any) => 
 *         typeof val === "number" ? sum + val : sum
 *       )(0)(state)
 *     default:
 *       return state
 *   }
 * }
 * ```
 * @property Pure - No side effects (assuming pure reducer)
 * @property Flexible - Reducer receives value, key, and Map
 * @property Curried - Allows partial application
 */
const reduce = <K, V, R>(
	reducer: (accumulator: R, value: V, key: K, map: Map<K, V>) => R
) =>
	(initial: R) =>
		(map: Map<K, V>): R => {
			let accumulator = initial
			for (const [key, value] of map) {
				accumulator = reducer(accumulator, value, key, map)
			}
			return accumulator
		}

export default reduce