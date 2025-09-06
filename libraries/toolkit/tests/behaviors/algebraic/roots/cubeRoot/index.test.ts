import { assertEquals } from "https://deno.land/std@0.218.0/assert/mod.ts"
import * as fc from "npm:fast-check@3.x.x"

import cubeRoot from "../../../../../src/simple/math/cubeRoot/index.ts"
import approximately from "../../../../helpers/assertions/approximately/index.ts"

Deno.test("cubeRoot: perfect cubes", async (t) => {
	await t.step("positive perfect cubes", () => {
		assertEquals(cubeRoot(8), 2)
		assertEquals(cubeRoot(27), 3)
		assertEquals(cubeRoot(125), 5)
		assertEquals(cubeRoot(1000), 10)
		assertEquals(cubeRoot(1), 1)
		assertEquals(cubeRoot(64), 4)
		assertEquals(cubeRoot(216), 6)
		assertEquals(cubeRoot(343), 7)
		assertEquals(cubeRoot(512), 8)
		assertEquals(cubeRoot(729), 9)
	})

	await t.step("negative perfect cubes", () => {
		assertEquals(cubeRoot(-8), -2)
		assertEquals(cubeRoot(-27), -3)
		assertEquals(cubeRoot(-125), -5)
		assertEquals(cubeRoot(-1), -1)
		assertEquals(cubeRoot(-64), -4)
		assertEquals(cubeRoot(-216), -6)
		assertEquals(cubeRoot(-343), -7)
		assertEquals(cubeRoot(-512), -8)
		assertEquals(cubeRoot(-729), -9)
		assertEquals(cubeRoot(-1000), -10)
	})

	await t.step("zero", () => {
		assertEquals(cubeRoot(0), 0)
		assertEquals(Object.is(cubeRoot(-0), -0), true)
	})
})

Deno.test("cubeRoot: non-perfect cubes", async (t) => {
	await t.step("positive non-perfect cubes", () => {
		assertEquals(approximately(cubeRoot(2), 1.2599210498948732), true)
		assertEquals(approximately(cubeRoot(10), 2.154434690031884), true)
		assertEquals(approximately(cubeRoot(100), 4.641588833612779), true)
		assertEquals(approximately(cubeRoot(50), 3.6840314986403864), true)
		assertEquals(approximately(cubeRoot(99), 4.626065009182741), true)
	})

	await t.step("negative non-perfect cubes", () => {
		assertEquals(approximately(cubeRoot(-2), -1.2599210498948732), true)
		assertEquals(approximately(cubeRoot(-10), -2.154434690031884), true)
		assertEquals(approximately(cubeRoot(-100), -4.641588833612779), true)
		assertEquals(approximately(cubeRoot(-50), -3.6840314986403864), true)
	})

	await t.step("decimal numbers", () => {
		assertEquals(cubeRoot(0.125), 0.5)
		assertEquals(cubeRoot(0.001), 0.1)
		assertEquals(approximately(cubeRoot(2.5), 1.3572088082974532), true)
		assertEquals(approximately(cubeRoot(0.5), 0.7937005259840998), true)
		assertEquals(approximately(cubeRoot(1.5), 1.1447142425533319), true)
	})
})

Deno.test("cubeRoot: very small and large numbers", async (t) => {
	await t.step("very small numbers", () => {
		assertEquals(approximately(cubeRoot(0.000001), 0.01), true)
		assertEquals(cubeRoot(1e-9), 0.001)
		assertEquals(approximately(cubeRoot(1e-12), 1e-4, 1e-15), true)
		assertEquals(cubeRoot(1e-15), 1e-5)
		assertEquals(cubeRoot(8e-9), 0.002)
	})

	await t.step("very large numbers", () => {
		assertEquals(cubeRoot(1000000), 100)
		assertEquals(cubeRoot(1e9), 1000)
		assertEquals(cubeRoot(1e12), 10000)
		assertEquals(cubeRoot(1e15), 100000)
		assertEquals(cubeRoot(8e9), 2000)
	})
})

Deno.test("cubeRoot: special values", async (t) => {
	await t.step("infinity", () => {
		assertEquals(cubeRoot(Infinity), Infinity)
		assertEquals(cubeRoot(-Infinity), -Infinity)
	})

	await t.step("NaN", () => {
		assertEquals(Number.isNaN(cubeRoot(NaN)), true)
	})
})

