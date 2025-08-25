import { assert, assertEquals } from "jsr:@std/assert"
import { describe, it } from "jsr:@std/testing/bdd"
import * as fc from "npm:fast-check@3"

import type {
  ActionNode,
  ComparatorNode,
  EventBindingNode,
  InjectorNode,
  IrDocument,
} from "../../../../../types/ir/index.ts"

import { createComposeContext } from "../../../../../src/context/composeContext/index.ts"
import { registerDefaultExecutors } from "../../../../../src/operations/defaults/registerDefaults/index.ts"
import hydrate from "../../../../../src/runtime/hydrator/index.ts"
import createTestDomWithBody from "../../../../helpers/createTestDom/createTestDomWithBody/index.ts"

function embedIr(doc: IrDocument) {
  return `<script id="ir-root" type="application/adaptive+json">${
    JSON.stringify(doc)
  }</script>`
}

describe("Act.If behavior", () => {
  it("runs thenAction when condition is true, elseAction otherwise", async () => {
    const evtIdTrue = "evt_if_true"
    const evtIdFalse = "evt_if_false"

  const makeIfAction = (condVal: boolean, topic: string): ActionNode => ({
      v: "0.1.0",
      kind: "action",
      id: `if_${topic}`,
      action: "Act.If",
      args: [
        {
          v: "0.1.0",
          kind: "comparator",
          id: `c_${topic}`,
          cmp: "Is.EqualTo",
          args: [
            {
              v: "0.1.0",
              kind: "injector",
              id: `const_${topic}`,
              injector: "From.Constant",
              datatype: "Boolean",
              args: { value: condVal },
            } as InjectorNode,
            {
              v: "0.1.0",
              kind: "injector",
              id: `true_${topic}`,
              injector: "From.Constant",
              datatype: "Boolean",
              args: { value: true },
            } as InjectorNode,
          ],
        } as unknown as ComparatorNode,
        // then: publish topic "then:<topic>"
        {
          v: "0.1.0",
          kind: "action",
          id: `then_${topic}`,
          action: "Act.Publish",
          args: [
            {
              v: "0.1.0",
              kind: "injector",
              id: `t_${topic}`,
              injector: "From.Constant",
              datatype: "String",
              args: { value: `then:${topic}` },
            } as InjectorNode,
            {
              v: "0.1.0",
              kind: "injector",
              id: `p_${topic}`,
              injector: "From.Constant",
              datatype: "String",
              args: { value: topic },
            } as InjectorNode,
          ],
        } as ActionNode,
        // else: publish topic "else:<topic>"
        {
          v: "0.1.0",
          kind: "action",
          id: `else_${topic}`,
          action: "Act.Publish",
          args: [
            {
              v: "0.1.0",
              kind: "injector",
              id: `te_${topic}`,
              injector: "From.Constant",
              datatype: "String",
              args: { value: `else:${topic}` },
            } as InjectorNode,
            {
              v: "0.1.0",
              kind: "injector",
              id: `pe_${topic}`,
              injector: "From.Constant",
              datatype: "String",
              args: { value: topic },
            } as InjectorNode,
          ],
        } as ActionNode,
      ],
    })

    const irDoc: IrDocument = {
      v: "0.1.0",
      kind: "element",
      id: "root",
      tag: "div",
      attrs: {},
      children: [
        {
          v: "0.1.0",
          kind: "on",
          id: evtIdTrue,
          event: "On.Submit",
          handler: makeIfAction(true, "A"),
        } as EventBindingNode,
        {
          v: "0.1.0",
          kind: "on",
          id: evtIdFalse,
          event: "On.Submit",
          handler: makeIfAction(false, "B"),
        } as EventBindingNode,
      ],
    }

    const body = `
      <form id="f1" data-ir-id="${evtIdTrue}"><button type="submit">Go</button></form>
      <form id="f2" data-ir-id="${evtIdFalse}"><button type="submit">Go</button></form>
      ${embedIr(irDoc)}
    `

  const { document, window } = createTestDomWithBody(body)
  // Ensure bus/event infrastructure binds to this test DOM
  // deno-lint-ignore no-explicit-any
  ;(globalThis as any).document = document as unknown as Document
  // deno-lint-ignore no-explicit-any
  ;(globalThis as any).window = window as unknown as Window
    // Prepare a local bus subscriber via context
    const ctx = createComposeContext({ env: "client" })
    registerDefaultExecutors(ctx)

    // Observe published topics
    const seen: string[] = []
    const unsubThenA = ctx.bus.subscribe<string>("then:A", (e) => {
      seen.push(`then:${e.payload}`)
    }, { once: true })
    const unsubElseB = ctx.bus.subscribe<string>("else:B", (e) => {
      seen.push(`else:${e.payload}`)
    }, { once: true })

    const scriptDoc = document.getElementById("ir-root")
    assert(scriptDoc)
    // deno-lint-ignore no-explicit-any
    hydrate(JSON.parse(scriptDoc!.textContent || "") as any, ctx)

    // Dispatch submit on both forms
    document.getElementById("f1")!.dispatchEvent(new Event("submit"))
    document.getElementById("f2")!.dispatchEvent(new Event("submit"))

    await new Promise((r) => setTimeout(r, 0))

  // Assert Act.If chose branches correctly (order-agnostic)
  seen.sort()
  assert(seen.includes("then:A"))
  assert(seen.includes("else:B"))
  assertEquals(seen.length, 2)

    // Cleanup subscribers
    unsubThenA()
    unsubElseB()
  })

  it("property: selects then vs else branch matching boolean condition", async () => {
    await fc.assert(
      fc.asyncProperty(fc.boolean(), async (flag) => {
        const evtId = `evt_if_prop_${flag}`
        const topic = flag ? "X" : "Y"
        const irDoc: IrDocument = {
          v: "0.1.0",
          kind: "element",
          id: "root",
          tag: "div",
          attrs: {},
          children: [
            {
              v: "0.1.0",
              kind: "on",
              id: evtId,
              event: "On.Submit",
              handler: {
                v: "0.1.0",
                kind: "action",
                id: `if_prop_${flag}`,
                action: "Act.If",
                args: [
                  {
                    v: "0.1.0",
                    kind: "comparator",
                    id: `c_prop_${flag}`,
                    cmp: "Is.EqualTo",
                    args: [
                      { v: "0.1.0", kind: "injector", id: `v_${flag}`, injector: "From.Constant", datatype: "Boolean", args: { value: flag } },
                      { v: "0.1.0", kind: "injector", id: `t_${flag}`, injector: "From.Constant", datatype: "Boolean", args: { value: true } },
                    ],
                  } as ComparatorNode,
                  {
                    v: "0.1.0",
                    kind: "action",
                    id: `then_prop_${flag}`,
                    action: "Act.Publish",
                    args: [
                      { v: "0.1.0", kind: "injector", id: `tp_${flag}`, injector: "From.Constant", datatype: "String", args: { value: "then:prop" } },
                      { v: "0.1.0", kind: "injector", id: `pp_${flag}`, injector: "From.Constant", datatype: "String", args: { value: topic } },
                    ],
                  } as ActionNode,
                  {
                    v: "0.1.0",
                    kind: "action",
                    id: `else_prop_${flag}`,
                    action: "Act.Publish",
                    args: [
                      { v: "0.1.0", kind: "injector", id: `ep_${flag}`, injector: "From.Constant", datatype: "String", args: { value: "else:prop" } },
                      { v: "0.1.0", kind: "injector", id: `qp_${flag}`, injector: "From.Constant", datatype: "String", args: { value: topic } },
                    ],
                  } as ActionNode,
                ],
              },
            } as EventBindingNode,
          ],
        }

        const body = `
          <form id="pf" data-ir-id="${evtId}"><button type="submit">Go</button></form>
          ${embedIr(irDoc)}
        `
        const { document, window } = createTestDomWithBody(body)
        // deno-lint-ignore no-explicit-any
        ;(globalThis as any).document = document as unknown as Document
        // deno-lint-ignore no-explicit-any
        ;(globalThis as any).window = window as unknown as Window

        const ctx = createComposeContext({ env: "client" })
        registerDefaultExecutors(ctx)
        const seen: string[] = []
        const unsubThen = ctx.bus.subscribe<string>("then:prop", (e) => {
          seen.push(`then:${e.payload}`)
        }, { once: true })
        const unsubElse = ctx.bus.subscribe<string>("else:prop", (e) => {
          seen.push(`else:${e.payload}`)
        }, { once: true })

        const scriptDoc = document.getElementById("ir-root")!
        // deno-lint-ignore no-explicit-any
        hydrate(JSON.parse(scriptDoc.textContent || "") as any, ctx)

        document.getElementById("pf")!.dispatchEvent(new Event("submit"))
        await new Promise((r) => setTimeout(r, 0))

        // Expect exactly one branch fired, and it matches the condition
        if (flag) {
          // then branch
          if (!(seen.length === 1 && seen[0] === `then:${topic}`)) {
            throw new Error(`Expected then:${topic}, got ${JSON.stringify(seen)}`)
          }
        } else {
          // else branch
          if (!(seen.length === 1 && seen[0] === `else:${topic}`)) {
            throw new Error(`Expected else:${topic}, got ${JSON.stringify(seen)}`)
          }
        }

        unsubThen()
        unsubElse()
      })
    )
  })
})
