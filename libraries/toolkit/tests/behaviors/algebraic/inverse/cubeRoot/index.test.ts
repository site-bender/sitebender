import { assertEquals, assertAlmostEquals } from "https://deno.land/std@0.218.0/assert/mod.ts"
import * as fc from "npm:fast-check@3"

import cubeRoot from "../../../../../src/simple/math/cubeRoot/index.ts"
import approximately from "../../../../helpers/assertions/approximately/index.ts"

Deno.test("cubeRoot: JSDoc examples", async (t) => {
	await t.step("perfect cubes", () => {
		assertEquals(cubeRoot(8), 2)
		assertEquals(cubeRoot(27), 3)
		assertEquals(cubeRoot(125), 5)
		assertEquals(cubeRoot(1000), 10)
	})

	await t.step("negative numbers", () => {
		assertEquals(cubeRoot(-8), -2)
		assertEquals(cubeRoot(-27), -3)
		assertEquals(cubeRoot(-125), -5)
	})

	await t.step("zero", () => {
		assertEquals(cubeRoot(0), 0)
		assertEquals(Object.is(cubeRoot(-0), -0), true)
	})

	await t.step("one", () => {
		assertEquals(cubeRoot(1), 1)
		assertEquals(cubeRoot(-1), -1)
	})

	await t.step("non-perfect cubes", () => {
		assertAlmostEquals(cubeRoot(2), 1.2599210498948732, 1e-10)
		assertAlmostEquals(cubeRoot(10), 2.154434690031884, 1e-10)
		assertAlmostEquals(cubeRoot(100), 4.641588833612779, 1e-10)
	})

	await t.step("decimal numbers", () => {
		assertAlmostEquals(cubeRoot(0.125), 0.5, 1e-10)
		assertAlmostEquals(cubeRoot(0.001), 0.1, 1e-10)
		assertAlmostEquals(cubeRoot(2.5), 1.3572088082974532, 1e-10)
	})

	await t.step("very small numbers", () => {
		assertAlmostEquals(cubeRoot(0.000001), 0.01, 1e-10)
		assertAlmostEquals(cubeRoot(1e-9), 0.001, 1e-10)
	})

	await t.step("very large numbers", () => {
		assertEquals(cubeRoot(1000000), 100)
		assertEquals(cubeRoot(1e9), 1000)
	})

	await t.step("special values", () => {
		assertEquals(cubeRoot(Infinity), Infinity)
		assertEquals(cubeRoot(-Infinity), -Infinity)
		assertEquals(Number.isNaN(cubeRoot(NaN)), true)
	})

	await t.step("invalid inputs return NaN", () => {
		assertEquals(Number.isNaN(cubeRoot(null)), true)
		assertEquals(Number.isNaN(cubeRoot(undefined)), true)
		assertEquals(Number.isNaN(cubeRoot("8" as any)), true)
		assertEquals(Number.isNaN(cubeRoot("abc" as any)), true)
		assertEquals(Number.isNaN(cubeRoot({} as any)), true)
		assertEquals(Number.isNaN(cubeRoot([] as any)), true)
	})

	await t.step("volume calculations", () => {
		function cubeSideFromVolume(volume: number): number {
			return cubeRoot(volume)
		}
		assertEquals(cubeSideFromVolume(125), 5)
	})

	await t.step("physics calculations", () => {
		function sphereRadiusFromVolume(volume: number): number {
			return cubeRoot((3 * volume) / (4 * Math.PI))
		}
		assertAlmostEquals(sphereRadiusFromVolume(4188.79), 10, 0.01)
	})

	await t.step("scaling calculations", () => {
		function scaleFactorFromVolumeRatio(ratio: number): number {
			return cubeRoot(ratio)
		}
		assertEquals(scaleFactorFromVolumeRatio(8), 2)
	})

	await t.step("mathematical sequences", () => {
		const cubes = [1, 8, 27, 64, 125]
		const roots = cubes.map(cubeRoot)
		assertEquals(roots, [1, 2, 3, 4, 5])
	})

	await t.step("finding dimensions", () => {
		const volumes = [1000, 2197, 3375, 4913]
		const sides = volumes.map(cubeRoot)
		assertEquals(sides, [10, 13, 15, 17])
	})

	await t.step("signal processing", () => {
		function cubeRootMeanCube(values: Array<number>): number {
			const cubes = values.map(v => v ** 3)
			const meanCube = cubes.reduce((a, b) => a + b, 0) / values.length
			return cubeRoot(meanCube)
		}
		assertAlmostEquals(cubeRootMeanCube([1, 2, 3, 4, 5]), 3.5568933044900626, 0.001)
	})

	await t.step("growth rate calculations", () => {
		function compoundGrowthRate(initial: number, final: number, periods: number): number {
			if (periods === 3) {
				return cubeRoot(final / initial) - 1
			}
			return Math.pow(final / initial, 1 / periods) - 1
		}
		assertAlmostEquals(compoundGrowthRate(1000, 1331, 3), 0.1, 1e-10)
	})

	await t.step("safe calculation with error handling", () => {
		function safeCubeRoot(value: unknown): number | null {
			const num = typeof value === 'number' ? cubeRoot(value) : NaN
			return isNaN(num) ? null : num
		}
		assertEquals(safeCubeRoot(27), 3)
		assertEquals(safeCubeRoot("invalid"), null)
	})
})