Deno.test("cubeRoot: invalid inputs", async (t) => {
	await t.step("null and undefined", () => {
		assertEquals(Number.isNaN(cubeRoot(null)), true)
		assertEquals(Number.isNaN(cubeRoot(undefined)), true)
	})

	await t.step("non-numeric types", () => {
		assertEquals(Number.isNaN(cubeRoot("8" as any)), true)
		assertEquals(Number.isNaN(cubeRoot("abc" as any)), true)
		assertEquals(Number.isNaN(cubeRoot({} as any)), true)
		assertEquals(Number.isNaN(cubeRoot([] as any)), true)
		assertEquals(Number.isNaN(cubeRoot(true as any)), true)
		assertEquals(Number.isNaN(cubeRoot(false as any)), true)
		assertEquals(Number.isNaN(cubeRoot((() => {}) as any)), true)
	})
})

Deno.test("cubeRoot: mathematical properties", async (t) => {
	await t.step("inverse relationship: cbrt(x³) = x", () => {
		fc.assert(
			fc.property(
				fc.float({ min: -1000, max: 1000, noNaN: true }),
				(x) => {
					const cubed = x * x * x
					const root = cubeRoot(cubed)
					// Use relative tolerance for larger values
					const tolerance = Math.max(1e-10, Math.abs(x) * 1e-10)
					return Math.abs(root - x) < tolerance
				},
			),
			{ numRuns: 1000 },
		)
	})

	await t.step("cube of root: (cbrt(x))³ = x", () => {
		fc.assert(
			fc.property(
				fc.float({ min: -1e6, max: 1e6, noNaN: true }),
				(x) => {
					const root = cubeRoot(x)
					const cubed = root * root * root
					// Use relative tolerance
					const tolerance = Math.max(1e-10, Math.abs(x) * 1e-10)
					return Math.abs(cubed - x) < tolerance
				},
			),
			{ numRuns: 1000 },
		)
	})

	await t.step("sign preservation: sign(cbrt(x)) = sign(x)", () => {
		fc.assert(
			fc.property(
				fc.float({ min: -1e10, max: 1e10, noNaN: true }),
				(x) => {
					if (x === 0) return true // Skip zero
					const root = cubeRoot(x)
					return (x > 0 && root > 0) || (x < 0 && root < 0)
				},
			),
			{ numRuns: 1000 },
		)
	})

	await t.step(
		"multiplicative property: cbrt(a*b) ≈ cbrt(a) * cbrt(b)",
		() => {
			fc.assert(
				fc.property(
					fc.float({ min: -1000, max: 1000, noNaN: true }),
					fc.float({ min: -1000, max: 1000, noNaN: true }),
					(a, b) => {
						const leftSide = cubeRoot(a * b)
						const rightSide = cubeRoot(a) * cubeRoot(b)

						// Handle special cases
						if (!isFinite(leftSide) || !isFinite(rightSide)) {
							return Object.is(leftSide, rightSide)
						}

						// Use relative tolerance
						const tolerance = Math.max(
							1e-10,
							Math.abs(leftSide) * 1e-10,
						)
						return Math.abs(leftSide - rightSide) < tolerance
					},
				),
				{ numRuns: 1000 },
			)
		},
	)

	await t.step("division property: cbrt(a/b) ≈ cbrt(a) / cbrt(b)", () => {
		fc.assert(
			fc.property(
				fc.float({ min: -1000, max: 1000, noNaN: true }),
				fc.float({ min: -1000, max: 1000, noNaN: true }),
				(a, b) => {
					fc.pre(b !== 0)

					const leftSide = cubeRoot(a / b)
					const rightSide = cubeRoot(a) / cubeRoot(b)

					// Handle special cases
					if (!isFinite(leftSide) || !isFinite(rightSide)) {
						return Object.is(leftSide, rightSide)
					}

					// Use relative tolerance
					const tolerance = Math.max(
						1e-10,
						Math.abs(leftSide) * 1e-10,
					)
					return Math.abs(leftSide - rightSide) < tolerance
				},
			),
			{ numRuns: 1000 },
		)
	})

	await t.step("monotonic increasing", () => {
		fc.assert(
			fc.property(
				fc.float({ min: -1e6, max: 1e6, noNaN: true }),
				fc.float({ min: -1e6, max: 1e6, noNaN: true }),
				(a, b) => {
					if (a < b) {
						return cubeRoot(a) < cubeRoot(b)
					} else if (a > b) {
						return cubeRoot(a) > cubeRoot(b)
					} else {
						return cubeRoot(a) === cubeRoot(b)
					}
				},
			),
			{ numRuns: 1000 },
		)
	})

	await t.step("odd function: cbrt(-x) = -cbrt(x)", () => {
		fc.assert(
			fc.property(
				fc.float({ min: -1e10, max: 1e10, noNaN: true }),
				(x) => {
					const positive = cubeRoot(x)
					const negative = cubeRoot(-x)

					// Handle special cases
					if (!isFinite(positive)) {
						return Object.is(negative, -positive)
					}

					return approximately(negative, -positive)
				},
			),
			{ numRuns: 1000 },
		)
	})
})

