import { assertEquals } from "jsr:@std/assert"
import { describe, it } from "jsr:@std/testing/bdd"

import createElement from "../../src/helpers/createElement/index.ts"
import Fragment from "../../src/helpers/Fragment/index.ts"

// Bind JSX runtime for this test file
// deno-lint-ignore no-explicit-any
;(globalThis as any).createElement = createElement
// deno-lint-ignore no-explicit-any
;(globalThis as any).Fragment = Fragment

import compile from "../../src/transform/compile/minimal.ts"
import On from "../../src/transform/control/On/index.tsx"

function el(tag: string, props?: Record<string, unknown> | null, ...children: unknown[]) {
  return createElement(tag, props ?? null, ...children)
}

describe("compile/minimal - control:on marker", () => {
  it("attaches On behavior to nearest element", () => {
    const tree = (
      el("div", { id: "a" },
        // attach On.Submit behavior
        createElement(On, { event: "Submit" }, el("span", null, "handler")),
        el("p", null, "child")
      )
    )

    const ir = compile(tree)
    assertEquals(ir.length, 1)
    const node = ir[0]
    if (node.kind !== "element") throw new Error("expected element")
    assertEquals(node.behaviors?.length ?? 0, 1)
    assertEquals(node.behaviors?.[0].kind, "on")
    assertEquals((node.behaviors?.[0] as any).event, "Submit")
  })
})
