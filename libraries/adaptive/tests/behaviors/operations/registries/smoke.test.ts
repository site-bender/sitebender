import { assert, assertEquals } from "jsr:@std/assert"
import { describe, it } from "jsr:@std/testing/bdd"

import type { ComparatorNode, InjectorNode, OperatorNode } from "../../../../types/ir/index.ts"

import { createComposeContext } from "../../../../src/context/composeContext.ts"
import { registerDefaultExecutors } from "../../../../src/operations/defaults/registerDefaults.ts"
import { getAction } from "../../../../src/operations/registries/actions.ts"
import { getComparator } from "../../../../src/operations/registries/comparators.ts"
import { getEvent, registerEvent } from "../../../../src/operations/registries/events.ts"
import { getInjector } from "../../../../src/operations/registries/injectors.ts"
import { getOperator } from "../../../../src/operations/registries/operators.ts"
import evaluate from "../../../../src/runtime/evaluate/index.ts"

const nodeId = () => crypto.randomUUID()
const constant = (value: unknown): InjectorNode => ({ v: "0.1.0", kind: "injector", id: nodeId(), injector: "From.Constant", datatype: "String", args: { value } })
const add = (args: Array<InjectorNode|OperatorNode>): OperatorNode => ({ v: "0.1.0", kind: "operator", id: nodeId(), op: "Op.Add", datatype: "Float", args })
const eq = (a: InjectorNode|OperatorNode, b: InjectorNode|OperatorNode): ComparatorNode => ({ v: "0.1.0", kind: "comparator", id: nodeId(), cmp: "Is.EqualTo", args: [a,b] })


describe("registries - smoke", () => {
  const ctx = createComposeContext({ env: "server" })
  registerDefaultExecutors(ctx)

  it("injector resolves and returns value", async () => {
    const inj = getInjector("From.Constant")!
    const val = await inj(constant("x"), ctx)
    assertEquals(val, "x")
  })

  it("operator resolves and adds", async () => {
    const op = getOperator("Op.Add")!
    const result = await op(add([constant(2), constant(3)]), (n) => evaluate(n, ctx), ctx)
    assertEquals(result, 5)
  })

  it("comparator resolves and compares equality", async () => {
    const cmp = getComparator("Is.EqualTo")!
    const result = await cmp(eq(constant("y"), constant("y")), (n) => evaluate(n, ctx), ctx)
    assertEquals(result, true)
  })

  it("event binder registers and fetches", () => {
    registerEvent("On.Test", () => {})
    const ev = getEvent("On.Test")
    assert(!!ev)
  })

  it("actions resolve (SetValue present)", () => {
    const action = getAction("Act.SetValue")
    assert(!!action)
  })
})
