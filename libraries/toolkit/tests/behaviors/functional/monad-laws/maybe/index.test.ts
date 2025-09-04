import { assertEquals } from "https://deno.land/std@0.218.0/assert/mod.ts"
import * as fc from "npm:fast-check@3"

import type { Maybe } from "../../../../../src/types/fp/maybe/index.ts"

import chain from "../../../../../src/monads/maybe/chain/index.ts"
import just from "../../../../../src/monads/maybe/just/index.ts"
import map from "../../../../../src/monads/maybe/map/index.ts"
import nothing from "../../../../../src/monads/maybe/nothing/index.ts"

/**
 * Tests for Maybe monad laws:
 * 1. Left Identity: M.of(a).chain(f) === f(a)
 * 2. Right Identity: m.chain(M.of) === m
 * 3. Associativity: m.chain(f).chain(g) === m.chain(x => f(x).chain(g))
 */

Deno.test("Maybe monad - left identity law", () => {
	fc.assert(
		fc.property(
			fc.integer(),
			fc.func(fc.oneof(
				fc.integer().map((v) => just(v)),
				fc.constant(nothing()),
			)),
			(value, f) => {
				// Left identity: of(a).chain(f) === f(a)
				const m = just(value)
				const result1 = chain<number, number>(f)(m)
				const result2 = f(value)

				return JSON.stringify(result1) === JSON.stringify(result2)
			},
		),
		{ numRuns: 1000 },
	)
})

Deno.test("Maybe monad - right identity law", () => {
	fc.assert(
		fc.property(
			fc.oneof(
				fc.integer().map((v) => just(v)),
				fc.constant(nothing()),
			),
			(m: Maybe<number>) => {
				// Right identity: m.chain(of) === m
				const result = chain<number, number>((a: number) => just(a))(m)

				return JSON.stringify(result) === JSON.stringify(m)
			},
		),
		{ numRuns: 1000 },
	)
})

Deno.test("Maybe monad - associativity law", () => {
	// Create deterministic functions for testing
	const f = (n: number): Maybe<number> => n > 0 ? just(n * 2) : nothing()

	const g = (n: number): Maybe<number> => n > 100 ? nothing() : just(n + 10)

	fc.assert(
		fc.property(
			fc.oneof(
				fc.integer({ min: -50, max: 150 }).map((v) => just(v)),
				fc.constant(nothing()),
			),
			(m: Maybe<number>) => {
				// Associativity: m.chain(f).chain(g) === m.chain(x => f(x).chain(g))

				// Left side: m.chain(f).chain(g)
				const left1 = chain<number, number>(f)(m)
				const left2 = chain<number, number>(g)(left1)

				// Right side: m.chain(x => f(x).chain(g))
				const right1 = chain<number, number>(
					(x: number) => chain<number, number>(g)(f(x)),
				)(m)

				return JSON.stringify(left2) === JSON.stringify(right1)
			},
		),
		{ numRuns: 1000 },
	)
})

Deno.test("Maybe functor - identity law", () => {
	const identity = <T>(x: T): T => x

	fc.assert(
		fc.property(
			fc.oneof(
				fc.integer().map((v) => just(v)),
				fc.constant(nothing()),
			),
			(m: Maybe<number>) => {
				// Functor identity: map(id)(m) === m
				const result = map<number, number>(identity)(m)

				return JSON.stringify(result) === JSON.stringify(m)
			},
		),
		{ numRuns: 1000 },
	)
})

Deno.test("Maybe functor - composition law", () => {
	const f = (n: number): string => `value: ${n}`
	const g = (s: string): number => s.length

	fc.assert(
		fc.property(
			fc.oneof(
				fc.integer().map((v) => just(v)),
				fc.constant(nothing()),
			),
			(m: Maybe<number>) => {
				// Functor composition: map(g ∘ f)(m) === map(g)(map(f)(m))

				// Left side: map(g ∘ f)
				const composed = (x: number) => g(f(x))
				const left1 = map<number, number>(composed)(m)

				// Right side: map(g)(map(f)(m))
				const right1 = map<number, string>(f)(m)
				const right2 = map<string, number>(g)(right1)

				return JSON.stringify(left1) === JSON.stringify(right2)
			},
		),
		{ numRuns: 1000 },
	)
})

