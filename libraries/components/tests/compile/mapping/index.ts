import { assertEquals, assert } from "https://deno.land/std@0.224.0/assert/mod.ts"

// IR node types
import type {
  IrDocument,
  EventBindingNode,
  ActionNode,
  OperatorNode,
  ComparatorNode,
  InjectorNode,
} from "../../../../adaptive/types/ir/index.ts"

import { compileToAdaptive } from "../../../src/compile.ts"
import Publish from "../../../src/transform/actions/Publish/index.tsx"
import SetQueryString from "../../../src/transform/actions/SetQueryString/index.tsx"
import SetValue from "../../../src/transform/actions/SetValue/index.tsx"
import NotEmpty from "../../../src/transform/comparators/NotEmpty/index.tsx"
// Import marker/component constructors
import On from "../../../src/transform/control/On/index.tsx"
import Constant from "../../../src/transform/injectors/Constant/index.tsx"
import FromElement from "../../../src/transform/injectors/FromElement/index.tsx"
import Add from "../../../src/transform/operators/Add/index.tsx"

// Minimal VNode helper the compiler recognizes as an element
const el = (tag: string, props: Record<string, unknown> = {}, children?: unknown) => ({
  type: tag,
  props: children === undefined ? props : { ...props, children },
})

Deno.test("compileToAdaptive binds On to nearest prior element id", () => {
  const tree = [
    el("input", { id: "name" }),
    On({
      event: "Input",
      // Cast marker to JSX.Element for prop typing
      children: SetValue({ selector: "#status", value: FromElement({ id: "name" }) as unknown as JSX.Element }) as unknown as JSX.Element,
    }),
  ]

  const ir = compileToAdaptive(tree)
  const doc = ir as IrDocument
  assertEquals(doc.kind, "element")
  assert(Array.isArray(doc.children))
  assertEquals(doc.children.length, 1)

  const evt = doc.children[0] as EventBindingNode
  assertEquals(evt.kind, "on")
  assertEquals(evt.event, "On.Input")
  assertEquals(evt.id, "name")

  const handler = evt.handler as ActionNode
  assertEquals(handler.kind, "action")
  assertEquals(handler.action, "Act.SetValue")
  assertEquals(handler.args.length, 2)
  // First arg (selector) is compiled as a constant injector
  const arg0 = handler.args[0] as InjectorNode
  assertEquals(arg0.kind, "injector")
  assertEquals(arg0.injector, "From.Constant")
  assertEquals(arg0.args.value, "#status")
  // Second arg is From.Element injector
  const arg1 = handler.args[1] as InjectorNode
  assertEquals(arg1.kind, "injector")
  assertEquals(arg1.injector, "From.Element")
  assertEquals(arg1.args.selector, "#name")
})

Deno.test("compileToAdaptive respects explicit On.target over last anchor", () => {
  const tree = [
    el("div", { id: "a" }),
    el("div", { id: "price" }),
    On({
      event: "Change",
      target: "price",
      children: SetValue({ selector: "#out", value: Constant({ value: 1 }) as unknown as JSX.Element }) as unknown as JSX.Element,
    }),
  ]
  const doc = compileToAdaptive(tree) as IrDocument
  const evt = doc.children[0] as EventBindingNode
  assertEquals(evt.id, "price")
  assertEquals(evt.event, "On.Change")
})

Deno.test("compileToAdaptive maps Add operator and Constant/FromElement injectors", () => {
  const tree = [
    el("input", { id: "a" }),
    el("input", { id: "b" }),
    el("output", { id: "sum" }),
    On({
      event: "Input",
      target: "sum",
      children: SetValue({
        selector: "#sum",
        value: Add({
          children: [
            FromElement({ id: "a" }) as unknown as JSX.Element,
            FromElement({ id: "b" }) as unknown as JSX.Element,
            Constant({ value: 5 }) as unknown as JSX.Element,
          ],
        }) as unknown as JSX.Element,
      }) as unknown as JSX.Element,
    }),
  ]
  const doc = compileToAdaptive(tree) as IrDocument
  const evt = doc.children[0] as EventBindingNode
  const op = evt.handler.args[1] as OperatorNode
  assertEquals(op.kind, "operator")
  assertEquals(op.op, "Op.Add")
  assertEquals(op.args.length, 3)
  const op0 = op.args[0] as InjectorNode
  const op1 = op.args[1] as InjectorNode
  const op2 = op.args[2] as InjectorNode
  assertEquals(op0.injector, "From.Element")
  assertEquals(op1.injector, "From.Element")
  assertEquals(op2.injector, "From.Constant")
  assertEquals(op2.args.value, 5)
})

Deno.test("compileToAdaptive compiles comparator markers inside action args", () => {
  const tree = [
    el("input", { id: "val" }),
    On({
      event: "Change",
      children: Publish({
        topic: "debug",
        payload: NotEmpty({ children: FromElement({ id: "val" }) as unknown as JSX.Element }) as unknown as JSX.Element,
      }) as unknown as JSX.Element,
    }),
  ]
  const doc = compileToAdaptive(tree) as IrDocument
  const evt = doc.children[0] as EventBindingNode
  const cmp = evt.handler.args[1] as ComparatorNode
  assertEquals(cmp.kind, "comparator")
  assertEquals(cmp.cmp, "Is.NotEmpty")
  assertEquals(cmp.args.length, 1)
  const i0 = cmp.args[0] as InjectorNode
  assertEquals(i0.injector, "From.Element")
})

Deno.test("compileToAdaptive wraps primitives as Constant injectors with correct datatype", () => {
  const tree = [
    el("form", { id: "f" }),
    On({
      event: "Submit",
      children: SetQueryString({ key: "foo", value: true }) as unknown as JSX.Element,
    }),
  ]
  const doc = compileToAdaptive(tree) as IrDocument
  const evt = doc.children[0] as EventBindingNode
  const [keyNode, valueNode] = evt.handler.args as [InjectorNode, InjectorNode]
  assertEquals(keyNode.kind, "injector")
  assertEquals(keyNode.injector, "From.Constant")
  assertEquals(keyNode.args.value, "foo")
  assertEquals(keyNode.datatype, "String")

  assertEquals(valueNode.kind, "injector")
  assertEquals(valueNode.injector, "From.Constant")
  assertEquals(valueNode.args.value, true)
  assertEquals(valueNode.datatype, "Boolean")
})
