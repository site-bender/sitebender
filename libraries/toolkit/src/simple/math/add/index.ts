/**
 * Adds two numbers together
 *
 * Performs addition of two numbers with curried application for
 * functional composition. Returns the sum of the augend and addend.
 * Returns NaN if either input is not a valid number, enabling safe
 * error propagation in functional pipelines.
 *
 * @curried (augend) => (addend) => sum
 * @param augend - First number (the number to be added to)
 * @param addend - Second number (the number being added)
 * @returns Sum of the two numbers, or NaN if invalid
 * @example
 * ```typescript
 * // Basic addition
 * add(2)(3)
 * // 5
 *
 * add(10)(25)
 * // 35
 *
 * // Negative numbers
 * add(-5)(3)
 * // -2
 *
 * add(-10)(-20)
 * // -30
 *
 * add(5)(-8)
 * // -3
 *
 * // Decimal numbers
 * add(1.5)(2.3)
 * // 3.8
 *
 * add(0.1)(0.2)
 * // 0.30000000000000004 (floating point precision)
 *
 * add(99.99)(0.01)
 * // 100
 *
 * // Zero identity
 * add(0)(5)
 * // 5
 *
 * add(5)(0)
 * // 5
 *
 * add(0)(0)
 * // 0
 *
 * // Large numbers
 * add(1000000)(2000000)
 * // 3000000
 *
 * add(Number.MAX_SAFE_INTEGER)(0)
 * // 9007199254740991
 *
 * // Special values
 * add(Infinity)(1)
 * // Infinity
 *
 * add(-Infinity)(Infinity)
 * // NaN
 *
 * add(5)(NaN)
 * // NaN
 *
 * // Partial application
 * const increment = add(1)
 * increment(5)
 * // 6
 *
 * const add10 = add(10)
 * add10(32)
 * // 42
 *
 * const subtract5 = add(-5)
 * subtract5(10)
 * // 5
 *
 * // Function composition
 * const addTax = add(0.08)
 * const addShipping = add(5.99)
 * const total = (price: number) => addShipping(addTax(price))
 * total(100)
 * // 114.07
 *
 * // Array operations
 * const numbers = [1, 2, 3, 4, 5]
 * numbers.map(add(10))
 * // [11, 12, 13, 14, 15]
 *
 * // Running total
 * const expenses = [10.50, 25.00, 8.75, 42.30]
 * expenses.reduce((sum, expense) => add(sum)(expense), 0)
 * // 86.55
 *
 * // Invalid inputs return NaN
 * add(null)(5)
 * // NaN
 *
 * add(5)(undefined)
 * // NaN
 *
 * add("5")(3)
 * // NaN
 *
 * add(5)("3")
 * // NaN
 *
 * add({})(5)
 * // NaN
 *
 * // Coordinate manipulation
 * function translateX(x: number, dx: number): number {
 *   return add(x)(dx)
 * }
 * translateX(100, 50)
 * // 150
 *
 * // Temperature conversion helper
 * const celsiusToKelvin = add(273.15)
 * celsiusToKelvin(0)
 * // 273.15
 * celsiusToKelvin(100)
 * // 373.15
 *
 * // Score accumulation
 * const scores = [85, 92, 78, 95, 88]
 * const bonus = 5
 * const withBonus = scores.map(add(bonus))
 * // [90, 97, 83, 100, 93]
 *
 * // Time calculations
 * const addHours = add
 * const startTime = 9
 * const duration = 3.5
 * addHours(startTime)(duration)
 * // 12.5
 *
 * // Financial calculations
 * const principal = 1000
 * const interest = 50
 * const addInterest = add(interest)
 * addInterest(principal)
 * // 1050
 *
 * // Vector operations
 * function addVectors(v1: Array<number>, v2: Array<number>): Array<number> {
 *   return v1.map((val, i) => add(val)(v2[i] ?? 0))
 * }
 * addVectors([1, 2, 3], [4, 5, 6])
 * // [5, 7, 9]
 *
 * // Chaining with other operations
 * const double = (n: number) => add(n)(n)
 * double(7)
 * // 14
 *
 * // Complex calculations
 * const calculate = (base: number) => {
 *   const withTax = add(base * 0.08)
 *   const withFee = add(2.50)
 *   return withFee(withTax(base))
 * }
 * calculate(100)
 * // 110.50
 *
 * // Safe arithmetic with NaN propagation
 * const safeAdd = (a: unknown) => (b: unknown): number => {
 *   const aNum = typeof a === 'number' ? a : NaN
 *   const bNum = typeof b === 'number' ? b : NaN
 *   return add(aNum)(bNum)
 * }
 * safeAdd("invalid")(5)
 * // NaN
 * ```
 * @property Pure - Always returns same result for same inputs
 * @property Curried - Enables partial application and composition
 * @property Safe - Returns NaN for invalid inputs
 * @property Commutative - add(a)(b) === add(b)(a)
 * @property Associative - add(add(a)(b))(c) === add(a)(add(b)(c))
 */
const add = (
	augend: number | null | undefined,
) =>
(
	addend: number | null | undefined,
): number => {
	if (augend == null || typeof augend !== "number") {
		return NaN
	}

	if (addend == null || typeof addend !== "number") {
		return NaN
	}

	return augend + addend
}

export default add
