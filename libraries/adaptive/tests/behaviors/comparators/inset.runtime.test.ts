import { assertEquals } from "jsr:@std/assert"

import type { ComparatorNode, InjectorNode } from "../../../types/ir/index.ts"
import { createComposeContext } from "../../../src/context/composeContext.ts"
import { registerDefaultExecutors } from "../../../src/operations/defaults/registerDefaults.ts"
import evaluateNode from "../../../src/runtime/evaluate/index.ts"

const nodeId = () => crypto.randomUUID()
const constInjector = (value: unknown): InjectorNode => ({
  v: "0.1.0",
  kind: "injector",
  id: nodeId(),
  injector: "From.Constant",
  datatype: "String",
  args: { value },
})

const cmpInSet = (value: unknown, setVal: unknown): ComparatorNode => ({
  v: "0.1.0",
  kind: "comparator",
  id: nodeId(),
  cmp: "InSet",
  args: [constInjector(value), constInjector(setVal)],
})

Deno.test("InSet runtime works with arrays and comma-delimited strings", async () => {
  const ctx = createComposeContext({ env: "server" })
  registerDefaultExecutors(ctx)

  const n1 = cmpInSet("a", ["a", "b", "c"]) // true
  const r1 = await evaluateNode(n1, ctx)
  assertEquals(r1, true)

  const n2 = cmpInSet("x", ["a", "b", "c"]) // false
  const r2 = await evaluateNode(n2, ctx)
  assertEquals(r2, false)

  const n3 = cmpInSet("b", "a,b,c") // true
  const r3 = await evaluateNode(n3, ctx)
  assertEquals(r3, true)

  const n4 = cmpInSet(" d ", "a, b, c, d ") // includes trimming
  const r4 = await evaluateNode(n4, ctx)
  assertEquals(r4, true)
})

Deno.test("InSet runtime works with Set and object-map values", async () => {
  const ctx = createComposeContext({ env: "server" })
  registerDefaultExecutors(ctx)

  const mySet = new Set(["x", "y", "z"]) // true for y
  const n1 = cmpInSet("y", mySet)
  const r1 = await evaluateNode(n1, ctx)
  assertEquals(r1, true)

  const myMap = { a: 1, b: 2, c: 3 } // value 2 is included
  const n2 = cmpInSet(2, myMap)
  const r2 = await evaluateNode(n2, ctx)
  assertEquals(r2, true)

  const n3 = cmpInSet(4, myMap)
  const r3 = await evaluateNode(n3, ctx)
  assertEquals(r3, false)
})
