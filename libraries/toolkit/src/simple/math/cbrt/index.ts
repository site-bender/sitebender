/**
 * Returns the cube root of a number
 * 
 * Calculates the cube root (∛x), which is the value that when cubed
 * (raised to the power of 3) gives the original number. Unlike square
 * root, cube root is defined for negative numbers. Returns NaN for
 * non-numeric inputs to support safe error handling.
 * 
 * @param n - Number to find the cube root of
 * @returns Cube root of the number, or NaN if invalid
 * @example
 * ```typescript
 * // Perfect cubes
 * cbrt(8)
 * // 2
 * 
 * cbrt(27)
 * // 3
 * 
 * cbrt(125)
 * // 5
 * 
 * cbrt(1000)
 * // 10
 * 
 * // Negative numbers
 * cbrt(-8)
 * // -2
 * 
 * cbrt(-27)
 * // -3
 * 
 * cbrt(-125)
 * // -5
 * 
 * // Zero
 * cbrt(0)
 * // 0
 * 
 * cbrt(-0)
 * // -0
 * 
 * // One
 * cbrt(1)
 * // 1
 * 
 * cbrt(-1)
 * // -1
 * 
 * // Non-perfect cubes
 * cbrt(2)
 * // 1.2599210498948732
 * 
 * cbrt(10)
 * // 2.154434690031884
 * 
 * cbrt(100)
 * // 4.641588833612779
 * 
 * // Decimal numbers
 * cbrt(0.125)
 * // 0.5
 * 
 * cbrt(0.001)
 * // 0.1
 * 
 * cbrt(2.5)
 * // 1.3572088082974532
 * 
 * // Very small numbers
 * cbrt(0.000001)
 * // 0.01
 * 
 * cbrt(1e-9)
 * // 0.001
 * 
 * // Very large numbers
 * cbrt(1000000)
 * // 100
 * 
 * cbrt(1e9)
 * // 1000
 * 
 * // Special values
 * cbrt(Infinity)
 * // Infinity
 * 
 * cbrt(-Infinity)
 * // -Infinity
 * 
 * cbrt(NaN)
 * // NaN
 * 
 * // Invalid inputs return NaN
 * cbrt(null)
 * // NaN
 * 
 * cbrt(undefined)
 * // NaN
 * 
 * cbrt("8")
 * // NaN
 * 
 * cbrt("abc")
 * // NaN
 * 
 * cbrt({})
 * // NaN
 * 
 * cbrt([])
 * // NaN
 * 
 * // Volume calculations
 * function cubeVolume(sideLength: number): number {
 *   return sideLength ** 3
 * }
 * 
 * function cubeSideFromVolume(volume: number): number {
 *   return cbrt(volume)
 * }
 * 
 * cubeSideFromVolume(125)
 * // 5 (a cube with volume 125 has sides of length 5)
 * 
 * // Physics calculations
 * function sphereRadiusFromVolume(volume: number): number {
 *   // V = (4/3)πr³, so r = ∛(3V/4π)
 *   return cbrt((3 * volume) / (4 * Math.PI))
 * }
 * sphereRadiusFromVolume(4188.79) // Volume ≈ 4188.79
 * // 10 (approximately)
 * 
 * // Scaling calculations
 * function scaleFactorFromVolumeRatio(ratio: number): number {
 *   return cbrt(ratio)
 * }
 * scaleFactorFromVolumeRatio(8)
 * // 2 (double the linear dimensions = 8x the volume)
 * 
 * // Mathematical sequences
 * const cubes = [1, 8, 27, 64, 125]
 * const roots = cubes.map(cbrt)
 * // [1, 2, 3, 4, 5]
 * 
 * // Finding dimensions
 * const volumes = [1000, 2197, 3375, 4913]
 * const sides = volumes.map(cbrt)
 * // [10, 13, 15, 17]
 * 
 * // Signal processing (RMS calculations)
 * function cubeRootMeanCube(values: Array<number>): number {
 *   const cubes = values.map(v => v ** 3)
 *   const meanCube = cubes.reduce((a, b) => a + b, 0) / values.length
 *   return cbrt(meanCube)
 * }
 * cubeRootMeanCube([1, 2, 3, 4, 5])
 * // 3.936... (cube root of mean of cubes)
 * 
 * // Chemistry calculations (molar volume)
 * function atomicRadius(molarVolume: number, avogadro: number = 6.022e23): number {
 *   // Simplified: r ≈ ∛(3V/4πN)
 *   return cbrt((3 * molarVolume) / (4 * Math.PI * avogadro))
 * }
 * 
 * // Engineering calculations
 * function beamDeflection(load: number, length: number, elasticity: number): number {
 *   // Simplified formula involving cube root
 *   return cbrt(load * length ** 3 / elasticity)
 * }
 * 
 * // Data normalization
 * const data = [1, 8, 27, 64, 125, 216]
 * const normalized = data.map(cbrt)
 * // [1, 2, 3, 4, 5, 6]
 * 
 * // Growth rate calculations
 * function compoundGrowthRate(initial: number, final: number, periods: number): number {
 *   if (periods === 3) {
 *     return cbrt(final / initial) - 1
 *   }
 *   return Math.pow(final / initial, 1 / periods) - 1
 * }
 * compoundGrowthRate(1000, 1331, 3)
 * // 0.1 (10% growth rate over 3 periods)
 * 
 * // Safe calculation with error handling
 * function safeCubeRoot(value: unknown): number | null {
 *   const num = typeof value === 'number' ? cbrt(value) : NaN
 *   return isNaN(num) ? null : num
 * }
 * safeCubeRoot(27)
 * // 3
 * safeCubeRoot("invalid")
 * // null
 * ```
 * @property Pure - Always returns same result for same input
 * @property Safe - Returns NaN for invalid inputs
 * @property Symmetric - Works with both positive and negative numbers
 */
const cbrt = (
	n: number | null | undefined
): number => {
	if (n == null || typeof n !== 'number') {
		return NaN
	}
	
	return Math.cbrt(n)
}

export default cbrt