Deno.test("cubeRoot: practical applications", async (t) => {
	await t.step("volume calculations", () => {
		// Cube with volume 125 has sides of length 5
		assertEquals(cubeRoot(125), 5)

		// Cube with volume 1000 has sides of length 10
		assertEquals(cubeRoot(1000), 10)

		// Cube with volume 27000 has sides of length 30
		assertEquals(cubeRoot(27000), 30)
	})

	await t.step("sphere radius from volume", () => {
		// V = (4/3)πr³, so r = ∛(3V/4π)
		const sphereRadiusFromVolume = (volume: number): number => {
			return cubeRoot((3 * volume) / (4 * Math.PI))
		}

		// Sphere with volume 4188.79... has radius ≈ 10
		assertEquals(
			approximately(sphereRadiusFromVolume(4188.79), 10, 0.01),
			true,
		)

		// Unit sphere (r=1) has volume 4π/3
		const unitVolume = (4 * Math.PI) / 3
		assertEquals(approximately(sphereRadiusFromVolume(unitVolume), 1), true)
	})

	await t.step("scaling calculations", () => {
		// Double the linear dimensions = 8x the volume
		assertEquals(cubeRoot(8), 2)

		// Triple the linear dimensions = 27x the volume
		assertEquals(cubeRoot(27), 3)

		// 1.5x the linear dimensions = 3.375x the volume
		assertEquals(approximately(cubeRoot(3.375), 1.5), true)
	})

	await t.step("compound growth rate over 3 periods", () => {
		const compoundGrowthRate = (initial: number, final: number): number => {
			return cubeRoot(final / initial) - 1
		}

		// 10% growth rate: 1000 -> 1331 over 3 periods
		assertEquals(approximately(compoundGrowthRate(1000, 1331), 0.1), true)

		// 20% growth rate: 1000 -> 1728 over 3 periods
		assertEquals(approximately(compoundGrowthRate(1000, 1728), 0.2), true)

		// 5% growth rate: 1000 -> 1157.625 over 3 periods
		assertEquals(
			approximately(compoundGrowthRate(1000, 1157.625), 0.05),
			true,
		)
	})

	await t.step("data normalization", () => {
		const data = [1, 8, 27, 64, 125, 216]
		const normalized = data.map(cubeRoot)
		assertEquals(normalized, [1, 2, 3, 4, 5, 6])
	})
})

Deno.test("cubeRoot: edge cases with integer cube roots", async (t) => {
	await t.step("powers of 2", () => {
		assertEquals(cubeRoot(2 ** 3), 2)
		assertEquals(cubeRoot(4 ** 3), 4)
		assertEquals(cubeRoot(8 ** 3), 8)
		assertEquals(cubeRoot(16 ** 3), 16)
		assertEquals(cubeRoot(32 ** 3), 32)
	})

	await t.step("powers of 10", () => {
		assertEquals(cubeRoot(10 ** 3), 10)
		assertEquals(cubeRoot(100 ** 3), 100)
		assertEquals(cubeRoot(1000 ** 3), 1000)

		// Negative powers of 10
		assertEquals(cubeRoot((-10) ** 3), -10)
		assertEquals(cubeRoot((-100) ** 3), -100)
		assertEquals(cubeRoot((-1000) ** 3), -1000)
	})

	await t.step("fractional perfect cubes", () => {
		assertEquals(cubeRoot(1 / 8), 1 / 2)
		assertEquals(cubeRoot(1 / 27), 1 / 3)
		assertEquals(cubeRoot(1 / 125), 1 / 5)
		assertEquals(cubeRoot(1 / 1000), 1 / 10)

		// Negative fractional perfect cubes
		assertEquals(cubeRoot(-1 / 8), -1 / 2)
		assertEquals(cubeRoot(-1 / 27), -1 / 3)
		assertEquals(cubeRoot(-1 / 125), -1 / 5)
	})
})