Deno.test("Maybe - Nothing short-circuits", () => {
	let sideEffectCount = 0

	const f = (n: number): Maybe<number> => {
		sideEffectCount++
		return just(n * 2)
	}

	const nothingMaybe = nothing()

	// Reset counter
	sideEffectCount = 0

	// Chain should not execute f when starting with Nothing
	const result = chain<number, number>(f)(nothingMaybe)

	assertEquals(sideEffectCount, 0, "Function should not be called for Nothing")
	assertEquals(result._tag, "Nothing")
})

Deno.test("Maybe - chain maintains type safety", () => {
	// Type transformation through chain
	const parseNumber = (s: string): Maybe<number> => {
		const n = parseInt(s, 10)
		return isNaN(n) ? nothing() : just(n)
	}

	const divideBy2 = (n: number): Maybe<number> => {
		return just(n / 2)
	}

	// Valid number string
	const result1 = chain<number, number>(divideBy2)(parseNumber("42"))
	assertEquals(result1._tag, "Just")
	if (result1._tag === "Just") {
		assertEquals(result1.value, 21)
	}

	// Invalid number string
	const result2 = chain<number, number>(divideBy2)(parseNumber("abc"))
	assertEquals(result2._tag, "Nothing")
})

Deno.test("Maybe - multiple chains preserve order", () => {
	const addOne = (n: number): Maybe<number> => just(n + 1)
	const multiplyTwo = (n: number): Maybe<number> => just(n * 2)
	const checkBounds = (n: number): Maybe<number> => n > 50 ? nothing() : just(n)

	fc.assert(
		fc.property(
			fc.integer({ min: 0, max: 100 }),
			(start) => {
				const result = chain<number, number>(checkBounds)(
					chain<number, number>(multiplyTwo)(
						chain<number, number>(addOne)(
							just(start),
						),
					),
				)

				const expected = (start + 1) * 2

				if (expected > 50) {
					return result._tag === "Nothing"
				} else {
					return result._tag === "Just" && result.value === expected
				}
			},
		),
		{ numRuns: 1000 },
	)
})

Deno.test("Maybe - Nothing propagation in chains", () => {
	const f1 = (n: number): Maybe<number> => just(n + 1)
	const f2 = (n: number): Maybe<number> => n > 5 ? nothing() : just(n * 2)
	const f3 = (n: number): Maybe<number> => just(n - 1)

	// Test that Nothing propagates through the chain
	const result1 = chain<number, number>(f3)(
		chain<number, number>(f2)(
			chain<number, number>(f1)(just(10)),
		),
	)
	assertEquals(result1._tag, "Nothing") // f2 returns Nothing for 11 > 5

	const result2 = chain<number, number>(f3)(
		chain<number, number>(f2)(
			chain<number, number>(f1)(just(2)),
		),
	)
	assertEquals(result2._tag, "Just")
	if (result2._tag === "Just") {
		assertEquals(result2.value, 5) // (2+1)*2-1 = 5
	}
})

Deno.test("Maybe - law interactions", () => {
	// Test that monad laws work together
	const value = 42
	const f = (n: number): Maybe<number> => n % 2 === 0 ? just(n / 2) : nothing()
	const g = (n: number): Maybe<number> => just(n + 10)

	// Combining left identity with associativity
	const result1 = chain<number, number>(g)(
		chain<number, number>(f)(just(value)),
	)
	const result2 = chain<number, number>((x: number) =>
		chain<number, number>(g)(f(x))
	)(just(value))

	assertEquals(JSON.stringify(result1), JSON.stringify(result2))
})