Deno.test("cubeRoot: property-based testing", async (t) => {
	await t.step("inverse relationship with cube", () => {
		fc.assert(
			fc.property(
				fc.float({ noNaN: true, min: -1e6, max: 1e6 }),
				(n) => {
					const root = cubeRoot(n)
					const cubed = root ** 3
					
					// Handle special cases
					if (!Number.isFinite(n)) {
						return Object.is(root, Math.cbrt(n))
					}
					
					// For small numbers, use absolute epsilon
					if (Math.abs(n) < 1) {
						return approximately(cubed, n, 1e-10)
					}
					
					// For larger numbers, use relative epsilon
					const relativeEpsilon = Math.max(1e-10, Math.abs(n) * 1e-12)
					return approximately(cubed, n, relativeEpsilon)
				}
			),
			{ numRuns: 1000 }
		)
	})

	await t.step("preserves sign", () => {
		fc.assert(
			fc.property(
				fc.float({ noNaN: true, noDefaultInfinity: true }),
				(n) => {
					const result = cubeRoot(n)
					if (n === 0 || n === -0) {
						return Object.is(result, n)
					}
					return Math.sign(result) === Math.sign(n)
				}
			),
			{ numRuns: 1000 }
		)
	})

	await t.step("monotonic increasing", () => {
		fc.assert(
			fc.property(
				fc.tuple(
					fc.float({ noNaN: true, noDefaultInfinity: true }),
					fc.float({ noNaN: true, noDefaultInfinity: true })
				),
				([a, b]) => {
					const rootA = cubeRoot(a)
					const rootB = cubeRoot(b)
					
					if (a < b) {
						return rootA <= rootB || approximately(rootA, rootB, 1e-10)
					} else if (a > b) {
						return rootA >= rootB || approximately(rootA, rootB, 1e-10)
					} else {
						return Object.is(rootA, rootB) || approximately(rootA, rootB, 1e-10)
					}
				}
			),
			{ numRuns: 1000 }
		)
	})

	await t.step("cube root of cube", () => {
		fc.assert(
			fc.property(
				fc.integer({ min: -100, max: 100 }),
				(n) => {
					const cubed = n ** 3
					const root = cubeRoot(cubed)
					return approximately(root, n, 1e-10)
				}
			),
			{ numRuns: 1000 }
		)
	})

	await t.step("multiplicative property", () => {
		fc.assert(
			fc.property(
				fc.tuple(
					fc.float({ noNaN: true, noDefaultInfinity: true, min: -1e3, max: 1e3 }),
					fc.float({ noNaN: true, noDefaultInfinity: true, min: -1e3, max: 1e3 })
				),
				([a, b]) => {
					// cbrt(a * b) ≈ cbrt(a) * cbrt(b)
					const product = a * b
					const left = cubeRoot(product)
					const right = cubeRoot(a) * cubeRoot(b)
					
					// Handle special cases
					if (!Number.isFinite(product) || !Number.isFinite(right)) {
						return true // Skip infinite results
					}
					
					// Use relative epsilon for comparison
					const epsilon = Math.max(1e-10, Math.abs(left) * 1e-12)
					return approximately(left, right, epsilon)
				}
			),
			{ numRuns: 1000 }
		)
	})

	await t.step("division property", () => {
		fc.assert(
			fc.property(
				fc.tuple(
					fc.float({ noNaN: true, noDefaultInfinity: true, min: -1e3, max: 1e3 }),
					fc.float({ noNaN: true, noDefaultInfinity: true, min: -1e3, max: 1e3 })
						.filter(x => Math.abs(x) > 1e-10)
				),
				([a, b]) => {
					// cbrt(a / b) ≈ cbrt(a) / cbrt(b)
					const quotient = a / b
					const left = cubeRoot(quotient)
					const right = cubeRoot(a) / cubeRoot(b)
					
					// Handle special cases
					if (!Number.isFinite(quotient) || !Number.isFinite(right)) {
						return true // Skip infinite results
					}
					
					// Use relative epsilon for comparison
					const epsilon = Math.max(1e-10, Math.abs(left) * 1e-12)
					return approximately(left, right, epsilon)
				}
			),
			{ numRuns: 1000 }
		)
	})
})

