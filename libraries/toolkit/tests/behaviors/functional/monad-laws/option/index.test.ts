import * as fc from "npm:fast-check@3"

import just from "../../../../../src/monads/option/just/index.ts"
import map from "../../../../../src/monads/option/map/index.ts"
import nothing from "../../../../../src/monads/option/nothing/index.ts"

Deno.test("Option alias of Maybe - map identity", () => {
  const id = <T>(x: T): T => x
  fc.assert(
    fc.property(
      fc.oneof(
        fc.integer().map((v) => just(v)),
        fc.constant(nothing()),
      ),
      (m) => {
        const res = map(id)(m)
        return JSON.stringify(res) === JSON.stringify(m)
      },
    ),
    { numRuns: 200 },
  )
})
