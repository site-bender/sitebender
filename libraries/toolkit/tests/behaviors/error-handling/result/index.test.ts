import * as fc from "npm:fast-check@3"

import ok from "../../../../src/monads/result/ok/index.ts"
import err from "../../../../src/monads/result/err/index.ts"
import bimap from "../../../../src/monads/result/bimap/index.ts"
import fold from "../../../../src/monads/result/fold/index.ts"
import orElse from "../../../../src/monads/result/orElse/index.ts"
import tryCatch from "../../../../src/monads/result/tryCatch/index.ts"
import map from "../../../../src/monads/result/map/index.ts"
import mapErr from "../../../../src/monads/result/mapErr/index.ts"

Deno.test("Result bimap applies left/right functions", () => {
  const double = (n: number) => n * 2
  const up = (s: string) => s.toUpperCase()

  fc.assert(
    fc.property(fc.integer(), (n) => {
      const r = ok<number, string>(n)
      const res = bimap<string, string, number, number>(up, double)(r)
      return JSON.stringify(res) === JSON.stringify(ok<number, string>(double(n)))
    }),
    { numRuns: 200 },
  )

  fc.assert(
    fc.property(fc.string(), (e) => {
      const r = err<string, number>(e)
      const res = bimap<string, string, number, number>(up, double)(r)
      return JSON.stringify(res) === JSON.stringify(err<string, number>(up(e)))
    }),
    { numRuns: 200 },
  )
})

Deno.test("Result fold collapses Ok/Err with provided handlers", () => {
  const onErr = (e: string): string => `E:${e}`
  const onOk = (n: number): string => `V:${n}`

  fc.assert(
    fc.property(fc.integer(), (n) => fold(onErr)(onOk)(ok<number, string>(n)) === `V:${n}`),
    { numRuns: 200 },
  )

  fc.assert(
    fc.property(fc.string(), (e) => fold(onErr)(onOk)(err<string, number>(e)) === `E:${e}`),
    { numRuns: 200 },
  )
})

Deno.test("Result orElse recovers from Err only", () => {
  const recover = (e: string) => ok<number, string>(e.length)

  fc.assert(
    fc.property(fc.string(), (e) => {
      const r = err<string, number>(e)
      const res = orElse(recover)(r)
      return JSON.stringify(res) === JSON.stringify(ok<number, string>(e.length))
    }),
    { numRuns: 200 },
  )

  fc.assert(
    fc.property(fc.integer(), (n) => {
      const r = ok<number, string>(n)
      const res = orElse(recover)(r)
      return JSON.stringify(res) === JSON.stringify(ok<number, string>(n))
    }),
    { numRuns: 200 },
  )
})

Deno.test("Result tryCatch captures thrown error and maps to Err", () => {
  const good = (n: number) => n + 1
  const bad = (_: number) => { throw new Error("boom") }

  const toMsg = (u: unknown) => u instanceof Error ? u.message : String(u)

  fc.assert(
    fc.property(fc.integer(), (n) => {
      const r = tryCatch(() => good(n), toMsg)
      return JSON.stringify(r) === JSON.stringify(ok<number, string>(good(n)))
    }),
    { numRuns: 100 },
  )

  const r2 = tryCatch(() => bad(1), toMsg)
  if (JSON.stringify(r2) !== JSON.stringify(err<string, number>("boom"))) {
    throw new Error("tryCatch should map thrown Error to Err with message")
  }
})

Deno.test("Result map only transforms Ok; mapErr only transforms Err", () => {
  const inc = (n: number) => n + 1
  const up = (s: string) => s.toUpperCase()

  fc.assert(
    fc.property(fc.integer(), (n) => {
      const r = ok<number, string>(n)
      const res = map<number, number>(inc)(r)
      return JSON.stringify(res) === JSON.stringify(ok<number, string>(n + 1))
    }),
    { numRuns: 200 },
  )

  fc.assert(
    fc.property(fc.string(), (e) => {
      const r = err<string, number>(e)
      const res = map<number, number>(inc)(r)
      return JSON.stringify(res) === JSON.stringify(err<string, number>(e))
    }),
    { numRuns: 200 },
  )

  fc.assert(
    fc.property(fc.string(), (e) => {
      const r = err<string, number>(e)
      const res = mapErr<string, string>(up)(r)
      return JSON.stringify(res) === JSON.stringify(err<string, number>(up(e)))
    }),
    { numRuns: 200 },
  )

  fc.assert(
    fc.property(fc.integer(), (n) => {
      const r = ok<number, string>(n)
      const res = mapErr<string, string>(up)(r)
      return JSON.stringify(res) === JSON.stringify(ok<number, string>(n))
    }),
    { numRuns: 200 },
  )
})
