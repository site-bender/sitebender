import { assertEquals } from "https://deno.land/std@0.218.0/assert/mod.ts"
import * as fc from "npm:fast-check@3"

import chain from "../../../../../src/either/chain/index.ts"
import type { Either } from "../../../../../src/types/fp/either/index.ts"
import left from "../../../../../src/either/left/index.ts"
import map from "../../../../../src/either/map/index.ts"
import right from "../../../../../src/either/right/index.ts"

/**
 * Tests for Either monad laws:
 * 1. Left Identity: M.of(a).chain(f) === f(a)
 * 2. Right Identity: m.chain(M.of) === m
 * 3. Associativity: m.chain(f).chain(g) === m.chain(x => f(x).chain(g))
 */

Deno.test("Either monad - left identity law", () => {
	fc.assert(
		fc.property(
			fc.integer(),
			fc.func(fc.oneof(
				fc.integer().map(v => right<string, number>(v)),
				fc.string().map(e => left<string, number>(e))
			)),
			(value, f) => {
				// Left identity: of(a).chain(f) === f(a)
				const m = right<string, number>(value)
				const result1 = chain<string, number, number>(f)(m)
				const result2 = f(value)
				
				// Compare the Either values
				return JSON.stringify(result1) === JSON.stringify(result2)
			}
		),
		{ numRuns: 1000 }
	)
})

Deno.test("Either monad - right identity law", () => {
	fc.assert(
		fc.property(
			fc.oneof(
				fc.integer().map(v => right<string, number>(v)),
				fc.string().map(e => left<string, number>(e))
			),
			(m: Either<string, number>) => {
				// Right identity: m.chain(of) === m
				const result = chain<string, number, number>(
					(a: number) => right<string, number>(a)
				)(m)
				
				return JSON.stringify(result) === JSON.stringify(m)
			}
		),
		{ numRuns: 1000 }
	)
})

Deno.test("Either monad - associativity law", () => {
	// Create deterministic functions for testing
	const f = (n: number): Either<string, number> => 
		n > 0 ? right(n * 2) : left("negative")
	
	const g = (n: number): Either<string, number> => 
		n > 100 ? left("too large") : right(n + 10)
	
	fc.assert(
		fc.property(
			fc.oneof(
				fc.integer({ min: -50, max: 150 }).map(v => right<string, number>(v)),
				fc.string().map(e => left<string, number>(e))
			),
			(m: Either<string, number>) => {
				// Associativity: m.chain(f).chain(g) === m.chain(x => f(x).chain(g))
				
				// Left side: m.chain(f).chain(g)
				const left1 = chain<string, number, number>(f)(m)
				const left2 = chain<string, number, number>(g)(left1)
				
				// Right side: m.chain(x => f(x).chain(g))
				const right1 = chain<string, number, number>(
					(x: number) => chain<string, number, number>(g)(f(x))
				)(m)
				
				return JSON.stringify(left2) === JSON.stringify(right1)
			}
		),
		{ numRuns: 1000 }
	)
})

Deno.test("Either functor - identity law", () => {
	const identity = <T>(x: T): T => x
	
	fc.assert(
		fc.property(
			fc.oneof(
				fc.integer().map(v => right<string, number>(v)),
				fc.string().map(e => left<string, number>(e))
			),
			(m: Either<string, number>) => {
				// Functor identity: map(id)(m) === m
				const result = map<string, number, number>(identity)(m)
				
				return JSON.stringify(result) === JSON.stringify(m)
			}
		),
		{ numRuns: 1000 }
	)
})

Deno.test("Either functor - composition law", () => {
	const f = (n: number): string => `value: ${n}`
	const g = (s: string): number => s.length
	
	fc.assert(
		fc.property(
			fc.oneof(
				fc.integer().map(v => right<string, number>(v)),
				fc.string().map(e => left<string, number>(e))
			),
			(m: Either<string, number>) => {
				// Functor composition: map(g ∘ f)(m) === map(g)(map(f)(m))
				
				// Left side: map(g ∘ f)
				const composed = (x: number) => g(f(x))
				const left1 = map<string, number, number>(composed)(m)
				
				// Right side: map(g)(map(f)(m))
				const right1 = map<string, number, string>(f)(m)
				const right2 = map<string, string, number>(g)(right1)
				
				return JSON.stringify(left1) === JSON.stringify(right2)
			}
		),
		{ numRuns: 1000 }
	)
})

Deno.test("Either - error propagation in chains", () => {
	fc.assert(
		fc.property(
			fc.integer(),
			(value) => {
				const computation = chain<string, number, number>(
					(x: number) => right<string, number>(x * 2)
				)(
					chain<string, number, number>(
						(x: number) => x > 100 ? left<string, number>("too large") : right<string, number>(x)
					)(
						right<string, number>(value)
					)
				)
				
				// If value > 100, should get Left("too large")
				// Otherwise should get Right(value * 2)
				if (value > 100) {
					return computation._tag === "Left" && 
						computation.left === "too large"
				} else {
					return computation._tag === "Right" && 
						computation.right === value * 2
				}
			}
		),
		{ numRuns: 1000 }
	)
})

Deno.test("Either - Left short-circuits", () => {
	let sideEffectCount = 0
	
	const f = (n: number): Either<string, number> => {
		sideEffectCount++
		return right(n * 2)
	}
	
	const errorEither = left<string, number>("error")
	
	// Reset counter
	sideEffectCount = 0
	
	// Chain should not execute f when starting with Left
	const result = chain<string, number, number>(f)(errorEither)
	
	assertEquals(sideEffectCount, 0, "Function should not be called for Left")
	assertEquals(result._tag, "Left")
	assertEquals(result.left, "error")
})

Deno.test("Either - chain maintains type safety", () => {
	// Type transformation through chain
	const parseNumber = (s: string): Either<string, number> => {
		const n = parseInt(s, 10)
		return isNaN(n) ? left("not a number") : right(n)
	}
	
	const divideBy2 = (n: number): Either<string, number> => {
		return right(n / 2)
	}
	
	// Valid number string
	const result1 = chain<string, number, number>(divideBy2)(parseNumber("42"))
	assertEquals(result1._tag, "Right")
	assertEquals(result1.right, 21)
	
	// Invalid number string
	const result2 = chain<string, number, number>(divideBy2)(parseNumber("abc"))
	assertEquals(result2._tag, "Left")
	assertEquals(result2.left, "not a number")
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
							right<string, number>(start)
						)
					)
				)
				
				const expected = (start + 1) * 2
				
				if (expected > 50) {
					return result._tag === "Left" && result.left === "overflow"
				} else {
					return result._tag === "Right" && result.right === expected
				}
			}
		),
		{ numRuns: 1000 }
	)
})