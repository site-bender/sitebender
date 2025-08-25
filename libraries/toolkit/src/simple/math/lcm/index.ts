import gcd from "../gcd/index.ts"

/**
 * Calculates the least common multiple of two integers
 *
 * Finds the smallest positive integer that is divisible by both numbers.
 * Uses the formula LCM(a,b) = |a × b| / GCD(a,b) for efficiency. Works
 * with negative numbers by using their absolute values. Returns NaN for
 * non-integers, invalid inputs, or when either number is zero.
 *
 * @curried (a) => (b) => lcm
 * @param a - First integer
 * @param b - Second integer
 * @returns Least common multiple, or NaN if invalid
 * @example
 * ```typescript
 * // Basic LCM
 * lcm(4)(6)
 * // 12 (multiples of 4: 4,8,12,16...; multiples of 6: 6,12,18...)
 *
 * lcm(3)(5)
 * // 15
 *
 * lcm(12)(18)
 * // 36
 *
 * lcm(10)(15)
 * // 30
 *
 * lcm(7)(21)
 * // 21 (21 is already a multiple of 7)
 *
 * // Coprime numbers (LCM = product)
 * lcm(7)(11)
 * // 77
 *
 * lcm(13)(17)
 * // 221
 *
 * lcm(9)(16)
 * // 144
 *
 * // Same number
 * lcm(10)(10)
 * // 10
 *
 * lcm(42)(42)
 * // 42
 *
 * // One divides the other
 * lcm(5)(20)
 * // 20
 *
 * lcm(3)(15)
 * // 15
 *
 * lcm(8)(24)
 * // 24
 *
 * // With zero (undefined)
 * lcm(0)(5)
 * // NaN
 *
 * lcm(5)(0)
 * // NaN
 *
 * lcm(0)(0)
 * // NaN
 *
 * // Negative numbers (uses absolute values)
 * lcm(-4)(6)
 * // 12
 *
 * lcm(4)(-6)
 * // 12
 *
 * lcm(-4)(-6)
 * // 12
 *
 * lcm(-15)(5)
 * // 15
 *
 * // Large numbers
 * lcm(100)(150)
 * // 300
 *
 * lcm(1234)(5678)
 * // 3501826
 *
 * lcm(999)(1001)
 * // 999999
 *
 * // Prime numbers
 * lcm(17)(19)
 * // 323 (product since they're coprime)
 *
 * lcm(11)(22)
 * // 22
 *
 * lcm(13)(26)
 * // 26
 *
 * // Powers of 2
 * lcm(16)(24)
 * // 48
 *
 * lcm(32)(48)
 * // 96
 *
 * lcm(64)(128)
 * // 128
 *
 * // Invalid inputs return NaN
 * lcm(12.5)(8)
 * // NaN (non-integer)
 *
 * lcm(12)(8.3)
 * // NaN
 *
 * lcm(null)(8)
 * // NaN
 *
 * lcm(12)(undefined)
 * // NaN
 *
 * lcm("12")(8)
 * // NaN
 *
 * lcm(NaN)(8)
 * // NaN
 *
 * lcm(Infinity)(8)
 * // NaN
 *
 * // Partial application
 * const lcmWith12 = lcm(12)
 * lcmWith12(8)
 * // 24
 * lcmWith12(9)
 * // 36
 * lcmWith12(16)
 * // 48
 *
 * // Common denominator for fractions
 * function commonDenominator(denom1: number, denom2: number): number {
 *   const result = lcm(denom1)(denom2)
 *   return isNaN(result) ? 0 : result
 * }
 * commonDenominator(3, 4)
 * // 12 (for adding 1/3 + 1/4)
 * commonDenominator(6, 8)
 * // 24
 *
 * // LCM for multiple numbers
 * function lcmMultiple(numbers: Array<number>): number {
 *   if (numbers.length === 0) return NaN
 *   return numbers.reduce((acc, num) => {
 *     const result = lcm(acc)(num)
 *     return isNaN(result) ? NaN : result
 *   })
 * }
 * lcmMultiple([4, 6, 8])
 * // 24
 * lcmMultiple([3, 5, 7])
 * // 105
 *
 * // Scheduling - finding common period
 * function findCommonPeriod(period1: number, period2: number): number {
 *   const result = lcm(period1)(period2)
 *   return isNaN(result) ? 0 : result
 * }
 * findCommonPeriod(3, 5)
 * // 15 (events align every 15 time units)
 *
 * // Gear ratios
 * function gearCycle(teeth1: number, teeth2: number): {
 *   rotations1: number,
 *   rotations2: number,
 *   totalTeeth: number
 * } {
 *   const totalTeeth = lcm(teeth1)(teeth2)
 *   if (isNaN(totalTeeth)) {
 *     return { rotations1: 0, rotations2: 0, totalTeeth: 0 }
 *   }
 *   return {
 *     rotations1: totalTeeth / teeth1,
 *     rotations2: totalTeeth / teeth2,
 *     totalTeeth
 *   }
 * }
 * gearCycle(12, 18)
 * // { rotations1: 3, rotations2: 2, totalTeeth: 36 }
 *
 * // Music - beat alignment
 * function beatAlignment(pattern1: number, pattern2: number): number {
 *   // Find when two rhythmic patterns align
 *   return lcm(pattern1)(pattern2)
 * }
 * beatAlignment(3, 4)
 * // 12 (3/4 and 4/4 align every 12 beats)
 *
 * // Display refresh synchronization
 * function syncRefreshRates(rate1: number, rate2: number): number {
 *   // Find common refresh cycle (in Hz)
 *   const divisor = gcd(rate1)(rate2)
 *   if (isNaN(divisor) || divisor === 0) return NaN
 *   return lcm(rate1)(rate2)
 * }
 * syncRefreshRates(60, 144)
 * // 720 (frames align every 720/60=12 and 720/144=5 frames)
 *
 * // Tile pattern repeat
 * function patternRepeatArea(width: number, height: number): number {
 *   const result = lcm(width)(height)
 *   return isNaN(result) ? 0 : result * result
 * }
 * patternRepeatArea(3, 4)
 * // 144 (12×12 square)
 *
 * // Traffic light synchronization
 * function trafficLightSync(red1: number, red2: number): number {
 *   // When will both lights be red again?
 *   return lcm(red1)(red2)
 * }
 * trafficLightSync(45, 60)
 * // 180 seconds
 *
 * // Chemical equation balancing helper
 * function balanceCoefficients(ratios: Array<number>): Array<number> {
 *   const commonMultiple = lcmMultiple(ratios)
 *   if (isNaN(commonMultiple)) return ratios
 *   return ratios.map(r => commonMultiple / r)
 * }
 * balanceCoefficients([2, 3, 6])
 * // [3, 2, 1]
 *
 * // Animation frame sync
 * function animationSync(fps1: number, fps2: number): {
 *   frames1: number,
 *   frames2: number,
 *   duration: number
 * } {
 *   const totalFrames = lcm(fps1)(fps2)
 *   if (isNaN(totalFrames)) {
 *     return { frames1: 0, frames2: 0, duration: 0 }
 *   }
 *   return {
 *     frames1: totalFrames / fps1,
 *     frames2: totalFrames / fps2,
 *     duration: totalFrames / Math.min(fps1, fps2)
 *   }
 * }
 * animationSync(24, 30)
 * // { frames1: 5, frames2: 4, duration: 5 }
 *
 * // Network packet alignment
 * function packetAlignment(size1: number, size2: number): number {
 *   // Find common buffer size for two packet sizes
 *   return lcm(size1)(size2)
 * }
 * packetAlignment(1500, 9000)
 * // 9000 (jumbo frames align with standard MTU)
 *
 * // Orbital period calculation (simplified)
 * function orbitalSync(period1: number, period2: number): number {
 *   // When will two bodies align again?
 *   const days = lcm(Math.round(period1))(Math.round(period2))
 *   return isNaN(days) ? 0 : days
 * }
 * orbitalSync(365, 687) // Earth and Mars (simplified)
 * // 250755 days
 *
 * // Safe LCM with validation
 * function safeLCM(a: unknown, b: unknown): number | null {
 *   const aNum = typeof a === 'number' ? a : NaN
 *   const bNum = typeof b === 'number' ? b : NaN
 *   const result = lcm(aNum)(bNum)
 *   return isNaN(result) ? null : result
 * }
 * safeLCM(12, 8)
 * // 24
 * safeLCM(0, 8)
 * // null
 * safeLCM("12", 8)
 * // null
 * ```
 * @property Pure - Always returns same result for same inputs
 * @property Curried - Enables partial application and composition
 * @property Safe - Returns NaN for invalid inputs or zero
 * @property Commutative - lcm(a)(b) === lcm(b)(a)
 * @property Associative - lcm(lcm(a)(b))(c) === lcm(a)(lcm(b)(c))
 */
const lcm = (
	a: number | null | undefined,
) =>
(
	b: number | null | undefined,
): number => {
	if (a == null || typeof a !== "number") {
		return NaN
	}

	if (b == null || typeof b !== "number") {
		return NaN
	}

	// Check for non-integers
	if (!Number.isInteger(a) || !Number.isInteger(b)) {
		return NaN
	}

	// LCM is undefined for zero
	if (a === 0 || b === 0) {
		return NaN
	}

	// Calculate LCM using GCD
	const divisor = gcd(a)(b)
	// deno-coverage-ignore-start - Defensive check: gcd handles all edge cases, won't return NaN or 0 for valid integer inputs
	if (isNaN(divisor) || divisor === 0) {
		return NaN
	}
	// deno-coverage-ignore-stop

	// LCM(a,b) = |a × b| / GCD(a,b)
	return Math.abs(a * b) / divisor
}

export default lcm
