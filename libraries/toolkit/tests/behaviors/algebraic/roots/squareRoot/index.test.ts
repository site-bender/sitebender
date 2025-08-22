import { assertEquals, assertStrictEquals } from "https://deno.land/std@0.208.0/assert/mod.ts"
import * as fc from "npm:fast-check@3.x.x"

import squareRoot from "../../../../../src/simple/math/squareRoot/index.ts"
import approximately from "../../../../helpers/assertions/approximately/index.ts"

Deno.test("squareRoot - algebraic properties", async (t) => {
	await t.step("property: sqrt(x²) = |x| for all real x", () => {
		fc.assert(
			fc.property(
				fc.float({ noNaN: true, min: -1e6, max: 1e6 }),
				(x) => {
					const squared = x * x
					const root = squareRoot(squared)
					return approximately(root, Math.abs(x), 1e-10)
				}
			),
			{ numRuns: 1000 }
		)
	})

	await t.step("property: (sqrt(x))² = x for non-negative x", () => {
		fc.assert(
			fc.property(
				fc.float({ noNaN: true, min: Math.fround(0), max: Math.fround(1e6) }),
				(x) => {
					const root = squareRoot(x)
					if (Number.isNaN(root)) return true // Skip NaN
					const squared = root * root
					return approximately(squared, x, 1e-10 * Math.max(1, x))
				}
			),
			{ numRuns: 1000 }
		)
	})

	await t.step("property: sqrt(a*b) = sqrt(a) * sqrt(b) for non-negative a,b", () => {
		fc.assert(
			fc.property(
				fc.float({ noNaN: true, min: 0, max: 1e3 }),
				fc.float({ noNaN: true, min: 0, max: 1e3 }),
				(a, b) => {
					const left = squareRoot(a * b)
					const right = squareRoot(a) * squareRoot(b)
					
					if (!isFinite(left) && !isFinite(right)) {
						return Object.is(left, right)
					}
					
					return approximately(left, right, 1e-10 * Math.max(1, left))
				}
			),
			{ numRuns: 1000 }
		)
	})

	await t.step("property: sqrt(a/b) = sqrt(a) / sqrt(b) for a≥0, b>0", () => {
		fc.assert(
			fc.property(
				fc.float({ noNaN: true, min: Math.fround(0), max: Math.fround(1e6) }),
				fc.float({ noNaN: true, min: Math.fround(0.001), max: Math.fround(1e6) }),
				(a, b) => {
					const left = squareRoot(a / b)
					const right = squareRoot(a) / squareRoot(b)
					// Use relative epsilon for comparison
					const epsilon = Math.max(1e-10, Math.abs(left) * 1e-10)
					return approximately(left, right, epsilon)
				}
			),
			{ numRuns: 1000 }
		)
	})

	await t.step("property: sqrt(x) ≥ 0 for all x ≥ 0", () => {
		fc.assert(
			fc.property(
				fc.float({ noNaN: true, min: 0, max: 1e10 }),
				(x) => {
					const result = squareRoot(x)
					return result >= 0 || Number.isNaN(result)
				}
			),
			{ numRuns: 1000 }
		)
	})

	await t.step("property: monotonic increasing for x ≥ 0", () => {
		fc.assert(
			fc.property(
				fc.float({ noNaN: true, min: Math.fround(0), max: Math.fround(1e6) }),
				fc.float({ noNaN: true, min: Math.fround(0), max: Math.fround(1e6) }),
				(a, b) => {
					if (a <= b) {
						return squareRoot(a) <= squareRoot(b)
					} else {
						return squareRoot(a) >= squareRoot(b)
					}
				}
			),
			{ numRuns: 1000 }
		)
	})
})

