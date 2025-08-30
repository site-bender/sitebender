import { assertEquals } from "https://deno.land/std@0.224.0/assert/mod.ts"
import { VizLine } from "../../src/transform/index.ts"

Deno.test("VizLine returns a VNode-like object with expected props", () => {
  const vnode = VizLine({ id: "x", x: "date", y: "value", className: "c" }) as unknown as { type: string; props: Record<string, unknown> }
  assertEquals(vnode.type, "div")
  assertEquals(vnode.props.id, "x")
  assertEquals(vnode.props.className, "c")
  assertEquals(vnode.props["data-viz"], "Line")
  assertEquals(vnode.props["data-viz-x"], "date")
  assertEquals(vnode.props["data-viz-y"], "value")
})
