import * as fc from "npm:fast-check@3"

import type { Result } from "../../../../../src/types/fp/result/index.ts"

import ok from "../../../../../src/monads/result/ok/index.ts"
import err from "../../../../../src/monads/result/err/index.ts"
import map from "../../../../../src/monads/result/map/index.ts"
import chain from "../../../../../src/monads/result/chain/index.ts"

// Monad laws for Result (alias of Either with Ok/Err naming)

Deno.test("Result monad - left identity law", () => {
  const inc = (n: number): Result<number, never> => ok(n + 1)
  const safeDiv2 = (n: number): Result<number, string> =>
    n === 0 ? err("div by zero") : ok(n / 2)

  fc.assert(
    fc.property(fc.integer({ min: -1000, max: 1000 }), (value) => {
      const m1 = ok<number, never>(value)
      const r1a = chain<number, number, never>(inc)(m1)
      const r1b = inc(value)

      const m2 = ok<number, string>(value)
      const r2a = chain<number, number, string>(safeDiv2)(m2)
      const r2b = safeDiv2(value)

      return (
        JSON.stringify(r1a) === JSON.stringify(r1b) &&
        JSON.stringify(r2a) === JSON.stringify(r2b)
      )
    }),
    { numRuns: 500 },
  )
})

Deno.test("Result monad - right identity law", () => {
  const rightFn = <T>(a: T): Result<T, string> => ok<T, string>(a)

  fc.assert(
    fc.property(
      fc.oneof(
        fc.integer().map((v) => ok<number, string>(v)),
        fc.string().map((e) => err<string, number>(e)),
      ),
      (m) => {
        const result = chain<number, number, string>(rightFn)(m)
        return JSON.stringify(result) === JSON.stringify(m)
      },
    ),
    { numRuns: 500 },
  )
})

Deno.test("Result monad - associativity law", () => {
  const f = (x: number): Result<number, string> =>
    x > 100 ? err("too large") : ok(x * 2)
  const g = (x: number): Result<number, string> =>
    x < 0 ? err("negative") : ok(x + 10)

  fc.assert(
    fc.property(fc.integer({ min: -50, max: 150 }).map((v) => ok<number, string>(v)), (m) => {
      const left = chain<number, number, string>(g)(chain<number, number, string>(f)(m))
      const right = chain<number, number, string>((x: number) => chain<number, number, string>(g)(f(x)))(m)
      return JSON.stringify(left) === JSON.stringify(right)
    }),
    { numRuns: 500 },
  )
})

Deno.test("Result functor - identity and composition laws", () => {
  const id = <T>(x: T): T => x
  const f = (x: number) => x * 2
  const g = (x: number) => x + 10

  fc.assert(
    fc.property(
      fc.oneof(
        fc.integer().map((v) => ok<number, string>(v)),
        fc.string().map((e) => err<string, number>(e)),
      ),
      (m) => {
        const idRes = map<number, number>(id)(m)
        const compLeft = map<number, number>((x: number) => f(g(x)))(m)
        const compRight = map<number, number>(f)(map<number, number>(g)(m))
        return (
          JSON.stringify(idRes) === JSON.stringify(m) &&
          JSON.stringify(compLeft) === JSON.stringify(compRight)
        )
      },
    ),
    { numRuns: 500 },
  )
})
