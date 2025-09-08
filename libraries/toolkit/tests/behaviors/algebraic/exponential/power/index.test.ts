import {
	assertEquals,
	assertStrictEquals,
} from "https://deno.land/std@0.208.0/assert/mod.ts"
import * as fc from "npm:fast-check@3.x.x"

import power from "../../../../../src/simple/math/power/index.ts"
import approximately from "../../../../helpers/assertions/approximately/index.ts"

Deno.test("power - algebraic properties", async (t) => {
	await t.step("property: x^1 = x (identity)", () => {
		fc.assert(
			fc.property(
				fc.float({
					noNaN: true,
					min: Math.fround(-1e6),
					max: Math.fround(1e6),
				}),
				(base) => {
					const result = power(1)(base)
					return Object.is(result, base) ||
						approximately(result, base, 1e-10)
				},
			),
			{ numRuns: 1000 },
		)
	})

	await t.step("property: x^0 = 1 for all x ≠ 0", () => {
		fc.assert(
			fc.property(
				fc.float({ noNaN: true, min: -1e6, max: 1e6 }).filter((x) => x !== 0),
				(base) => {
					const result = power(0)(base)
					return result === 1
				},
			),
			{ numRuns: 1000 },
		)
	})

	await t.step("property: x^(a+b) = x^a * x^b", () => {
		fc.assert(
			fc.property(
				fc.float({
					noNaN: true,
					min: Math.fround(0.1),
					max: Math.fround(100),
				}),
				fc.float({
					noNaN: true,
					min: Math.fround(-10),
					max: Math.fround(10),
				}),
				fc.float({
					noNaN: true,
					min: Math.fround(-10),
					max: Math.fround(10),
				}),
				(base, expA, expB) => {
					const left = power(expA + expB)(base)
					const right = power(expA)(base) * power(expB)(base)

					// Handle special cases
					if (!isFinite(left) && !isFinite(right)) {
						return Object.is(left, right)
					}

					// Use relative error for comparison
					const relativeError = Math.abs(left - right) /
						Math.max(Math.abs(left), Math.abs(right), 1)
					return relativeError < 1e-10
				},
			),
			{ numRuns: 1000 },
		)
	})

	await t.step("property: (x^a)^b = x^(a*b)", () => {
		fc.assert(
			fc.property(
				fc.float({
					noNaN: true,
					min: Math.fround(0.1),
					max: Math.fround(100),
				}),
				fc.float({
					noNaN: true,
					min: Math.fround(-5),
					max: Math.fround(5),
				}),
				fc.float({
					noNaN: true,
					min: Math.fround(-5),
					max: Math.fround(5),
				}),
				(base, expA, expB) => {
					const left = power(expB)(power(expA)(base))
					const right = power(expA * expB)(base)

					if (!isFinite(left) && !isFinite(right)) {
						return Object.is(left, right)
					}

					const relativeError = Math.abs(left - right) /
						Math.max(Math.abs(left), Math.abs(right), 1)
					return relativeError < 1e-10
				},
			),
			{ numRuns: 1000 },
		)
	})

	await t.step("property: x^(-a) = 1/(x^a) for x ≠ 0", () => {
		fc.assert(
			fc.property(
				fc.float({
					noNaN: true,
					min: Math.fround(0.1),
					max: Math.fround(1000),
				}),
				fc.float({
					noNaN: true,
					min: Math.fround(-10),
					max: Math.fround(10),
				}),
				(base, exp) => {
					const positive = power(exp)(base)
					const negative = power(-exp)(base)
					const product = positive * negative

					return approximately(product, 1, 1e-10)
				},
			),
			{ numRuns: 1000 },
		)
	})
})

