import { assert, assertEquals } from "jsr:@std/assert"
import { describe, it } from "jsr:@std/testing/bdd"

import type { EventBindingNode, IrDocument } from "../../../../../types/ir/index.ts"

import { createComposeContext } from "../../../../../src/context/composeContext/index.ts"
import { registerDefaultExecutors } from "../../../../../src/operations/defaults/registerDefaults/index.ts"
import hydrate from "../../../../../src/runtime/hydrator/index.ts"
import createTestDomWithBody from "../../../../helpers/createTestDom/createTestDomWithBody/index.ts"

function embedIr(doc: IrDocument) {
  return `<script id="ir-root" type="application/adaptive+json">${
    JSON.stringify(doc)
  }</script>`
}

describe("hydrate - On.Submit preventDefault behavior", () => {
  it("prevents navigation and lets actions control URL/history", async () => {
    const evtId = "evt_submit_prevent"
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
            id: "a1",
            action: "Act.SetQueryString",
            args: [
              { v: "0.1.0", kind: "injector", id: "k", injector: "From.Constant", datatype: "String", args: { value: "k" } },
              { v: "0.1.0", kind: "injector", id: "v", injector: "From.Constant", datatype: "String", args: { value: "v" } },
            ],
          },
        } as EventBindingNode,
      ],
    }

    const body = `
      <form id="f" data-ir-id="${evtId}" action="/should-not-navigate"><button type="submit">Go</button></form>
      ${embedIr(irDoc)}
    `

    const { document, window } = createTestDomWithBody(body)
    // Provide globals expected by actions
    // deno-lint-ignore no-explicit-any
    ;(globalThis as any).document = document as unknown as Document

    const calls: Array<{ url: string }> = []
    // deno-lint-ignore no-explicit-any
    ;(globalThis as any).history = {
      replaceState: (_s: unknown, _t: string, url: string) => calls.push({ url }),
    }
    // deno-lint-ignore no-explicit-any
    ;(globalThis as any).location = window.location

    const ctx = createComposeContext({ env: "client" })
    registerDefaultExecutors(ctx)

    const scriptDoc = document.getElementById("ir-root")
    assert(scriptDoc)
    // deno-lint-ignore no-explicit-any
    hydrate(JSON.parse(scriptDoc!.textContent || "") as any, ctx)

    // Track whether default was prevented
    let defaultPrevented = false
  const formEl = document.getElementById("f") as unknown as HTMLFormElement
    formEl.addEventListener("submit", (e) => {
      if (e.defaultPrevented) defaultPrevented = true
    })

  formEl.dispatchEvent(new Event("submit", { cancelable: true }))
    await new Promise((r) => setTimeout(r, 0))

    // Assert replaceState happened and default was prevented
    const last = calls.at(-1)
    assert(last)
    assertEquals(defaultPrevented, true)
    // Should reflect our query param set by the action, not the form action navigation
    // deno-lint-ignore no-non-null-assertion
    const url = new URL(last!.url)
    assertEquals(url.searchParams.get("k"), "v")
  })
})
