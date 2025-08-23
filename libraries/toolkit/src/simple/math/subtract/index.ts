/**
 * Subtracts the second number from the first
 * 
 * Performs subtraction with curried application for functional
 * composition. Returns the difference between the minuend and
 * subtrahend. Returns NaN if either input is not a valid number,
 * enabling safe error propagation in functional pipelines.
 * 
 * @curried (minuend) => (subtrahend) => difference
 * @param minuend - The number to subtract from
 * @param subtrahend - The number to subtract
 * @returns Difference of the two numbers, or NaN if invalid
 * @example
 * ```typescript
 * // Basic subtraction
 * subtract(5)(3)
 * // 2
 * 
 * subtract(10)(7)
 * // 3
 * 
 * subtract(100)(25)
 * // 75
 * 
 * // Negative results
 * subtract(3)(5)
 * // -2
 * 
 * subtract(10)(20)
 * // -10
 * 
 * subtract(0)(5)
 * // -5
 * 
 * // Negative numbers
 * subtract(-5)(3)
 * // -8
 * 
 * subtract(-10)(-5)
 * // -5
 * 
 * subtract(5)(-3)
 * // 8
 * 
 * // Decimal numbers
 * subtract(3.5)(1.2)
 * // 2.3
 * 
 * subtract(10.75)(0.25)
 * // 10.5
 * 
 * subtract(1)(0.1)
 * // 0.9 (with floating point precision)
 * 
 * // Zero operations
 * subtract(5)(0)
 * // 5
 * 
 * subtract(0)(0)
 * // 0
 * 
 * subtract(0)(10)
 * // -10
 * 
 * // Same number (zero difference)
 * subtract(7)(7)
 * // 0
 * 
 * subtract(-3)(-3)
 * // 0
 * 
 * // Large numbers
 * subtract(1000000)(500000)
 * // 500000
 * 
 * subtract(Number.MAX_SAFE_INTEGER)(1)
 * // 9007199254740990
 * 
 * // Special values
 * subtract(Infinity)(100)
 * // Infinity
 * 
 * subtract(100)(Infinity)
 * // -Infinity
 * 
 * subtract(Infinity)(Infinity)
 * // NaN
 * 
 * subtract(5)(NaN)
 * // NaN
 * 
 * subtract(NaN)(5)
 * // NaN
 * 
 * // Invalid inputs
 * subtract(null)(5)
 * // NaN
 * 
 * subtract(5)(undefined)
 * // NaN
 * 
 * subtract("5")(3)
 * // NaN
 * 
 * subtract(5)("3")
 * // NaN
 * 
 * subtract({})(5)
 * // NaN
 * 
 * // Partial application
 * const decrement = subtract(1)
 * decrement(5)
 * // 4
 * decrement(10)
 * // 9
 * 
 * const subtract10 = (n: number) => subtract(n)(10)
 * subtract10(25)
 * // 15
 * subtract10(5)
 * // -5
 * 
 * const fromHundred = subtract(100)
 * fromHundred(25)
 * // 75
 * fromHundred(150)
 * // -50
 * 
 * // Array operations
 * const numbers = [10, 20, 30, 40, 50]
 * numbers.map(subtract(5))
 * // [5, 15, 25, 35, 45]
 * 
 * const values = [100, 200, 300]
 * values.map(n => subtract(n)(50))
 * // [50, 150, 250]
 * 
 * // Calculate change
 * const oldValue = 100
 * const newValue = 75
 * const change = subtract(newValue)(oldValue)
 * // -25
 * 
 * // Temperature difference
 * const highTemp = 30
 * const lowTemp = 18
 * const tempRange = subtract(highTemp)(lowTemp)
 * // 12
 * 
 * // Price calculation
 * const originalPrice = 99.99
 * const discount = 20
 * const salePrice = subtract(originalPrice)(discount)
 * // 79.99
 * 
 * // Account balance
 * const balance = 1000
 * const withdrawal = 250
 * const newBalance = subtract(balance)(withdrawal)
 * // 750
 * 
 * // Time difference
 * const endTime = 14.5 // 2:30 PM
 * const startTime = 9.0 // 9:00 AM
 * const duration = subtract(endTime)(startTime)
 * // 5.5 hours
 * 
 * // Score difference
 * const homeScore = 85
 * const awayScore = 78
 * const margin = subtract(homeScore)(awayScore)
 * // 7
 * 
 * // Coordinate calculations
 * const x2 = 10
 * const x1 = 3
 * const deltaX = subtract(x2)(x1)
 * // 7
 * 
 * // Budget tracking
 * const budget = 5000
 * const spent = 3200
 * const remaining = subtract(budget)(spent)
 * // 1800
 * 
 * // Inventory management
 * const stock = 500
 * const sold = 123
 * const currentStock = subtract(stock)(sold)
 * // 377
 * 
 * // Distance to target
 * const target = 100
 * const current = 65
 * const toGo = subtract(target)(current)
 * // 35
 * 
 * // Countdown
 * const total = 60
 * const elapsed = 15
 * const timeLeft = subtract(total)(elapsed)
 * // 45
 * 
 * // Health points
 * const maxHealth = 100
 * const damage = 35
 * const currentHealth = subtract(maxHealth)(damage)
 * // 65
 * 
 * // Fuel calculation
 * const tankCapacity = 50
 * const fuelUsed = 32.5
 * const fuelRemaining = subtract(tankCapacity)(fuelUsed)
 * // 17.5
 * 
 * // Array reduction (sequential subtraction)
 * const expenses = [100, 20, 30, 15]
 * const totalExpense = expenses.reduce((acc, expense) => 
 *   subtract(acc)(expense), 500)
 * // 335 (500 - 100 - 20 - 30 - 15)
 * 
 * // Difference between elements
 * const sequence = [10, 15, 22, 30, 45]
 * const differences = sequence.slice(1).map((val, i) => 
 *   subtract(val)(sequence[i]))
 * // [5, 7, 8, 15]
 * 
 * // Centering values (subtract mean)
 * const data = [10, 20, 30, 40, 50]
 * const mean = 30
 * const centered = data.map(v => subtract(v)(mean))
 * // [-20, -10, 0, 10, 20]
 * 
 * // Pipeline processing
 * const process = (n: number) => {
 *   const step1 = subtract(n)(10)
 *   const step2 = Math.abs(step1)
 *   return step2
 * }
 * process(7)
 * // 3
 * process(15)
 * // 5
 * 
 * // Comparison implementation
 * const isGreaterThan = (a: number) => (b: number) => 
 *   subtract(a)(b) > 0
 * isGreaterThan(10)(5)
 * // true
 * isGreaterThan(5)(10)
 * // false
 * 
 * // Safe subtract with validation
 * const safeSubtract = (a: unknown) => (b: unknown): number | null => {
 *   const aNum = typeof a === 'number' ? a : NaN
 *   const bNum = typeof b === 'number' ? b : NaN
 *   const result = subtract(aNum)(bNum)
 *   return isNaN(result) ? null : result
 * }
 * safeSubtract(10)(3)
 * // 7
 * safeSubtract("10")(3)
 * // null
 * ```
 * @property Pure - Always returns same result for same inputs
 * @property Curried - Enables partial application and composition
 * @property Safe - Returns NaN for invalid inputs
 * @property Anti-commutative - subtract(a)(b) === -subtract(b)(a)
 */
const subtract = (
	minuend: number | null | undefined
) => (
	subtrahend: number | null | undefined
): number => {
	if (minuend == null || typeof minuend !== 'number') {
		return NaN
	}
	
	if (subtrahend == null || typeof subtrahend !== 'number') {
		return NaN
	}
	
	return minuend - subtrahend
}

export default subtract