Deno.test("squareRoot - JSDoc examples", async (t) => {
	await t.step("perfect squares", () => {
		assertStrictEquals(squareRoot(4), 2)
		assertStrictEquals(squareRoot(9), 3)
		assertStrictEquals(squareRoot(16), 4)
		assertStrictEquals(squareRoot(25), 5)
		assertStrictEquals(squareRoot(100), 10)
	})

	await t.step("non-perfect squares", () => {
		assertStrictEquals(squareRoot(2), 1.4142135623730951)
		assertStrictEquals(squareRoot(3), 1.7320508075688772)
		assertStrictEquals(squareRoot(5), 2.23606797749979)
		assertStrictEquals(squareRoot(10), 3.1622776601683795)
	})

	await t.step("decimal numbers", () => {
		assertStrictEquals(squareRoot(0.25), 0.5)
		assertStrictEquals(squareRoot(0.5), 0.7071067811865476)
		assertStrictEquals(squareRoot(1.5), 1.224744871391589)
		assertStrictEquals(squareRoot(2.25), 1.5)
	})

	await t.step("zero", () => {
		assertStrictEquals(squareRoot(0), 0)
		// JavaScript preserves -0 in some cases
		assertStrictEquals(Math.abs(squareRoot(-0)), 0)
	})

	await t.step("one", () => {
		assertStrictEquals(squareRoot(1), 1)
	})

	await t.step("large numbers", () => {
		assertStrictEquals(squareRoot(1000000), 1000)
		assertStrictEquals(squareRoot(1000000000), 31622.776601683792)
		assertEquals(approximately(squareRoot(Number.MAX_SAFE_INTEGER), 94906265.62425154, 1e-6), true)
	})

	await t.step("very small numbers", () => {
		assertStrictEquals(squareRoot(0.0001), 0.01)
		assertStrictEquals(squareRoot(0.000001), 0.001)
		assertStrictEquals(squareRoot(Number.EPSILON), 1.4901161193847656e-8)
	})

	await t.step("negative numbers (no real root)", () => {
		assertEquals(Number.isNaN(squareRoot(-1)), true)
		assertEquals(Number.isNaN(squareRoot(-4)), true)
		assertEquals(Number.isNaN(squareRoot(-100)), true)
	})

	await t.step("special values", () => {
		assertStrictEquals(squareRoot(Infinity), Infinity)
		assertEquals(Number.isNaN(squareRoot(-Infinity)), true)
		assertEquals(Number.isNaN(squareRoot(NaN)), true)
	})

	await t.step("invalid inputs", () => {
		assertEquals(Number.isNaN(squareRoot(null as any)), true)
		assertEquals(Number.isNaN(squareRoot(undefined as any)), true)
		assertEquals(Number.isNaN(squareRoot("4" as any)), true)
		assertEquals(Number.isNaN(squareRoot({} as any)), true)
		assertEquals(Number.isNaN(squareRoot([] as any)), true)
	})

	await t.step("array operations", () => {
		const squares = [1, 4, 9, 16, 25]
		const roots = squares.map(squareRoot)
		assertEquals(roots, [1, 2, 3, 4, 5])

		const numbers = [2, 8, 18, 32, 50]
		const results = numbers.map(squareRoot)
		assertEquals(approximately(results[0], Math.sqrt(2), 1e-10), true)
		assertEquals(approximately(results[1], Math.sqrt(8), 1e-10), true)
	})

	await t.step("practical examples", () => {
		// Pythagorean theorem
		const hypotenuse = (a: number, b: number) => 
			squareRoot(a * a + b * b)
		assertStrictEquals(hypotenuse(3, 4), 5)
		assertStrictEquals(hypotenuse(5, 12), 13)
		assertStrictEquals(hypotenuse(8, 15), 17)

		// Distance formula
		const distance = (x1: number, y1: number, x2: number, y2: number) => {
			const dx = x2 - x1
			const dy = y2 - y1
			return squareRoot(dx * dx + dy * dy)
		}
		assertStrictEquals(distance(0, 0, 3, 4), 5)
		assertStrictEquals(distance(1, 1, 4, 5), 5)

		// Circle calculations
		const radiusFromArea = (area: number) => squareRoot(area / Math.PI)
		assertStrictEquals(radiusFromArea(Math.PI * 25), 5)
		assertEquals(approximately(radiusFromArea(Math.PI * 100), 10, 1e-10), true)

		// Geometric mean of two numbers
		const geometricMean = (a: number, b: number) => squareRoot(a * b)
		assertStrictEquals(geometricMean(4, 9), 6)
		assertStrictEquals(geometricMean(2, 8), 4)
	})
})

