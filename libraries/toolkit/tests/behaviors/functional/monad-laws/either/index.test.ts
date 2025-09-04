import { assertEquals } from "https://deno.land/std@0.218.0/assert/mod.ts"
import * as fc from "npm:fast-check@3"

import type { Either } from "../../../../../src/types/fp/either/index.ts"

import chain from "../../../../../src/monads/either/chain/index.ts"
import left from "../../../../../src/monads/either/left/index.ts"
import map from "../../../../../src/monads/either/map/index.ts"
import right from "../../../../../src/monads/either/right/index.ts"

/**
 * Tests for Either monad laws:
 * 1. Left Identity: M.of(a).chain(f) === f(a)
 * 2. Right Identity: m.chain(M.of) === m
 * 3. Associativity: m.chain(f).chain(g) === m.chain(x => f(x).chain(g))
 */

Deno.test("Either monad - left identity law", () => {
	// Test with concrete functions
	const addOne = (n: number): Either<string, number> => right(n + 1)
	const divideBy2 = (n: number): Either<string, number> =>
		n === 0 ? left("Cannot divide zero") : right(n / 2)

	fc.assert(
		fc.property(
			fc.integer({ min: -1000, max: 1000 }),
			(value) => {
				// Test with addOne
				const m1 = right<number, string>(value)
				const result1a = chain<string, number, number>(addOne)(m1)
				const result1b = addOne(value)

				// Test with divideBy2
				const m2 = right<number, string>(value)
				const result2a = chain<string, number, number>(divideBy2)(m2)
				const result2b = divideBy2(value)

				return JSON.stringify(result1a) === JSON.stringify(result1b) &&
					JSON.stringify(result2a) === JSON.stringify(result2b)
			},
		),
		{ numRuns: 1000 },
	)
})

Deno.test("Either monad - right identity law", () => {
	const rightFn = <T>(a: T): Either<string, T> => right(a)

	fc.assert(
		fc.property(
			fc.oneof(
				fc.integer().map((v) => right<number, string>(v)),
				fc.string().map((e) => left<string>(e)),
			),
			(m) => {
				// Right identity: m.chain(of) === m
				const result = chain<string, number, number>(rightFn)(m)

				// Compare the Either values
				return JSON.stringify(result) === JSON.stringify(m)
			},
		),
		{ numRuns: 1000 },
	)
})

Deno.test("Either monad - associativity law", () => {
	const f = (x: number): Either<string, number> =>
		x > 100 ? left("too large") : right(x * 2)

	const g = (x: number): Either<string, number> =>
		x < 0 ? left("negative") : right(x + 10)

	fc.assert(
		fc.property(
			fc.integer({ min: -50, max: 150 }).map((v) => right<number, string>(v)),
			(m) => {
				// Associativity: m.chain(f).chain(g) === m.chain(x => f(x).chain(g))
				const left1 = chain<string, number, number>(g)(
					chain<string, number, number>(f)(m),
				)

				const right1 = chain<string, number, number>(
					(x: number) => chain<string, number, number>(g)(f(x)),
				)(m)

				// Compare the Either values
				return JSON.stringify(left1) === JSON.stringify(right1)
			},
		),
		{ numRuns: 1000 },
	)
})

Deno.test("Either functor - identity law", () => {
	const identity = <T>(x: T): T => x

	fc.assert(
		fc.property(
			fc.oneof(
				fc.integer().map((v) => right<number, string>(v)),
				fc.string().map((e) => left<string>(e)),
			),
			(m) => {
				// Functor identity: fmap id === id
				const result = map<number, number>(identity)(m)

				// Compare the Either values
				return JSON.stringify(result) === JSON.stringify(m)
			},
		),
		{ numRuns: 1000 },
	)
})

