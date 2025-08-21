/**
 * Generates a random integer within a specified range
 * 
 * Returns a random integer between min (inclusive) and max (exclusive).
 * Uses Math.random() internally with proper flooring for integer generation.
 * Returns NaN for invalid inputs, non-integer bounds, or if min >= max.
 * 
 * @curried (min) => (max) => randomInteger
 * @param min - Lower bound (inclusive, must be integer)
 * @param max - Upper bound (exclusive, must be integer)
 * @returns Random integer in range [min, max), or NaN if invalid
 * @example
 * ```typescript
 * // Basic integer ranges
 * const r1 = randomInteger(0)(10)
 * // Random integer from 0 to 9
 * 
 * const r2 = randomInteger(1)(7)
 * // Random integer from 1 to 6 (dice roll)
 * 
 * const r3 = randomInteger(1)(101)
 * // Random integer from 1 to 100
 * 
 * // Negative ranges
 * const r4 = randomInteger(-10)(10)
 * // Random integer from -10 to 9
 * 
 * const r5 = randomInteger(-100)(-50)
 * // Random integer from -100 to -51
 * 
 * // Single value range (always returns min)
 * randomInteger(5)(6)
 * // Always 5 (only one possible value)
 * 
 * // Invalid range (min >= max)
 * randomInteger(10)(5)
 * // NaN
 * 
 * randomInteger(5)(5)
 * // NaN
 * 
 * // Non-integer bounds return NaN
 * randomInteger(1.5)(10)
 * // NaN
 * 
 * randomInteger(0)(10.5)
 * // NaN
 * 
 * randomInteger(3.14)(6.28)
 * // NaN
 * 
 * // Special values
 * randomInteger(0)(Infinity)
 * // NaN (Infinity is not an integer)
 * 
 * randomInteger(-Infinity)(0)
 * // NaN
 * 
 * randomInteger(0)(NaN)
 * // NaN
 * 
 * randomInteger(NaN)(10)
 * // NaN
 * 
 * // Invalid inputs
 * randomInteger(null)(10)
 * // NaN
 * 
 * randomInteger(0)(undefined)
 * // NaN
 * 
 * randomInteger("0")(10)
 * // NaN
 * 
 * randomInteger(0)("10")
 * // NaN
 * 
 * // Partial application for specific ranges
 * const coinFlip = randomInteger(0)(2)
 * // 0 or 1
 * 
 * const d6 = randomInteger(1)(7)
 * // 1 through 6 (standard die)
 * 
 * const d20 = randomInteger(1)(21)
 * // 1 through 20 (D&D die)
 * 
 * const percentile = randomInteger(1)(101)
 * // 1 through 100
 * 
 * // Array index selection
 * const randomIndex = <T>(arr: Array<T>): number =>
 *   randomInt(0)(arr.length)
 * const items = ['apple', 'banana', 'cherry', 'date']
 * const index = randomIndex(items)
 * items[index]
 * // Random element
 * 
 * // Random card from deck
 * const randomCard = randomInteger(0)(52)
 * // 0 to 51 (representing 52 cards)
 * 
 * // Random month (1-12)
 * const randomMonth = randomInteger(1)(13)
 * // 1 through 12
 * 
 * // Random day of month (assuming 31 days)
 * const randomDay = randomInteger(1)(32)
 * // 1 through 31
 * 
 * // Random hour (24-hour format)
 * const randomHour = randomInteger(0)(24)
 * // 0 through 23
 * 
 * // Random RGB color component
 * const randomRGB = randomInteger(0)(256)
 * const color = {
 *   r: randomRGB,
 *   g: randomRGB,
 *   b: randomRGB
 * }
 * // Random RGB values
 * 
 * // Random port number (common range)
 * const randomPort = randomInteger(1024)(65536)
 * // 1024 through 65535
 * 
 * // Random ASCII printable character code
 * const randomAscii = randomInteger(32)(127)
 * String.fromCharCode(randomAscii)
 * // Random printable character
 * 
 * // Dice rolling simulator
 * const rollDice = (sides: number) => randomInt(1)(sides + 1)
 * rollDice(6)
 * // 1-6
 * rollDice(12)
 * // 1-12
 * rollDice(100)
 * // 1-100
 * 
 * // Random boolean as 0 or 1
 * const randomBinary = randomInteger(0)(2)
 * Boolean(randomBinary)
 * // true or false
 * 
 * // Random team selection
 * const teamSize = 5
 * const randomTeamMember = randomInteger(0)(teamSize)
 * // 0 to 4 (team member index)
 * 
 * // Random grid position
 * const gridWidth = 10
 * const gridHeight = 10
 * const randomX = randomInteger(0)(gridWidth)
 * const randomY = randomInteger(0)(gridHeight)
 * const position = { x: randomX, y: randomY }
 * 
 * // Lottery number generator
 * const lotteryNumber = randomInteger(1)(50)
 * const picks = Array.from({ length: 6 }, () => lotteryNumber)
 * // Six random numbers 1-49
 * 
 * // Random priority level
 * const randomPriority = randomInteger(1)(6)
 * // 1 (highest) to 5 (lowest)
 * 
 * // Weighted random selection using ranges
 * const weightedRandom = () => {
 *   const r = randomInteger(0)(100)
 *   if (r < 60) return 'common'    // 60% chance
 *   if (r < 90) return 'uncommon'  // 30% chance
 *   return 'rare'                  // 10% chance
 * }
 * 
 * // Random test data generation
 * const randomAge = randomInteger(0)(120)
 * const randomScore = randomInteger(0)(101)
 * const randomQuantity = randomInteger(1)(1000)
 * 
 * // Shuffling helper
 * const randomSwapIndex = (length: number) => 
 *   randomInt(0)(length)
 * 
 * // Random sampling without replacement
 * const sample = (min: number, max: number, n: number): Array<number> => {
 *   if (max - min < n) return []
 *   const results: Array<number> = []
 *   const used = new Set<number>()
 *   while (results.length < n) {
 *     const value = randomInteger(min)(max)
 *     if (!used.has(value)) {
 *       used.add(value)
 *       results.push(value)
 *     }
 *   }
 *   return results
 * }
 * sample(1, 50, 6)
 * // 6 unique numbers between 1 and 49
 * 
 * // Random enum value
 * enum Status { Pending = 0, Active = 1, Complete = 2 }
 * const randomStatus = randomInteger(0)(3) as Status
 * 
 * // Random array partition
 * const partitionIndex = <T>(arr: Array<T>) => 
 *   randomInt(0)(arr.length + 1)
 * const arr = [1, 2, 3, 4, 5]
 * const splitAt = partitionIndex(arr)
 * // Random split point
 * 
 * // Monte Carlo simulation with integers
 * const trials = 1000
 * const results = Array.from({ length: trials }, () => 
 *   randomInt(1)(7)
 * )
 * // 1000 dice rolls
 * 
 * // Random walk step
 * const randomStep = () => {
 *   const r = randomInteger(0)(4)
 *   if (r === 0) return { dx: 0, dy: -1 }  // up
 *   if (r === 1) return { dx: 1, dy: 0 }   // right
 *   if (r === 2) return { dx: 0, dy: 1 }   // down
 *   return { dx: -1, dy: 0 }               // left
 * }
 * 
 * // Random error code generation
 * const errorCodes = [400, 401, 403, 404, 500, 502, 503]
 * const randomErrorIndex = randomInteger(0)(errorCodes.length)
 * errorCodes[randomErrorIndex]
 * // Random error code
 * 
 * // Safe randomInteger with validation
 * const safeRandomInteger = (min: unknown) => (max: unknown): number | null => {
 *   const minNum = typeof min === 'number' ? min : NaN
 *   const maxNum = typeof max === 'number' ? max : NaN
 *   const result = randomInteger(minNum)(maxNum)
 *   return isNaN(result) ? null : result
 * }
 * safeRandomInteger(0)(10)
 * // Random integer or null
 * safeRandomInteger("0")(10)
 * // null
 * ```
 * @property Impure - Returns different results each call (uses Math.random)
 * @property Curried - Enables partial application for range reuse
 * @property Safe - Returns NaN for invalid inputs or invalid range
 * @property Uniform - Generates uniformly distributed integers
 * @property Integer-only - Requires integer bounds, returns integers only
 */
const randomInteger = (
	min: number | null | undefined
) => (
	max: number | null | undefined
): number => {
	if (min == null || typeof min !== 'number') {
		return NaN
	}
	
	if (max == null || typeof max !== 'number') {
		return NaN
	}
	
	// Check for NaN inputs
	if (isNaN(min) || isNaN(max)) {
		return NaN
	}
	
	// Check if bounds are integers
	if (!Number.isInteger(min) || !Number.isInteger(max)) {
		return NaN
	}
	
	// Validate range
	if (min >= max) {
		return NaN
	}
	
	// Generate random integer in range [min, max)
	return Math.floor(Math.random() * (max - min)) + min
}

export default randomInteger