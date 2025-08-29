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

const cmp = (cmp: string, a: unknown, b: unknown): ComparatorNode => ({
  v: "0.1.0",
  kind: "comparator",
  id: nodeId(),
  cmp,
  args: [constInjector(a), constInjector(b)],
})

Deno.test("Temporal Date comparators runtime", async () => {
  const ctx = createComposeContext({ env: "server" })
  registerDefaultExecutors(ctx)

  assertEquals(await evaluateNode(cmp("IsAfterDate", "2024-05-02", "2024-05-01"), ctx), true)
  assertEquals(await evaluateNode(cmp("IsBeforeDate", "2024-05-01", "2024-05-02"), ctx), true)
  assertEquals(await evaluateNode(cmp("IsSameDate", "2024-05-01", "2024-05-01"), ctx), true)
  assertEquals(await evaluateNode(cmp("IsNotAfterDate", "2024-05-01", "2024-05-01"), ctx), true)
  assertEquals(await evaluateNode(cmp("IsNotBeforeDate", "2024-05-01", "2024-05-01"), ctx), true)
  assertEquals(await evaluateNode(cmp("IsNotSameDate", "2024-05-01", "2024-05-02"), ctx), true)
})

Deno.test("Temporal Time comparators runtime", async () => {
  const ctx = createComposeContext({ env: "server" })
  registerDefaultExecutors(ctx)

  assertEquals(await evaluateNode(cmp("IsAfterTime", "12:01", "12:00"), ctx), true)
  assertEquals(await evaluateNode(cmp("IsBeforeTime", "11:59", "12:00"), ctx), true)
  assertEquals(await evaluateNode(cmp("IsSameTime", "12:00", "12:00"), ctx), true)
  assertEquals(await evaluateNode(cmp("IsNotAfterTime", "12:00", "12:00"), ctx), true)
  assertEquals(await evaluateNode(cmp("IsNotBeforeTime", "12:00", "12:00"), ctx), true)
  assertEquals(await evaluateNode(cmp("IsNotSameTime", "12:00", "12:01"), ctx), true)
})

Deno.test("Temporal DateTime comparators runtime", async () => {
  const ctx = createComposeContext({ env: "server" })
  registerDefaultExecutors(ctx)

  assertEquals(await evaluateNode(cmp("IsAfterDateTime", "2024-05-01T12:01", "2024-05-01T12:00"), ctx), true)
  assertEquals(await evaluateNode(cmp("IsBeforeDateTime", "2024-05-01T11:59", "2024-05-01T12:00"), ctx), true)
})