Deno.test("Either functor - composition law", () => {
	const f = (x: number) => x * 2
	const g = (x: number) => x + 10

	fc.assert(
		fc.property(
			fc.oneof(
				fc.integer().map((v) => right<number, string>(v)),
				fc.string().map((e) => left<string>(e)),
			),
			(m) => {
				// Functor composition: fmap (f . g) === fmap f . fmap g
				const left1 = map<number, number>((x: number) => f(g(x)))(m)
				const right1 = map<number, number>(f)(
					map<number, number>(g)(m),
				)

				// Compare the Either values
				return JSON.stringify(left1) === JSON.stringify(right1)
			},
		),
		{ numRuns: 1000 },
	)
})

Deno.test("Either - chain short-circuits on Left", () => {
	const error = left<string>("initial error")
	const neverCalled = (x: number): Either<string, number> => {
		throw new Error("Should not be called")
	}

	const result = chain<string, number, number>(neverCalled)(error)

	assertEquals(result._tag, "Left")
	if (result._tag === "Left") {
		assertEquals(result.left, "initial error")
	}
})

Deno.test("Either - chain propagates Right values", () => {
	const multiplyBy2 = (x: number): Either<string, number> => right(x * 2)
	const addTen = (x: number): Either<string, number> => right(x + 10)

	fc.assert(
		fc.property(
			fc.integer({ min: -1000, max: 1000 }),
			(value) => {
				const start = right<number, string>(value)
				const result = chain<string, number, number>(addTen)(
					chain<string, number, number>(multiplyBy2)(start),
				)

				if (result._tag === "Right") {
					return result.right === (value * 2) + 10
				}
				return false
			},
		),
		{ numRuns: 1000 },
	)
})

Deno.test("Either - map preserves Left values", () => {
	const double = (x: number) => x * 2
	const error = left<string>("error message")

	const result = map<number, number>(double)(error)

	assertEquals(result._tag, "Left")
	if (result._tag === "Left") {
		assertEquals(result.left, "error message")
	}
})

Deno.test("Either - map transforms Right values", () => {
	const double = (x: number) => x * 2

	fc.assert(
		fc.property(
			fc.integer(),
			(value) => {
				const either = right<number, string>(value)
				const result = map<number, number>(double)(either)

				if (result._tag === "Right") {
					return result.right === value * 2
				}
				return false
			},
		),
		{ numRuns: 1000 },
	)
})

Deno.test("Either - practical example with parsing", () => {
	const parseNumber = (s: string): Either<string, number> => {
		const n = Number(s)
		return Number.isNaN(n) ? left("not a number") : right(n)
	}

	const divideBy2 = (n: number): Either<string, number> => {
		return right(n / 2)
	}

	// Valid number string
	const result1 = chain<string, number, number>(divideBy2)(parseNumber("42"))
	assertEquals(result1._tag, "Right")
	if (result1._tag === "Right") {
		assertEquals(result1.right, 21)
	}

	// Invalid number string
	const result2 = chain<string, number, number>(divideBy2)(parseNumber("abc"))
	assertEquals(result2._tag, "Left")
	if (result2._tag === "Left") {
		assertEquals(result2.left, "not a number")
	}
})

Deno.test("Either - multiple chains preserve order", () => {
	const addOne = (n: number): Either<string, number> => right(n + 1)
	const multiplyTwo = (n: number): Either<string, number> => right(n * 2)
	const checkBounds = (n: number): Either<string, number> =>
		n > 50 ? left("overflow") : right(n)

	fc.assert(
		fc.property(
			fc.integer({ min: 0, max: 100 }),
			(start) => {
				const result = chain<string, number, number>(checkBounds)(
					chain<string, number, number>(multiplyTwo)(
						chain<string, number, number>(addOne)(
							right<number, string>(start),
						),
					),
				)

				const expected = (start + 1) * 2

				if (expected > 50) {
					return result._tag === "Left" && result.left === "overflow"
				} else {
					return result._tag === "Right" && result.right === expected
				}
			},
		),
		{ numRuns: 1000 },
	)
})