Deno.test("cubeRoot: edge cases", async (t) => {
	await t.step("handles negative zero correctly", () => {
		const result = cubeRoot(-0)
		assertEquals(Object.is(result, -0), true)
	})

	await t.step("handles very small positive numbers", () => {
		const tiny = Number.MIN_VALUE
		const root = cubeRoot(tiny)
		assertEquals(root > 0, true)
		assertEquals(Number.isFinite(root), true)
	})

	await t.step("handles very small negative numbers", () => {
		const tiny = -Number.MIN_VALUE
		const root = cubeRoot(tiny)
		assertEquals(root < 0, true)
		assertEquals(Number.isFinite(root), true)
	})

	await t.step("handles maximum safe integer", () => {
		const root = cubeRoot(Number.MAX_SAFE_INTEGER)
		assertEquals(Number.isFinite(root), true)
		assertAlmostEquals(root ** 3, Number.MAX_SAFE_INTEGER, 1e6)
	})

	await t.step("handles minimum safe integer", () => {
		const root = cubeRoot(Number.MIN_SAFE_INTEGER)
		assertEquals(Number.isFinite(root), true)
		assertAlmostEquals(root ** 3, Number.MIN_SAFE_INTEGER, 1e6)
	})

	await t.step("handles subnormal numbers", () => {
		const subnormal = 2.2250738585072014e-308 / 2
		const root = cubeRoot(subnormal)
		assertEquals(Number.isFinite(root), true)
		assertEquals(root > 0, true)
	})
})

Deno.test("cubeRoot: numerical accuracy", async (t) => {
	await t.step("maintains precision for known values", () => {
		const testCases = [
			{ input: 8, expected: 2 },
			{ input: 27, expected: 3 },
			{ input: 64, expected: 4 },
			{ input: 125, expected: 5 },
			{ input: 216, expected: 6 },
			{ input: 343, expected: 7 },
			{ input: 512, expected: 8 },
			{ input: 729, expected: 9 },
			{ input: 1000, expected: 10 },
		]
		
		for (const { input, expected } of testCases) {
			assertEquals(cubeRoot(input), expected)
			assertEquals(cubeRoot(-input), -expected)
		}
	})

	await t.step("inverse operation precision", () => {
		const values = [0.1, 0.5, 1, 2, 3.7, 10, 100, 1000]
		for (const val of values) {
			const root = cubeRoot(val)
			const cubed = root ** 3
			assertAlmostEquals(cubed, val, Math.abs(val) * 1e-14)
		}
	})
})