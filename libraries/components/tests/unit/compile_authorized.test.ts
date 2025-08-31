import { assertEquals } from "https://deno.land/std@0.224.0/assert/mod.ts"

import type { ActionNode, ComparatorNode, InjectorNode, IrDocument } from "../../../adaptive/types/ir/index.ts"

import { compileToAdaptive } from "../../src/compile.ts"
import Authorized from "../../src/transform/control/When/Authorized/index.tsx"
import Publish from "../../src/transform/actions/Publish/index.tsx"
import On from "../../src/transform/control/On/index.tsx"

// Minimal VNode helper the compiler recognizes as an element
const el = (
  tag: string,
  props: Record<string, unknown> = {},
  children?: unknown,
) => ({
  type: tag,
  props: children === undefined ? props : { ...props, children },
})

Deno.test("When.Authorized compiles to Act.If with policy comparator and Constant config", () => {
  const tree = [
    el("button", { id: "panel" }),
    On({
      event: "Click",
      children: Authorized({
        policyTag: "HasRole",
        policyArgs: { role: "admin" },
        children: Publish({ topic: "ok" }) as unknown as JSX.Element,
        fallback: Publish({ topic: "deny" }) as unknown as JSX.Element,
      }) as unknown as JSX.Element,
    }) as unknown as JSX.Element,
  ]

  const doc = compileToAdaptive(tree) as IrDocument
  assertEquals(doc.kind, "element")
  const evt = doc.children[0] as unknown as { kind: string; handler: unknown }
  assertEquals(evt.kind, "on")
  const handler = evt.handler as ActionNode
  assertEquals(handler.kind, "action")
  assertEquals(handler.action, "Act.If")
  // First arg is the condition comparator (policy fallback)
  const cond = handler.args[0] as ComparatorNode
  assertEquals(cond.kind, "comparator")
  assertEquals(cond.cmp, "HasRole")
  // First arg to comparator is Constant injector carrying policyArgs
  const cfg = cond.args[0] as InjectorNode
  assertEquals(cfg.kind, "injector")
  assertEquals(cfg.injector, "From.Constant")
  assertEquals(cfg.args.value, { role: "admin" })
})