Deno.test("power - JSDoc examples", async (t) => {
	await t.step("basic exponentiation", () => {
		assertStrictEquals(power(2)(3), 9)
		assertStrictEquals(power(3)(2), 8)
		assertStrictEquals(power(2)(10), 100)
	})

	await t.step("power of 1 (identity)", () => {
		assertStrictEquals(power(1)(5), 5)
		assertStrictEquals(power(1)(100), 100)
	})

	await t.step("power of 0 (always 1)", () => {
		assertStrictEquals(power(0)(5), 1)
		assertStrictEquals(power(0)(100), 1)
		assertStrictEquals(power(0)(0), 1) // 0^0 = 1 by convention
	})

	await t.step("negative exponents (reciprocals)", () => {
		assertStrictEquals(power(-1)(2), 0.5)
		assertStrictEquals(power(-2)(2), 0.25)
		assertStrictEquals(power(-3)(2), 0.125)
	})

	await t.step("fractional exponents (roots)", () => {
		assertStrictEquals(power(0.5)(4), 2)
		assertStrictEquals(power(0.5)(9), 3)
		assertEquals(power(1 / 3)(8), 2, "Cube root of 8")
		assertEquals(
			approximately(power(1 / 3)(27), 3, 1e-10),
			true,
			"Cube root of 27",
		)
	})

	await t.step("negative bases", () => {
		assertStrictEquals(power(2)(-3), 9)
		assertStrictEquals(power(3)(-2), -8)
		assertStrictEquals(power(2)(-4), 16)
	})

	await t.step("decimal bases", () => {
		assertStrictEquals(power(2)(1.5), 2.25)
		assertStrictEquals(power(3)(0.5), 0.125)
		assertStrictEquals(power(2)(2.5), 6.25)
	})

	await t.step("large exponents", () => {
		assertStrictEquals(power(10)(2), 1024)
		assertStrictEquals(power(20)(2), 1048576)
		assertStrictEquals(power(100)(10), 1e100)
	})

	await t.step("special values", () => {
		assertStrictEquals(power(2)(Infinity), Infinity)
		assertStrictEquals(power(2)(-Infinity), Infinity) // (-Infinity)^2 = Infinity
		assertStrictEquals(power(Infinity)(2), Infinity)
		assertStrictEquals(power(3)(-Infinity), -Infinity)
		assertStrictEquals(power(0)(0), 1)
		assertEquals(Number.isNaN(power(2)(NaN)), true)
		assertEquals(Number.isNaN(power(NaN)(2)), true)
	})

	await t.step("invalid inputs", () => {
		assertEquals(Number.isNaN(power(null as any)(2)), true)
		assertEquals(Number.isNaN(power(2)(undefined as any)), true)
		assertEquals(Number.isNaN(power("2" as any)(3)), true)
		assertEquals(Number.isNaN(power(2)("3" as any)), true)
	})

	await t.step("partial application", () => {
		const square = power(2)
		assertStrictEquals(square(5), 25)
		assertStrictEquals(square(7), 49)

		const cube = power(3)
		assertStrictEquals(cube(3), 27)
		assertStrictEquals(cube(4), 64)

		const sqrt = power(0.5)
		assertStrictEquals(sqrt(16), 4)
		assertStrictEquals(sqrt(25), 5)

		const reciprocal = power(-1)
		assertStrictEquals(reciprocal(2), 0.5)
		assertStrictEquals(reciprocal(4), 0.25)
	})

	await t.step("array operations", () => {
		const numbers = [1, 2, 3, 4, 5]

		const squared = numbers.map(power(2))
		assertEquals(squared, [1, 4, 9, 16, 25])

		const cubed = numbers.map(power(3))
		assertEquals(cubed, [1, 8, 27, 64, 125])

		const sqrtResults = numbers.map(power(0.5))
		assertStrictEquals(sqrtResults[0], 1)
		assertStrictEquals(sqrtResults[3], 2)
		assertEquals(approximately(sqrtResults[1], Math.sqrt(2), 1e-10), true)
	})

	await t.step("practical examples", () => {
		// Powers of 2 sequence
		const powersOfTwo = Array.from({ length: 10 }, (_, i) => power(i)(2))
		assertEquals(powersOfTwo, [1, 2, 4, 8, 16, 32, 64, 128, 256, 512])

		// Geometric growth
		const growth = (rate: number) => (periods: number) =>
			power(periods)(1 + rate)
		assertEquals(
			approximately(growth(0.05)(10), 1.628894626777443, 1e-10),
			true,
		)

		// Compound interest
		const compound = (principal: number, rate: number, time: number) =>
			principal * power(time)(1 + rate)
		// Compound interest with floating point precision
		assertEquals(
			approximately(compound(1000, 0.05, 3), 1157.625, 1e-10),
			true,
		)

		// Circle area from radius
		const circleArea = (radius: number) => Math.PI * power(2)(radius)
		assertEquals(
			approximately(circleArea(5), 78.53981633974483, 1e-10),
			true,
		)

		// Pythagorean theorem
		const hypotenuse = (a: number, b: number) =>
			power(0.5)(power(2)(a) + power(2)(b))
		assertStrictEquals(hypotenuse(3, 4), 5)
		assertStrictEquals(hypotenuse(5, 12), 13)
	})
})

Deno.test("power - edge cases", async (t) => {
	await t.step("very small bases", () => {
		assertStrictEquals(power(2)(0.001), 0.000001)
		// 0.1^-2 = 100 (with floating point precision)
		assertEquals(approximately(power(-2)(0.1), 100, 1e-10), true)
		assertEquals(approximately(power(0.5)(0.0001), 0.01, 1e-10), true)
	})

	await t.step("very large exponents", () => {
		// 2^1000 is very large but not Infinity
		assertEquals(power(1000)(2) > 1e300, true)
		// 2^-1000 is very small but not 0
		assertEquals(power(-1000)(2) < 1e-300, true)
		assertEquals(power(-1000)(2) > 0, true)
		// 0.5^1000 is very small
		assertEquals(power(1000)(0.5) < 1e-300, true)
	})

	await t.step("negative zero", () => {
		assertStrictEquals(power(2)(-0), 0)
		assertStrictEquals(power(3)(-0), -0)
		assertStrictEquals(power(0)(-0), 1)
	})

	await t.step("fractional negative bases", () => {
		// Negative base with fractional exponent can result in NaN
		assertEquals(Number.isNaN(power(0.5)(-4)), true)
		assertEquals(Number.isNaN(power(1 / 3)(-8)), true)
	})
})

Deno.test("power - mathematical functions", () => {
	// Test as building block for other functions
	const exp = (x: number) => power(x)(Math.E)
	assertEquals(approximately(exp(1), Math.E, 1e-10), true)
	assertEquals(approximately(exp(2), Math.E * Math.E, 1e-10), true)

	// Nth root function
	const nthRoot = (n: number) => power(1 / n)
	const fourthRoot = nthRoot(4)
	assertStrictEquals(fourthRoot(16), 2)
	assertStrictEquals(fourthRoot(81), 3)

	// Binary to decimal conversion
	const binaryToDecimal = (binary: string) =>
		binary.split("").reverse().reduce(
			(acc, bit, i) => acc + parseInt(bit) * power(i)(2),
			0,
		)
	assertStrictEquals(binaryToDecimal("1010"), 10)
	assertStrictEquals(binaryToDecimal("11111111"), 255)

	// Scientific notation
	const scientific = (mantissa: number) => (exponent: number) =>
		mantissa * power(exponent)(10)
	assertStrictEquals(scientific(3.14)(2), 314)
	assertEquals(approximately(scientific(6.02)(23), 6.02e23, 1e10), true) // Large number needs larger epsilon
})
