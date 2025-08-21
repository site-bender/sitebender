/**
 * Constrains a number between minimum and maximum bounds
 * 
 * Restricts a value to lie within a specified range. If the value is
 * less than the minimum, returns the minimum. If greater than the
 * maximum, returns the maximum. Otherwise returns the value unchanged.
 * Returns NaN for invalid inputs to support safe error handling.
 * 
 * @curried (min) => (max) => (value) => result
 * @param min - Lower bound (inclusive)
 * @param max - Upper bound (inclusive)
 * @param value - Number to constrain
 * @returns Value constrained to [min, max], or NaN if invalid
 * @example
 * ```typescript
 * // Basic clamping
 * clamp(0)(10)(5)
 * // 5 (within range)
 * 
 * clamp(0)(10)(15)
 * // 10 (clamped to max)
 * 
 * clamp(0)(10)(-5)
 * // 0 (clamped to min)
 * 
 * // Exactly at bounds
 * clamp(0)(10)(0)
 * // 0
 * 
 * clamp(0)(10)(10)
 * // 10
 * 
 * // Decimal numbers
 * clamp(1.5)(2.5)(2.0)
 * // 2.0
 * 
 * clamp(1.5)(2.5)(3.0)
 * // 2.5
 * 
 * clamp(1.5)(2.5)(1.0)
 * // 1.5
 * 
 * // Negative ranges
 * clamp(-10)(-5)(-7)
 * // -7
 * 
 * clamp(-10)(-5)(-12)
 * // -10
 * 
 * clamp(-10)(-5)(-3)
 * // -5
 * 
 * // Mixed positive/negative
 * clamp(-5)(5)(0)
 * // 0
 * 
 * clamp(-5)(5)(7)
 * // 5
 * 
 * clamp(-5)(5)(-8)
 * // -5
 * 
 * // Same min and max (forces value)
 * clamp(5)(5)(10)
 * // 5
 * 
 * clamp(5)(5)(3)
 * // 5
 * 
 * clamp(5)(5)(5)
 * // 5
 * 
 * // Invalid range (min > max) returns NaN
 * clamp(10)(5)(7)
 * // NaN
 * 
 * // Special values
 * clamp(0)(10)(Infinity)
 * // 10
 * 
 * clamp(0)(10)(-Infinity)
 * // 0
 * 
 * clamp(-Infinity)(Infinity)(42)
 * // 42
 * 
 * clamp(0)(10)(NaN)
 * // NaN
 * 
 * // Invalid inputs return NaN
 * clamp(null)(10)(5)
 * // NaN
 * 
 * clamp(0)(undefined)(5)
 * // NaN
 * 
 * clamp(0)(10)(null)
 * // NaN
 * 
 * clamp("0")(10)(5)
 * // NaN
 * 
 * // Partial application for specific ranges
 * const clampPercent = clamp(0)(100)
 * clampPercent(150)
 * // 100
 * clampPercent(-20)
 * // 0
 * clampPercent(75)
 * // 75
 * 
 * // RGB color values
 * const clampRGB = clamp(0)(255)
 * clampRGB(300)
 * // 255
 * clampRGB(-50)
 * // 0
 * clampRGB(128)
 * // 128
 * 
 * // Angle normalization (degrees)
 * const clampAngle = clamp(0)(360)
 * clampAngle(450)
 * // 360
 * clampAngle(-90)
 * // 0
 * 
 * // Volume control
 * const clampVolume = clamp(0)(1)
 * clampVolume(1.5)
 * // 1
 * clampVolume(-0.2)
 * // 0
 * clampVolume(0.75)
 * // 0.75
 * 
 * // Temperature limits
 * const clampCelsius = clamp(-273.15)(Infinity)
 * clampCelsius(-300)
 * // -273.15 (absolute zero)
 * clampCelsius(100)
 * // 100
 * 
 * // Array index bounds
 * function safeIndex(arr: Array<unknown>, index: number): number {
 *   return clamp(0)(arr.length - 1)(index)
 * }
 * safeIndex([1, 2, 3, 4, 5], 7)
 * // 4 (max index)
 * safeIndex([1, 2, 3], -2)
 * // 0 (min index)
 * 
 * // Game physics (speed limits)
 * const clampSpeed = clamp(0)(200)
 * const playerSpeed = 250
 * const actualSpeed = clampSpeed(playerSpeed)
 * // 200 (max speed)
 * 
 * // UI constraints
 * function constrainPosition(x: number, y: number, width: number, height: number) {
 *   const clampX = clamp(0)(width)
 *   const clampY = clamp(0)(height)
 *   return {
 *     x: clampX(x),
 *     y: clampY(y)
 *   }
 * }
 * constrainPosition(150, -20, 100, 100)
 * // { x: 100, y: 0 }
 * 
 * // Health/damage systems
 * const clampHealth = clamp(0)(100)
 * let health = 100
 * health = clampHealth(health - 120) // Take 120 damage
 * // 0 (can't go below 0)
 * 
 * // Zoom levels
 * const clampZoom = clamp(0.5)(4)
 * clampZoom(0.1)
 * // 0.5 (min zoom)
 * clampZoom(10)
 * // 4 (max zoom)
 * 
 * // Progress bar
 * const clampProgress = clamp(0)(1)
 * function updateProgress(current: number, total: number): number {
 *   return clampProgress(current / total)
 * }
 * updateProgress(150, 100)
 * // 1 (100% max)
 * 
 * // Animation frames
 * const totalFrames = 60
 * const clampFrame = clamp(0)(totalFrames - 1)
 * clampFrame(75)
 * // 59
 * 
 * // Score systems
 * const clampScore = clamp(0)(999999)
 * const bonusMultiplier = 5
 * const baseScore = 200000
 * clampScore(baseScore * bonusMultiplier)
 * // 999999 (max score)
 * 
 * // Difficulty settings
 * const clampDifficulty = clamp(1)(10)
 * clampDifficulty(0)
 * // 1 (easiest)
 * clampDifficulty(15)
 * // 10 (hardest)
 * 
 * // Pipeline processing
 * const pipeline = [
 *   (x: number) => x * 2,
 *   clamp(-100)(100),
 *   (x: number) => x + 10
 * ]
 * const process = (val: number) => 
 *   pipeline.reduce((acc, fn) => fn(acc), val)
 * process(60)
 * // 110 (60 * 2 = 120, clamped to 100, + 10 = 110)
 * 
 * // Safe calculation with validation
 * function safeClamp(min: unknown, max: unknown, value: unknown): number | null {
 *   const minNum = typeof min === 'number' ? min : NaN
 *   const maxNum = typeof max === 'number' ? max : NaN
 *   const valNum = typeof value === 'number' ? value : NaN
 *   const result = clamp(minNum)(maxNum)(valNum)
 *   return isNaN(result) ? null : result
 * }
 * safeClamp(0, 10, 5)
 * // 5
 * safeClamp("0", 10, 5)
 * // null
 * ```
 * @property Pure - Always returns same result for same inputs
 * @property Curried - Enables partial application and composition
 * @property Safe - Returns NaN for invalid inputs or invalid range
 * @property Idempotent - clamp(a)(b)(clamp(a)(b)(x)) === clamp(a)(b)(x)
 */
const clamp = (
	min: number | null | undefined
) => (
	max: number | null | undefined
) => (
	value: number | null | undefined
): number => {
	if (min == null || typeof min !== 'number') {
		return NaN
	}
	
	if (max == null || typeof max !== 'number') {
		return NaN
	}
	
	if (value == null || typeof value !== 'number') {
		return NaN
	}
	
	// Check for invalid range
	if (min > max) {
		return NaN
	}
	
	if (value < min) {
		return min
	}
	
	if (value > max) {
		return max
	}
	
	return value
}

export default clamp