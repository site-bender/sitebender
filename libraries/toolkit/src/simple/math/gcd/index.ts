/**
 * Calculates the greatest common divisor of two integers
 *
 * Finds the largest positive integer that divides both numbers without
 * remainder. Uses the Euclidean algorithm for efficiency. Works with
 * negative numbers by using their absolute values. Returns NaN for
 * non-integers, invalid inputs, or when both numbers are zero.
 *
 * @curried (a) => (b) => gcd
 * @param a - First integer
 * @param b - Second integer
 * @returns Greatest common divisor, or NaN if invalid
 * @example
 * ```typescript
 * // Basic GCD
 * gcd(12)(8)
 * // 4 (factors of 12: 1,2,3,4,6,12; factors of 8: 1,2,4,8)
 *
 * gcd(10)(5)
 * // 5
 *
 * gcd(21)(14)
 * // 7
 *
 * gcd(48)(18)
 * // 6
 *
 * // Coprime numbers (GCD = 1)
 * gcd(7)(5)
 * // 1
 *
 * gcd(13)(17)
 * // 1
 *
 * gcd(9)(16)
 * // 1
 *
 * // Same number
 * gcd(10)(10)
 * // 10
 *
 * gcd(42)(42)
 * // 42
 *
 * // One number divides the other
 * gcd(20)(5)
 * // 5
 *
 * gcd(100)(25)
 * // 25
 *
 * gcd(15)(45)
 * // 15
 *
 * // With zero (GCD(n, 0) = |n|)
 * gcd(5)(0)
 * // 5
 *
 * gcd(0)(5)
 * // 5
 *
 * gcd(0)(0)
 * // NaN (undefined)
 *
 * // Negative numbers (uses absolute values)
 * gcd(-12)(8)
 * // 4
 *
 * gcd(12)(-8)
 * // 4
 *
 * gcd(-12)(-8)
 * // 4
 *
 * gcd(-15)(5)
 * // 5
 *
 * // Large numbers
 * gcd(1071)(462)
 * // 21
 *
 * gcd(2024)(2023)
 * // 1 (consecutive integers are always coprime)
 *
 * gcd(1000000)(500000)
 * // 500000
 *
 * // Prime numbers
 * gcd(17)(19)
 * // 1 (different primes are coprime)
 *
 * gcd(13)(26)
 * // 13
 *
 * gcd(11)(121)
 * // 11
 *
 * // Powers of 2
 * gcd(16)(24)
 * // 8
 *
 * gcd(32)(48)
 * // 16
 *
 * gcd(64)(128)
 * // 64
 *
 * // Invalid inputs return NaN
 * gcd(12.5)(8)
 * // NaN (non-integer)
 *
 * gcd(12)(8.3)
 * // NaN
 *
 * gcd(null)(8)
 * // NaN
 *
 * gcd(12)(undefined)
 * // NaN
 *
 * gcd("12")(8)
 * // NaN
 *
 * gcd(NaN)(8)
 * // NaN
 *
 * gcd(Infinity)(8)
 * // NaN
 *
 * // Partial application
 * const gcdWith12 = gcd(12)
 * gcdWith12(8)
 * // 4
 * gcdWith12(9)
 * // 3
 * gcdWith12(16)
 * // 4
 *
 * // Fraction simplification
 * function simplifyFraction(numerator: number, denominator: number): [number, number] {
 *   const divisor = gcd(Math.abs(numerator))(Math.abs(denominator))
 *   if (isNaN(divisor)) return [numerator, denominator]
 *   return [numerator / divisor, denominator / divisor]
 * }
 * simplifyFraction(12, 8)
 * // [3, 2] (12/8 = 3/2)
 * simplifyFraction(50, 100)
 * // [1, 2] (50/100 = 1/2)
 *
 * // LCM calculation using GCD
 * function lcm(a: number, b: number): number {
 *   const g = gcd(a)(b)
 *   return isNaN(g) || g === 0 ? NaN : Math.abs(a * b) / g
 * }
 * lcm(12, 8)
 * // 24
 * lcm(5, 7)
 * // 35
 *
 * // Check if coprime
 * function areCoprime(a: number, b: number): boolean {
 *   return gcd(a)(b) === 1
 * }
 * areCoprime(15, 28)
 * // true
 * areCoprime(15, 25)
 * // false (GCD = 5)
 *
 * // Extended GCD for multiple numbers
 * function gcdMultiple(numbers: Array<number>): number {
 *   if (numbers.length === 0) return NaN
 *   return numbers.reduce((acc, num) => {
 *     const g = gcd(acc)(num)
 *     return isNaN(g) ? NaN : g
 *   })
 * }
 * gcdMultiple([12, 18, 24])
 * // 6
 * gcdMultiple([100, 75, 50, 25])
 * // 25
 *
 * // Aspect ratio calculation
 * function aspectRatio(width: number, height: number): string {
 *   const divisor = gcd(width)(height)
 *   if (isNaN(divisor)) return `${width}:${height}`
 *   return `${width / divisor}:${height / divisor}`
 * }
 * aspectRatio(1920, 1080)
 * // "16:9"
 * aspectRatio(1024, 768)
 * // "4:3"
 *
 * // Music: Beat subdivision
 * function simplifyTimeSignature(beats: number, noteValue: number): [number, number] {
 *   const divisor = gcd(beats)(noteValue)
 *   return [beats / divisor, noteValue / divisor]
 * }
 * simplifyTimeSignature(6, 8)
 * // [3, 4]
 *
 * // Grid alignment
 * function commonGridSize(size1: number, size2: number): number {
 *   return gcd(size1)(size2)
 * }
 * commonGridSize(48, 64)
 * // 16 (pixels)
 *
 * // Gear ratio calculation
 * function gearRatio(teeth1: number, teeth2: number): string {
 *   const [a, b] = simplifyFraction(teeth1, teeth2)
 *   return `${a}:${b}`
 * }
 * gearRatio(48, 16)
 * // "3:1"
 *
 * // Tile pattern repeat
 * function patternRepeat(width: number, height: number): number {
 *   // Smallest square that tiles evenly
 *   return lcm(width, height)
 * }
 * patternRepeat(3, 4)
 * // 12 (12x12 square contains exact tiles)
 *
 * // Chemical formula simplification
 * function simplifyFormula(coefficients: Array<number>): Array<number> {
 *   const g = gcdMultiple(coefficients)
 *   if (isNaN(g) || g === 0) return coefficients
 *   return coefficients.map(c => c / g)
 * }
 * simplifyFormula([4, 6, 2])
 * // [2, 3, 1]
 *
 * // Bezout's identity helper (ax + by = gcd(a,b))
 * function extendedGCD(a: number, b: number): {gcd: number, x: number, y: number} {
 *   if (b === 0) {
 *     return {gcd: a, x: 1, y: 0}
 *   }
 *   const {gcd: g, x: x1, y: y1} = extendedGCD(b, a % b)
 *   return {
 *     gcd: g,
 *     x: y1,
 *     y: x1 - Math.floor(a / b) * y1
 *   }
 * }
 *
 * // Modular inverse (if exists)
 * function modInverse(a: number, m: number): number | null {
 *   const g = gcd(a)(m)
 *   if (g !== 1) return null // No inverse exists
 *   const {x} = extendedGCD(a, m)
 *   return ((x % m) + m) % m
 * }
 *
 * // Safe GCD with validation
 * function safeGCD(a: unknown, b: unknown): number | null {
 *   const aNum = typeof a === 'number' ? a : NaN
 *   const bNum = typeof b === 'number' ? b : NaN
 *   const result = gcd(aNum)(bNum)
 *   return isNaN(result) ? null : result
 * }
 * safeGCD(12, 8)
 * // 4
 * safeGCD(12.5, 8)
 * // null
 * safeGCD("12", 8)
 * // null
 * ```
 * @property Pure - Always returns same result for same inputs
 * @property Curried - Enables partial application and composition
 * @property Safe - Returns NaN for invalid inputs
 * @property Commutative - gcd(a)(b) === gcd(b)(a)
 * @property Associative - gcd(gcd(a)(b))(c) === gcd(a)(gcd(b)(c))
 */
const gcd = (
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

	// Use absolute values
	let x = Math.abs(a)
	let y = Math.abs(b)

	// GCD(0, 0) is undefined
	if (x === 0 && y === 0) {
		return NaN
	}

	// Euclidean algorithm
	while (y !== 0) {
		const temp = y
		y = x % y
		x = temp
	}

	return x
}

export default gcd