Deno.test("squareRoot - special properties", async (t) => {
	await t.step("fixed points", () => {
		assertStrictEquals(squareRoot(0), 0)
		assertStrictEquals(squareRoot(1), 1)
	})

	await t.step("perfect square detection", () => {
		const isPerfectSquare = (n: number) => {
			const root = squareRoot(n)
			return Number.isInteger(root)
		}
		
		assertStrictEquals(isPerfectSquare(16), true)
		assertStrictEquals(isPerfectSquare(17), false)
		assertStrictEquals(isPerfectSquare(25), true)
		assertStrictEquals(isPerfectSquare(26), false)
		assertStrictEquals(isPerfectSquare(144), true)
	})

	await t.step("golden ratio calculation", () => {
		const phi = (1 + squareRoot(5)) / 2
		assertEquals(approximately(phi, 1.618033988749895, 1e-10), true)
	})

	await t.step("comparison with power function", () => {
		// sqrt(x) should equal x^0.5
		fc.assert(
			fc.property(
				fc.float({ noNaN: true, min: Math.fround(0), max: Math.fround(1e6) }),
				(x) => {
					const viaSqrt = squareRoot(x)
					const viaPower = Math.pow(x, 0.5)
					return Object.is(viaSqrt, viaPower) || approximately(viaSqrt, viaPower, 1e-10)
				}
			),
			{ numRuns: 1000 }
		)
	})
})

Deno.test("squareRoot - edge cases", async (t) => {
	await t.step("subnormal numbers", () => {
		const subnormal = Number.MIN_VALUE
		const result = squareRoot(subnormal)
		assertEquals(result > 0, true, "Square root of subnormal should be positive")
		assertEquals(result * result <= subnormal * 1.01, true, "Should be approximately correct")
	})

	await t.step("near-zero values", () => {
		assertStrictEquals(squareRoot(1e-300), 1e-150)
		assertStrictEquals(squareRoot(1e-200), 1e-100)
	})

	await t.step("boundary values", () => {
		// Just below and above common boundaries
		assertEquals(approximately(squareRoot(0.999999), 0.999999499999875, 1e-10), true)
		assertEquals(approximately(squareRoot(1.000001), 1.000000499999875, 1e-10), true)
		assertEquals(approximately(squareRoot(3.999999), 1.9999997499999844, 1e-10), true)
		assertEquals(approximately(squareRoot(4.000001), 2.0000002499999843, 1e-10), true)
	})
})

Deno.test("squareRoot - mathematical applications", () => {
	// Root mean square
	const rms = (values: number[]) => {
		const sumSquares = values.reduce((sum, v) => sum + v * v, 0)
		return squareRoot(sumSquares / values.length)
	}
	assertEquals(approximately(rms([3, 4, 5]), 4.08248290463863, 1e-10), true)
	assertEquals(approximately(rms([1, 1, 1]), 1, 1e-10), true)

	// Magnitude of vector
	const magnitude = (vector: number[]) => 
		squareRoot(vector.reduce((sum, v) => sum + v * v, 0))
	assertStrictEquals(magnitude([3, 4]), 5)
	assertEquals(approximately(magnitude([1, 1, 1]), Math.sqrt(3), 1e-10), true)

	// Normalization
	const normalize = (x: number, y: number) => {
		const length = squareRoot(x * x + y * y)
		return { x: x / length, y: y / length }
	}
	const normalized = normalize(3, 4)
	assertStrictEquals(normalized.x, 0.6)
	assertStrictEquals(normalized.y, 0.8)
})