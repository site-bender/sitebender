import { expect } from "@std/expect"

import WriterM from "./WriterM/index.ts"

Deno.test("WriterM - of, chain, tell, run", async (t) => {
  const StringMonoid = { empty: "", concat: (a: string, b: string) => a + b }
  const W = WriterM(StringMonoid)

  await t.step("of creates value with empty log", () => {
    const w = W.of(42)
    expect(W.run(w)).toEqual([42, ""])
  })

  await t.step("chain combines logs via monoid", () => {
    const addLogNumber = (msg: string) => (n: number) => {
      const w = W.tell(msg)(W.of<number>(n))
      // map to keep the number as the value
      return W.map((_: unknown) => n)(w) as ReturnType<typeof W.of<number>>
    }
    const stepA = W.chain<number, number>((n) => addLogNumber("a")(n))
    const stepB = W.chain<number, number>((n) => addLogNumber("b")(n))
  const program = stepB(stepA(W.of<number>(0)))
  expect(W.run(program)).toEqual([0, "ab"])
  })
})
