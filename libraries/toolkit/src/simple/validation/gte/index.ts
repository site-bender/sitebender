/**
 * Creates a predicate that checks if a value is greater than or equal to a threshold
 * 
 * Performs a greater-than-or-equal comparison using JavaScript's >= operator. This is a
 * curried function that creates reusable comparison predicates. Works with any values
 * that can be compared with >=, including numbers, strings (alphabetical), and dates
 * (chronological). Uses type coercion rules when comparing different types.
 * 
 * Comparison behavior:
 * - Numbers: numerical comparison
 * - Strings: lexicographical comparison
 * - Dates: chronological comparison (via valueOf)
 * - Mixed types: follows JavaScript coercion rules
 * - NaN: always returns false (NaN >= anything is false)
 * 
 * @curried (threshold) => (value) => boolean
 * @param threshold - The minimum value (inclusive)
 * @param value - The value to check if greater than or equal to threshold
 * @returns True if value >= threshold, false otherwise
 * @example
 * ```typescript
 * // Number comparisons
 * const isNonNegative = gte(0)
 * isNonNegative(5)      // true
 * isNonNegative(0)      // true (equal counts)
 * isNonNegative(-1)     // false
 * 
 * const isAtLeastTen = gte(10)
 * isAtLeastTen(11)      // true
 * isAtLeastTen(10)      // true (equal counts)
 * isAtLeastTen(9.99)    // false
 * 
 * // Decimal comparisons
 * const isAtLeastPi = gte(3.14159)
 * isAtLeastPi(3.15)     // true
 * isAtLeastPi(3.14159)  // true (exact match)
 * isAtLeastPi(3.14)     // false
 * 
 * // String comparisons (alphabetical)
 * const fromM = gte("M")
 * fromM("M")            // true (equal)
 * fromM("N")            // true
 * fromM("Z")            // true
 * fromM("L")            // false
 * 
 * const fromHello = gte("hello")
 * fromHello("hello")    // true (equal)
 * fromHello("world")    // true
 * fromHello("help")     // true
 * fromHello("hell")     // false
 * 
 * // Date comparisons
 * const from2024 = gte(new Date("2024-01-01"))
 * from2024(new Date("2024-06-01"))  // true
 * from2024(new Date("2024-01-01"))  // true (same date)
 * from2024(new Date("2023-12-31"))  // false
 * 
 * // Minimum value validation
 * const numbers = [1, 5, 10, 15, 20, 25]
 * const atLeast10 = numbers.filter(gte(10))
 * // [10, 15, 20, 25]
 * 
 * // Grade checking (inclusive threshold)
 * const scores = [65, 70, 89, 94, 58, 77]
 * const passingScores = scores.filter(gte(70))
 * // [70, 89, 94, 77] (70 is passing)
 * 
 * // Age validation (inclusive)
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
 * const canVote = (p: Person) => gte(18)(p.age)
 * const voters = people.filter(canVote)
 * // [{ name: "Bob", age: 18 }, { name: "Charlie", age: 21 }]
 * 
 * // Inventory management
 * interface Product {
 *   name: string
 *   stock: number
 *   reorderPoint: number
 * }
 * 
 * const products: Product[] = [
 *   { name: "Widget", stock: 50, reorderPoint: 20 },
 *   { name: "Gadget", stock: 15, reorderPoint: 15 },
 *   { name: "Doohickey", stock: 8, reorderPoint: 10 }
 * ]
 * 
 * const hasEnoughStock = (p: Product) => gte(p.reorderPoint)(p.stock)
 * const wellStocked = products.filter(hasEnoughStock)
 * // Widget (50 >= 20) and Gadget (15 >= 15)
 * 
 * // Temperature thresholds
 * const isWarm = gte(20)  // Celsius
 * const isFreezing = !gte(1)
 * 
 * const weatherAlert = (temp: number) => {
 *   if (gte(35)(temp)) return "Extreme heat warning"
 *   if (gte(30)(temp)) return "Heat advisory"
 *   if (gte(20)(temp)) return "Pleasant weather"
 *   if (gte(0)(temp)) return "Cold weather"
 *   return "Freezing conditions"
 * }
 * 
 * weatherAlert(35)  // "Extreme heat warning"
 * weatherAlert(30)  // "Heat advisory"
 * weatherAlert(20)  // "Pleasant weather"
 * weatherAlert(0)   // "Cold weather"
 * weatherAlert(-5)  // "Freezing conditions"
 * 
 * // Minimum balance requirements
 * const hasMinimumBalance = gte(1000)
 * const qualifiesForFreeChecking = gte(5000)
 * 
 * const accountTier = (balance: number) => {
 *   if (qualifiesForFreeChecking(balance)) return "Premium"
 *   if (hasMinimumBalance(balance)) return "Standard"
 *   return "Basic"
 * }
 * 
 * accountTier(5000)  // "Premium" (exactly 5000 qualifies)
 * accountTier(2500)  // "Standard"
 * accountTier(999)   // "Basic"
 * 
 * // NaN behavior
 * gte(5)(NaN)         // false
 * gte(NaN)(5)         // false
 * gte(NaN)(NaN)       // false
 * 
 * // Infinity behavior
 * gte(1000)(Infinity)   // true
 * gte(Infinity)(1000)   // false
 * gte(Infinity)(Infinity) // true
 * gte(-Infinity)(0)     // true
 * 
 * // Creating ranges with gt and gte
 * const inRange = (min: number, max: number, exclusive = false) => 
 *   exclusive
 *     ? (x: number) => gt(min)(x) && !gt(max)(x)
 *     : (x: number) => gte(min)(x) && !gt(max)(x)
 * 
 * const isWorkingAge = inRange(18, 65)
 * isWorkingAge(18)   // true (inclusive min)
 * isWorkingAge(64)   // true
 * isWorkingAge(65)   // false (exclusive max)
 * isWorkingAge(17)   // false
 * 
 * // Performance rating system
 * interface Employee {
 *   name: string
 *   rating: number
 * }
 * 
 * const employees: Employee[] = [
 *   { name: "Alice", rating: 4.5 },
 *   { name: "Bob", rating: 3.0 },
 *   { name: "Charlie", rating: 4.0 },
 *   { name: "Dana", rating: 2.5 }
 * ]
 * 
 * const meetsExpectations = (e: Employee) => gte(3.0)(e.rating)
 * const exceeds = (e: Employee) => gte(4.0)(e.rating)
 * 
 * employees.filter(meetsExpectations)
 * // Alice (4.5), Bob (3.0), Charlie (4.0)
 * 
 * employees.filter(exceeds)
 * // Alice (4.5), Charlie (4.0)
 * ```
 * @property Pure - Always returns the same result for the same inputs
 * @property Curried - Can be partially applied for reusable comparisons
 * @property Inclusive - Returns true when values are equal
 * @property Total - Handles all comparable values including special cases
 */
const gte = <T>(threshold: T) => <U>(value: U): boolean => 
	value >= threshold

export default gte