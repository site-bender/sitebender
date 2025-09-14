import { expect } from "@std/expect"

import doTask from "./index.ts"
import of_ from "../task/of/index.ts"
import chain from "../task/chain/index.ts"
import delay from "../task/delay/index.ts"

Deno.test({ name: "doTask - sequences async values", sanitizeResources: false, sanitizeOps: false }, async () => {
  const comp = doTask<number>(function* () {
    const a = (yield of_(2)) as number
    const b = (yield delay(5)(of_(3))) as number
    return a + b
  })
  const result = await comp()
  expect(result).toBe(5)
})

Deno.test({ name: "doTask - works with chain and of", sanitizeResources: false, sanitizeOps: false }, async () => {
  const comp = doTask<number>(function* () {
    const n = (yield of_(10)) as number
    return n * 2
  })
  const chained = chain((n: number) => of_(n + 5))(comp)
  const out = await chained()
  expect(out).toBe(25)
})
