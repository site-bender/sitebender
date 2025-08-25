/**
 * Generates a random number within a specified range
 *
 * Returns a random floating-point number between min (inclusive) and
 * max (exclusive). Uses Math.random() internally for pseudorandom
 * generation. Returns NaN for invalid inputs or if min >= max.
 *
 * @curried (min) => (max) => random
 * @param min - Lower bound (inclusive)
 * @param max - Upper bound (exclusive)
 * @returns Random number in range [min, max), or NaN if invalid
 * @example
 * ```typescript
 * // Basic ranges
 * const r1 = random(0)(1)
 * // Random number between 0 and 1
 *
 * const r2 = random(0)(10)
 * // Random number between 0 and 10
 *
 * const r3 = random(1)(100)
 * // Random number between 1 and 100
 *
 * // Negative ranges
 * const r4 = random(-10)(10)
 * // Random number between -10 and 10
 *
 * const r5 = random(-100)(-50)
 * // Random number between -100 and -50
 *
 * // Decimal ranges
 * const r6 = random(0.5)(1.5)
 * // Random number between 0.5 and 1.5
 *
 * const r7 = random(3.14)(6.28)
 * // Random number between π and 2π
 *
 * // Invalid range (min >= max)
 * random(10)(5)
 * // NaN
 *
 * random(5)(5)
 * // NaN
 *
 * // Special values
 * random(-Infinity)(Infinity)
 * // Random number (very large range)
 *
 * random(0)(Infinity)
 * // Random positive number
 *
 * random(NaN)(10)
 * // NaN
 *
 * random(0)(NaN)
 * // NaN
 *
 * // Invalid inputs
 * random(null)(10)
 * // NaN
 *
 * random(0)(undefined)
 * // NaN
 *
 * random("0")(10)
 * // NaN
 *
 * random(0)("10")
 * // NaN
 *
 * // Partial application for specific ranges
 * const random0to1 = random(0)(1)
 * // Standard random like Math.random()
 *
 * const random1to10 = random(1)(10)
 * // Random between 1 and 10
 *
 * const randomPercent = random(0)(100)
 * // Random percentage value
 *
 * const randomAngle = random(0)(360)
 * // Random angle in degrees
 *
 * // Dice rolling
 * const d6 = () => Math.floor(random(1)(7))
 * d6()
 * // Random integer from 1 to 6
 *
 * const d20 = () => Math.floor(random(1)(21))
 * d20()
 * // Random integer from 1 to 20
 *
 * // Random boolean
 * const randomBool = () => random(0)(1) < 0.5
 * randomBool()
 * // true or false
 *
 * // Random from array (index)
 * const randomIndex = <T>(arr: Array<T>): number =>
 *   Math.floor(random(0)(arr.length))
 * const items = ['a', 'b', 'c', 'd']
 * items[randomIndex(items)]
 * // Random element
 *
 * // Random color component
 * const randomRGB = () => Math.floor(random(0)(256))
 * const color = {
 *   r: randomRGB(),
 *   g: randomRGB(),
 *   b: randomRGB()
 * }
 * // Random RGB color
 *
 * // Random coordinate
 * const randomX = random(0)(800) // screen width
 * const randomY = random(0)(600) // screen height
 * const point = { x: randomX, y: randomY }
 * // Random screen position
 *
 * // Random velocity
 * const randomVelocity = random(-5)(5)
 * const velocity = {
 *   vx: randomVelocity,
 *   vy: randomVelocity
 * }
 * // Random 2D velocity
 *
 * // Probability testing
 * const probability = random(0)(1)
 * if (probability < 0.3) {
 *   // 30% chance
 * }
 *
 * // Random time delay (ms)
 * const randomDelay = random(100)(1000)
 * setTimeout(() => {}, randomDelay)
 *
 * // Random scaling factor
 * const randomScale = random(0.5)(2)
 * // Between half and double size
 *
 * // Random audio pitch
 * const randomPitch = random(0.5)(2)
 * // Between half and double speed
 *
 * // Gaussian approximation (central limit theorem)
 * const gaussianApprox = () => {
 *   const samples = Array.from({ length: 6 }, () => random(0)(1))
 *   return samples.reduce((a, b) => a + b, 0) / 6
 * }
 * gaussianApprox()
 * // Tends toward 0.5 with bell curve distribution
 *
 * // Random walk step
 * const randomStep = random(-1)(1)
 * const position = 0
 * const newPosition = position + randomStep
 *
 * // Random sampling
 * const sample = (min: number, max: number, n: number): Array<number> =>
 *   Array.from({ length: n }, () => random(min)(max))
 * sample(0, 10, 5)
 * // [2.3, 7.1, 4.5, 9.2, 1.8] (example)
 *
 * // Monte Carlo simulation helper
 * const monteCarlo = (trials: number, min: number, max: number) => {
 *   const randomInRange = random(min)(max)
 *   return Array.from({ length: trials }, () => randomInRange)
 * }
 * const results = monteCarlo(1000, 0, 1)
 *
 * // Random jitter
 * const jitter = (value: number, amount: number): number => {
 *   const offset = random(-amount)(amount)
 *   return value + offset
 * }
 * jitter(100, 5)
 * // Value between 95 and 105
 *
 * // Random test data generator
 * const randomAge = random(18)(100)
 * const randomSalary = random(30000)(150000)
 * const randomScore = random(0)(100)
 *
 * // Weighted random (using ranges)
 * const weighted = () => {
 *   const r = random(0)(100)
 *   if (r < 60) return 'common'    // 60%
 *   if (r < 90) return 'uncommon'  // 30%
 *   return 'rare'                  // 10%
 * }
 *
 * // Random float with precision
 * const randomFixed = (min: number, max: number, decimals: number) => {
 *   const r = random(min)(max)
 *   return Math.round(r * Math.pow(10, decimals)) / Math.pow(10, decimals)
 * }
 * randomFixed(0, 10, 2)
 * // 7.43 (example with 2 decimal places)
 *
 * // Shuffle helper using random
 * const shuffleIndex = (length: number) =>
 *   Math.floor(random(0)(length))
 *
 * // Random exponential distribution
 * const exponential = (lambda: number) => {
 *   const u = random(0)(1)
 *   return -Math.log(1 - u) / lambda
 * }
 *
 * // Random noise generation
 * const noise = (amplitude: number) =>
 *   random(-amplitude)(amplitude)
 * const signal = 100
 * const noisySignal = signal + noise(5)
 *
 * // Safe random with validation
 * const safeRandom = (min: unknown) => (max: unknown): number | null => {
 *   const minNum = typeof min === 'number' ? min : NaN
 *   const maxNum = typeof max === 'number' ? max : NaN
 *   const result = random(minNum)(maxNum)
 *   return isNaN(result) ? null : result
 * }
 * safeRandom(0)(10)
 * // Random number or null
 * safeRandom("0")(10)
 * // null
 * ```
 * @property Impure - Returns different results each call (uses Math.random)
 * @property Curried - Enables partial application for range reuse
 * @property Safe - Returns NaN for invalid inputs or invalid range
 * @property Uniform - Generates uniformly distributed values
 */
const random = (
	min: number | null | undefined,
) =>
(
	max: number | null | undefined,
): number => {
	if (min == null || typeof min !== "number") {
		return NaN
	}

	if (max == null || typeof max !== "number") {
		return NaN
	}

	// Check for NaN inputs
	if (isNaN(min) || isNaN(max)) {
		return NaN
	}

	// Validate range
	if (min >= max) {
		return NaN
	}

	// Generate random number in range [min, max)
	return Math.random() * (max - min) + min
}

export default random
