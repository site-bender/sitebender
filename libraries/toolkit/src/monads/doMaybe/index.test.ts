import { expect } from "@std/expect"

import doMaybe from "./index.ts"
import just from "../maybe/just/index.ts"
import nothing from "../maybe/nothing/index.ts"
import chain from "../maybe/chain/index.ts"
import of_ from "../maybe/of/index.ts"

Deno.test("doMaybe - sequences Just values", () => {
  const comp = doMaybe<number>(function* () {
    const x = (yield just(2)) as number
    const y = (yield just(3)) as number
    return x + y
  })
  expect(comp).toEqual(of_(5))
})

Deno.test("doMaybe - short-circuits on Nothing", () => {
  const comp = doMaybe<number>(function* () {
    const x = (yield nothing<number>()) as number
    return x + 1
  })
  // should be Nothing; verify via chain no-op
  const observed = chain((n: number) => of_(n + 1))(comp)
  expect(observed).toEqual(nothing())
})
