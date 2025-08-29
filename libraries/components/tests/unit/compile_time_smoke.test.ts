import { assert, assertEquals } from "https://deno.land/std@0.224.0/assert/mod.ts"

import type { IrDocument, ComparatorNode } from "../../../adaptive/types/ir/index.ts"
import { compileToAdaptive } from "../../src/compile.ts"

import On from "../../src/transform/control/On/index.tsx"
import Publish from "../../src/transform/actions/Publish/index.tsx"
import FromElement from "../../src/transform/injectors/FromElement/index.tsx"
import Constant from "../../src/transform/injectors/Constant/index.tsx"
import IsAfterTime from "../../src/transform/comparators/IsAfterTime/index.tsx"
import IsSameTime from "../../src/transform/comparators/IsSameTime/index.tsx"
import IsSameDateTime from "../../src/transform/comparators/IsSameDateTime/index.tsx"
import IsNotAfterDate from "../../src/transform/comparators/IsNotAfterDate/index.tsx"

const el = (tag: string, props: Record<string, unknown> = {}, children?: unknown) => ({
  type: tag,
  props: children === undefined ? props : { ...props, children },
})

Deno.test("compileToAdaptive compiles IsAfterTime comparator without warnings (happy path)", () => {
  const tree = [
    el("input", { id: "t" }),
    On({
      event: "Change",
      children: Publish({
        topic: "debug",
        payload: IsAfterTime({
          children: [
            FromElement({ id: "t" }) as unknown as JSX.Element,
            Constant({ value: "14:30:00" }) as unknown as JSX.Element,
          ],
        }) as unknown as JSX.Element,
      }) as unknown as JSX.Element,
    }),
  ]
  const doc = compileToAdaptive(tree) as IrDocument
  const evt = doc.children[0] as { handler: unknown }
  const handler = evt.handler as { args: unknown[] }
  const cmp = handler.args[1] as ComparatorNode
  assertEquals(cmp.cmp, "IsAfterTime")
  const warnings = ((cmp.meta?.debug as { warnings?: unknown })?.warnings ?? []) as unknown[]
  assert(Array.isArray(warnings))
  assertEquals(warnings.length, 0)
})

Deno.test("compileToAdaptive compiles IsNotAfterDate comparator without warnings (happy path)", () => {
  const tree = [
    el("input", { id: "d" }),
    On({
      event: "Change",
      children: Publish({
        topic: "debug",
        payload: IsNotAfterDate({
          children: [
            FromElement({ id: "d" }) as unknown as JSX.Element,
            Constant({ value: "2024-01-01" }) as unknown as JSX.Element,
          ],
        }) as unknown as JSX.Element,
      }) as unknown as JSX.Element,
    }),
  ]
  const doc = compileToAdaptive(tree) as IrDocument
  const evt = doc.children[0] as { handler: unknown }
  const handler = evt.handler as { args: unknown[] }
  const cmp = handler.args[1] as ComparatorNode
  assertEquals(cmp.cmp, "IsNotAfterDate")
  const warnings = ((cmp.meta?.debug as { warnings?: unknown })?.warnings ?? []) as unknown[]
  assert(Array.isArray(warnings))
  assertEquals(warnings.length, 0)
})

Deno.test("compileToAdaptive compiles IsSameTime comparator without warnings (happy path)", () => {
  const tree = [
    el("input", { id: "t" }),
    On({
      event: "Change",
      children: Publish({
        topic: "debug",
        payload: IsSameTime({
          children: [
            FromElement({ id: "t" }) as unknown as JSX.Element,
            Constant({ value: "14:30:00" }) as unknown as JSX.Element,
          ],
        }) as unknown as JSX.Element,
      }) as unknown as JSX.Element,
    }),
  ]
  const doc = compileToAdaptive(tree) as IrDocument
  const evt = doc.children[0] as { handler: unknown }
  const handler = evt.handler as { args: unknown[] }
  const cmp = handler.args[1] as ComparatorNode
  assertEquals(cmp.cmp, "IsSameTime")
  const warnings = ((cmp.meta?.debug as { warnings?: unknown })?.warnings ?? []) as unknown[]
  assert(Array.isArray(warnings))
  assertEquals(warnings.length, 0)
})

Deno.test("compileToAdaptive compiles IsSameDateTime comparator without warnings (happy path)", () => {
  const tree = [
    el("input", { id: "dt" }),
    On({
      event: "Change",
      children: Publish({
        topic: "debug",
        payload: IsSameDateTime({
          children: [
            FromElement({ id: "dt" }) as unknown as JSX.Element,
            Constant({ value: "2024-05-01T12:00" }) as unknown as JSX.Element,
          ],
        }) as unknown as JSX.Element,
      }) as unknown as JSX.Element,
    }),
  ]
  const doc = compileToAdaptive(tree) as IrDocument
  const evt = doc.children[0] as { handler: unknown }
  const handler = evt.handler as { args: unknown[] }
  const cmp = handler.args[1] as ComparatorNode
  assertEquals(cmp.cmp, "IsSameDateTime")
  const warnings = ((cmp.meta?.debug as { warnings?: unknown })?.warnings ?? []) as unknown[]
  assert(Array.isArray(warnings))
  assertEquals(warnings.length, 0)
})
