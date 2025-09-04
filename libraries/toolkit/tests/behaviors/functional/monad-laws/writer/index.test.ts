import * as fc from "npm:fast-check@3"

import WriterM from "../../../../../src/monads/writer/WriterM/index.ts"

// Monoid instances
const MonoidString = { empty: "", concat: (a: string, b: string) => a + b }
const _MonoidArray = <T>() => ({ empty: [] as T[], concat: (a: T[], b: T[]) => a.concat(b) })

Deno.test("Writer monad - laws with string log", () => {
  const W = WriterM(MonoidString)
  const of = W.of<number>
  const tell = W.tell
  const chain = W.chain<number, number>

  const f = (n: number) => W.from(() => [n + 1, "f"]) // Writer<number>
  const g = (n: number) => W.from(() => [n * 2, "g"]) // Writer<number>

  fc.assert(
    fc.property(fc.integer(), (value) => {
      const m = of(value)
      const left = chain((x: number) => f(x))(m)
      const right = f(value)
      return JSON.stringify(W.run(left)) === JSON.stringify(W.run(right))
    }),
    { numRuns: 300 },
  )

  fc.assert(
    fc.property(fc.integer(), (value) => {
      const m = of(value)
      const result = chain(of)(m)
      return JSON.stringify(W.run(result)) === JSON.stringify(W.run(m))
    }),
    { numRuns: 300 },
  )

  fc.assert(
    fc.property(fc.integer(), (value) => {
      const m = of(value)
      const left = chain(g)(chain(f)(m))
      const right = chain((x: number) => chain(g)(f(x)))(m)
      return JSON.stringify(W.run(left)) === JSON.stringify(W.run(right))
    }),
    { numRuns: 300 },
  )

  // behavior: tell appends
  const told = tell("a")(of(1))
  const told2 = tell("b")(told)
  const [, log] = W.run(told2)
  if (log !== "ab") throw new Error("tell failed")
})
