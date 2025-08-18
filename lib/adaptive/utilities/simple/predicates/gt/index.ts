/**
 * Creates a predicate that checks if a value is greater than a threshold
 * 
 * Performs a greater-than comparison using JavaScript's > operator. This is a
 * curried function that creates reusable comparison predicates. Works with any
 * values that can be compared with >, including numbers, strings (alphabetical),
 * and dates (chronological). Uses type coercion rules when comparing different types.
 * 
 * Comparison behavior:
 * - Numbers: numerical comparison
 * - Strings: lexicographical comparison
 * - Dates: chronological comparison (via valueOf)
 * - Mixed types: follows JavaScript coercion rules
 * - NaN: always returns false (NaN > anything is false)
 * 
 * @curried (threshold) => (value) => boolean
 * @param threshold - The value to compare against
 * @param value - The value to check if greater than threshold
 * @returns True if value > threshold, false otherwise
 * @example
 * ```typescript
 * // Number comparisons
 * const isPositive = gt(0)
 * isPositive(5)        // true
 * isPositive(0)        // false
 * isPositive(-3)       // false
 * 
 * const isAboveTen = gt(10)
 * isAboveTen(11)       // true
 * isAboveTen(10)       // false
 * isAboveTen(9.99)     // false
 * 
 * // Decimal comparisons
 * const isAbovePi = gt(3.14159)
 * isAbovePi(3.15)      // true
 * isAbovePi(3.14159)   // false
 * isAbovePi(3.14)      // false
 * 
 * // String comparisons (alphabetical)
 * const afterM = gt("M")
 * afterM("N")          // true
 * afterM("Z")          // true
 * afterM("M")          // false
 * afterM("A")          // false
 * 
 * const afterHello = gt("hello")
 * afterHello("world")  // true
 * afterHello("help")   // true
 * afterHello("hello")  // false
 * afterHello("hell")   // false
 * 
 * // Date comparisons
 * const after2024 = gt(new Date("2024-01-01"))
 * after2024(new Date("2024-06-01"))  // true
 * after2024(new Date("2024-01-01"))  // false
 * after2024(new Date("2023-12-31"))  // false
 * 
 * // Filtering arrays
 * const numbers = [1, 5, 10, 15, 20, 25]
 * const largeNumbers = numbers.filter(gt(10))
 * // [15, 20, 25]
 * 
 * const scores = [65, 72, 89, 94, 58, 77]
 * const passingScores = scores.filter(gt(70))
 * // [72, 89, 94, 77]
 * 
 * // Age validation
 * interface Person {
 *   name: string
 *   age: number
 * }
 * 
 * const people: Person[] = [
 *   { name: "Alice", age: 17 },
 *   { name: "Bob", age: 18 },
 *   { name: "Charlie", age: 21 },
 *   { name: "Dana", age: 16 }
 * ]
 * 
 * const isAdult = (p: Person) => gt(17)(p.age)
 * const adults = people.filter(isAdult)
 * // [{ name: "Bob", age: 18 }, { name: "Charlie", age: 21 }]
 * 
 * // Temperature ranges
 * const isHot = gt(30)  // Celsius
 * const isCold = !gt(10)
 * 
 * const checkTemperature = (temp: number) => {
 *   if (isHot(temp)) return "Hot"
 *   if (gt(20)(temp)) return "Warm"
 *   if (gt(10)(temp)) return "Cool"
 *   return "Cold"
 * }
 * 
 * checkTemperature(35)  // "Hot"
 * checkTemperature(25)  // "Warm"
 * checkTemperature(15)  // "Cool"
 * checkTemperature(5)   // "Cold"
 * 
 * // Salary ranges
 * const isHighEarner = gt(100000)
 * const isMidRange = (salary: number) => 
 *   gt(50000)(salary) && !isHighEarner(salary)
 * 
 * isHighEarner(150000)  // true
 * isHighEarner(100000)  // false
 * isMidRange(75000)     // true
 * isMidRange(45000)     // false
 * 
 * // NaN behavior
 * gt(5)(NaN)           // false
 * gt(NaN)(5)           // false
 * gt(NaN)(NaN)         // false
 * 
 * // Infinity behavior
 * gt(1000)(Infinity)   // true
 * gt(Infinity)(1000)   // false
 * gt(-Infinity)(0)     // true
 * 
 * // Version comparison (semantic strings)
 * const isNewerThan = gt("2.0.0")
 * isNewerThan("2.0.1")  // true
 * isNewerThan("2.1.0")  // true
 * isNewerThan("10.0.0") // true (string comparison!)
 * isNewerThan("2.0.0")  // false
 * 
 * // Combining with other predicates
 * const between = (min: number, max: number) => (x: number) =>
 *   gt(min)(x) && !gt(max)(x)
 * 
 * const isTeenAge = between(12, 20)
 * isTeenAge(13)        // true
 * isTeenAge(19)        // true
 * isTeenAge(12)        // false
 * isTeenAge(20)        // false
 * 
 * // Priority/ranking systems
 * interface Task {
 *   priority: number
 *   name: string
 * }
 * 
 * const tasks: Task[] = [
 *   { priority: 1, name: "Low priority" },
 *   { priority: 5, name: "Medium priority" },
 *   { priority: 9, name: "High priority" },
 *   { priority: 3, name: "Low-medium priority" }
 * ]
 * 
 * const isHighPriority = (t: Task) => gt(7)(t.priority)
 * const highPriorityTasks = tasks.filter(isHighPriority)
 * // [{ priority: 9, name: "High priority" }]
 * ```
 * @property Pure - Always returns the same result for the same inputs
 * @property Curried - Can be partially applied for reusable comparisons
 * @property Coercive - Uses JavaScript's type coercion in comparisons
 * @property Total - Handles all comparable values including special cases
 */
const gt = <T>(threshold: T) => <U>(value: U): boolean => 
	value > threshold

export default gt