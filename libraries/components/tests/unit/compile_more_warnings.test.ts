import { assert, assertEquals } from "https://deno.land/std@0.224.0/assert/mod.ts"

import type {
  IrDocument,
  EventBindingNode,
  ActionNode,
  OperatorNode,
  ComparatorNode,
} from "../../../adaptive/types/ir/index.ts"

import { compileToAdaptive } from "../../src/compile.ts"
import On from "../../src/transform/control/On/index.tsx"
import Publish from "../../src/transform/actions/Publish/index.tsx"
import FromElement from "../../src/transform/injectors/FromElement/index.tsx"
import Multiply from "../../src/transform/operators/Multiply/index.tsx"
import Min from "../../src/transform/operators/Min/index.tsx"
import Max from "../../src/transform/operators/Max/index.tsx"
import And from "../../src/transform/logical/And/index.tsx"
import Or from "../../src/transform/logical/Or/index.tsx"
import IsMoreThan from "../../src/transform/comparators/IsMoreThan/index.tsx"
import IsAfterDate from "../../src/transform/comparators/IsAfterDate/index.tsx"
import IsBeforeDate from "../../src/transform/comparators/IsBeforeDate/index.tsx"
import IsNotAfterDate from "../../src/transform/comparators/IsNotAfterDate/index.tsx"
import IsNotBeforeDate from "../../src/transform/comparators/IsNotBeforeDate/index.tsx"
import IsNotSameDate from "../../src/transform/comparators/IsNotSameDate/index.tsx"
import DoesNotMatch from "../../src/transform/comparators/DoesNotMatch/index.tsx"

// Minimal VNode helper the compiler recognizes as an element
import NotEmpty from "../../src/transform/comparators/NotEmpty/index.tsx"
import InSet from "../../src/transform/comparators/InSet/index.tsx"
import IsAfterDateTime from "../../src/transform/comparators/IsAfterDateTime/index.tsx"
import IsBeforeDateTime from "../../src/transform/comparators/IsBeforeDateTime/index.tsx"
import IsSameDateTime from "../../src/transform/comparators/IsSameDateTime/index.tsx"
import IsNotAfterDateTime from "../../src/transform/comparators/IsNotAfterDateTime/index.tsx"
import IsNotBeforeDateTime from "../../src/transform/comparators/IsNotBeforeDateTime/index.tsx"
import IsAfterTime from "../../src/transform/comparators/IsAfterTime/index.tsx"
import IsBeforeTime from "../../src/transform/comparators/IsBeforeTime/index.tsx"
import IsSameTime from "../../src/transform/comparators/IsSameTime/index.tsx"
import IsNotAfterTime from "../../src/transform/comparators/IsNotAfterTime/index.tsx"
import IsNotBeforeTime from "../../src/transform/comparators/IsNotBeforeTime/index.tsx"
import IsSameDate from "../../src/transform/comparators/IsSameDate/index.tsx"
const el = (tag: string, props: Record<string, unknown> = {}, children?: unknown) => ({
  type: tag,
  props: children === undefined ? props : { ...props, children },
})

Deno.test("compiler emits warning for Multiply with fewer than 2 multipliers", () => {
  const tree = [
    el("input", { id: "a" }),
    On({
      event: "Change",
      children: Publish({
        topic: "debug",
        payload: Multiply({ children: [FromElement({ id: "a" }) as unknown as JSX.Element] }) as unknown as JSX.Element,
      }) as unknown as JSX.Element,
    }),
  ]
  const doc = compileToAdaptive(tree) as IrDocument
  const evt = doc.children[0] as EventBindingNode
  const op = (evt.handler as ActionNode).args[1] as OperatorNode
  const warnings = ((op.meta?.debug as { warnings?: unknown })?.warnings ?? []) as unknown[]
  assert(Array.isArray(warnings))
  assertEquals(warnings.length > 0, true)
})

Deno.test("compiler emits warning for IsAfterDateTime with missing argument", () => {
  const tree = [
    el("input", { id: "dt" }),
    On({
      event: "Change",
      children: Publish({
        topic: "debug",
  payload: IsAfterDateTime({ children: [FromElement({ id: "dt" }) as unknown as JSX.Element] }) as unknown as JSX.Element,
      }) as unknown as JSX.Element,
    }),
  ]
  const doc = compileToAdaptive(tree) as IrDocument
  const evt = doc.children[0] as EventBindingNode
  const cmp = (evt.handler as ActionNode).args[1] as ComparatorNode
  const warnings = ((cmp.meta?.debug as { warnings?: unknown })?.warnings ?? []) as unknown[]
  assert(Array.isArray(warnings))
  assertEquals(warnings.length > 0, true)
})

Deno.test("compiler emits warning for IsBeforeDateTime with missing argument", () => {
  const tree = [
    el("input", { id: "dt" }),
    On({
      event: "Change",
      children: Publish({
        topic: "debug",
  payload: IsBeforeDateTime({ children: [FromElement({ id: "dt" }) as unknown as JSX.Element] }) as unknown as JSX.Element,
      }) as unknown as JSX.Element,
    }),
  ]
  const doc = compileToAdaptive(tree) as IrDocument
  const evt = doc.children[0] as EventBindingNode
  const cmp = (evt.handler as ActionNode).args[1] as ComparatorNode
  const warnings = ((cmp.meta?.debug as { warnings?: unknown })?.warnings ?? []) as unknown[]
  assert(Array.isArray(warnings))
  assertEquals(warnings.length > 0, true)
})

Deno.test("compiler emits warning for IsSameDateTime with missing argument", () => {
  const tree = [
    el("input", { id: "dt" }),
    On({
      event: "Change",
      children: Publish({
        topic: "debug",
        payload: IsSameDateTime({ children: [FromElement({ id: "dt" }) as unknown as JSX.Element] }) as unknown as JSX.Element,
      }) as unknown as JSX.Element,
    }),
  ]
  const doc = compileToAdaptive(tree) as IrDocument
  const evt = doc.children[0] as EventBindingNode
  const cmp = (evt.handler as ActionNode).args[1] as ComparatorNode
  const warnings = ((cmp.meta?.debug as { warnings?: unknown })?.warnings ?? []) as unknown[]
  assert(Array.isArray(warnings))
  assertEquals(warnings.length > 0, true)
})

Deno.test("compiler emits warning for IsNotAfterDateTime with missing argument", () => {
  const tree = [
    el("input", { id: "dt" }),
    On({
      event: "Change",
      children: Publish({
        topic: "debug",
        payload: IsNotAfterDateTime({ children: [FromElement({ id: "dt" }) as unknown as JSX.Element] }) as unknown as JSX.Element,
      }) as unknown as JSX.Element,
    }),
  ]
  const doc = compileToAdaptive(tree) as IrDocument
  const evt = doc.children[0] as EventBindingNode
  const cmp = (evt.handler as ActionNode).args[1] as ComparatorNode
  const warnings = ((cmp.meta?.debug as { warnings?: unknown })?.warnings ?? []) as unknown[]
  assert(Array.isArray(warnings))
  assertEquals(warnings.length > 0, true)
})

Deno.test("compiler emits warning for IsNotBeforeDateTime with missing argument", () => {
  const tree = [
    el("input", { id: "dt" }),
    On({
      event: "Change",
      children: Publish({
        topic: "debug",
        payload: IsNotBeforeDateTime({ children: [FromElement({ id: "dt" }) as unknown as JSX.Element] }) as unknown as JSX.Element,
      }) as unknown as JSX.Element,
    }),
  ]
  const doc = compileToAdaptive(tree) as IrDocument
  const evt = doc.children[0] as EventBindingNode
  const cmp = (evt.handler as ActionNode).args[1] as ComparatorNode
  const warnings = ((cmp.meta?.debug as { warnings?: unknown })?.warnings ?? []) as unknown[]
  assert(Array.isArray(warnings))
  assertEquals(warnings.length > 0, true)
})

Deno.test("compiler emits warning for IsAfterTime with missing argument", () => {
  const tree = [
    el("input", { id: "t" }),
    On({
      event: "Change",
      children: Publish({
        topic: "debug",
        payload: IsAfterTime({ children: [FromElement({ id: "t" }) as unknown as JSX.Element] }) as unknown as JSX.Element,
      }) as unknown as JSX.Element,
    }),
  ]
  const doc = compileToAdaptive(tree) as IrDocument
  const evt = doc.children[0] as EventBindingNode
  const cmp = (evt.handler as ActionNode).args[1] as ComparatorNode
  const warnings = ((cmp.meta?.debug as { warnings?: unknown })?.warnings ?? []) as unknown[]
  assert(Array.isArray(warnings))
  assertEquals(warnings.length > 0, true)
})

Deno.test("compiler emits warning for IsBeforeTime with missing argument", () => {
  const tree = [
    el("input", { id: "t" }),
    On({
      event: "Change",
      children: Publish({
        topic: "debug",
        payload: IsBeforeTime({ children: [FromElement({ id: "t" }) as unknown as JSX.Element] }) as unknown as JSX.Element,
      }) as unknown as JSX.Element,
    }),
  ]
  const doc = compileToAdaptive(tree) as IrDocument
  const evt = doc.children[0] as EventBindingNode
  const cmp = (evt.handler as ActionNode).args[1] as ComparatorNode
  const warnings = ((cmp.meta?.debug as { warnings?: unknown })?.warnings ?? []) as unknown[]
  assert(Array.isArray(warnings))
  assertEquals(warnings.length > 0, true)
})

Deno.test("compiler emits warning for IsSameTime with missing argument", () => {
  const tree = [
    el("input", { id: "t" }),
    On({
      event: "Change",
      children: Publish({
        topic: "debug",
        payload: IsSameTime({ children: [FromElement({ id: "t" }) as unknown as JSX.Element] }) as unknown as JSX.Element,
      }) as unknown as JSX.Element,
    }),
  ]
  const doc = compileToAdaptive(tree) as IrDocument
  const evt = doc.children[0] as EventBindingNode
  const cmp = (evt.handler as ActionNode).args[1] as ComparatorNode
  const warnings = ((cmp.meta?.debug as { warnings?: unknown })?.warnings ?? []) as unknown[]
  assert(Array.isArray(warnings))
  assertEquals(warnings.length > 0, true)
})

Deno.test("compiler emits warning for IsNotAfterTime with missing argument", () => {
  const tree = [
    el("input", { id: "t" }),
    On({
      event: "Change",
      children: Publish({
        topic: "debug",
        payload: IsNotAfterTime({ children: [FromElement({ id: "t" }) as unknown as JSX.Element] }) as unknown as JSX.Element,
      }) as unknown as JSX.Element,
    }),
  ]
  const doc = compileToAdaptive(tree) as IrDocument
  const evt = doc.children[0] as EventBindingNode
  const cmp = (evt.handler as ActionNode).args[1] as ComparatorNode
  const warnings = ((cmp.meta?.debug as { warnings?: unknown })?.warnings ?? []) as unknown[]
  assert(Array.isArray(warnings))
  assertEquals(warnings.length > 0, true)
})

Deno.test("compiler emits warning for IsNotBeforeTime with missing argument", () => {
  const tree = [
    el("input", { id: "t" }),
    On({
      event: "Change",
      children: Publish({
        topic: "debug",
        payload: IsNotBeforeTime({ children: [FromElement({ id: "t" }) as unknown as JSX.Element] }) as unknown as JSX.Element,
      }) as unknown as JSX.Element,
    }),
  ]
  const doc = compileToAdaptive(tree) as IrDocument
  const evt = doc.children[0] as EventBindingNode
  const cmp = (evt.handler as ActionNode).args[1] as ComparatorNode
  const warnings = ((cmp.meta?.debug as { warnings?: unknown })?.warnings ?? []) as unknown[]
  assert(Array.isArray(warnings))
  assertEquals(warnings.length > 0, true)
})

Deno.test("compiler emits warning for IsAfterDate with missing argument", () => {
  const tree = [
    el("input", { id: "d" }),
    On({
      event: "Change",
      children: Publish({
        topic: "debug",
        payload: IsAfterDate({ children: [FromElement({ id: "d" }) as unknown as JSX.Element] }) as unknown as JSX.Element,
      }) as unknown as JSX.Element,
    }),
  ]
  const doc = compileToAdaptive(tree) as IrDocument
  const evt = doc.children[0] as EventBindingNode
  const cmp = (evt.handler as ActionNode).args[1] as ComparatorNode
  const warnings = ((cmp.meta?.debug as { warnings?: unknown })?.warnings ?? []) as unknown[]
  assert(Array.isArray(warnings))
  assertEquals(warnings.length > 0, true)
})

Deno.test("compiler emits warning for IsBeforeDate with missing argument", () => {
  const tree = [
    el("input", { id: "d" }),
    On({
      event: "Change",
      children: Publish({
        topic: "debug",
        payload: IsBeforeDate({ children: [FromElement({ id: "d" }) as unknown as JSX.Element] }) as unknown as JSX.Element,
      }) as unknown as JSX.Element,
    }),
  ]
  const doc = compileToAdaptive(tree) as IrDocument
  const evt = doc.children[0] as EventBindingNode
  const cmp = (evt.handler as ActionNode).args[1] as ComparatorNode
  const warnings = ((cmp.meta?.debug as { warnings?: unknown })?.warnings ?? []) as unknown[]
  assert(Array.isArray(warnings))
  assertEquals(warnings.length > 0, true)
})

Deno.test("compiler emits warning for IsSameDate with missing argument", () => {
  const tree = [
    el("input", { id: "d" }),
    On({
      event: "Change",
      children: Publish({
        topic: "debug",
        payload: IsSameDate({ children: [FromElement({ id: "d" }) as unknown as JSX.Element] }) as unknown as JSX.Element,
      }) as unknown as JSX.Element,
    }),
  ]
  const doc = compileToAdaptive(tree) as IrDocument
  const evt = doc.children[0] as EventBindingNode
  const cmp = (evt.handler as ActionNode).args[1] as ComparatorNode
  const warnings = ((cmp.meta?.debug as { warnings?: unknown })?.warnings ?? []) as unknown[]
  assert(Array.isArray(warnings))
  assertEquals(warnings.length > 0, true)
})

Deno.test("compiler emits warning for IsNotAfterDate with missing argument", () => {
  const tree = [
    el("input", { id: "d" }),
    On({
      event: "Change",
      children: Publish({
        topic: "debug",
        payload: IsNotAfterDate({ children: [FromElement({ id: "d" }) as unknown as JSX.Element] }) as unknown as JSX.Element,
      }) as unknown as JSX.Element,
    }),
  ]
  const doc = compileToAdaptive(tree) as IrDocument
  const evt = doc.children[0] as EventBindingNode
  const cmp = (evt.handler as ActionNode).args[1] as ComparatorNode
  const warnings = ((cmp.meta?.debug as { warnings?: unknown })?.warnings ?? []) as unknown[]
  assert(Array.isArray(warnings))
  assertEquals(warnings.length > 0, true)
})

Deno.test("compiler emits warning for IsNotBeforeDate with missing argument", () => {
  const tree = [
    el("input", { id: "d" }),
    On({
      event: "Change",
      children: Publish({
        topic: "debug",
        payload: IsNotBeforeDate({ children: [FromElement({ id: "d" }) as unknown as JSX.Element] }) as unknown as JSX.Element,
      }) as unknown as JSX.Element,
    }),
  ]
  const doc = compileToAdaptive(tree) as IrDocument
  const evt = doc.children[0] as EventBindingNode
  const cmp = (evt.handler as ActionNode).args[1] as ComparatorNode
  const warnings = ((cmp.meta?.debug as { warnings?: unknown })?.warnings ?? []) as unknown[]
  assert(Array.isArray(warnings))
  assertEquals(warnings.length > 0, true)
})

Deno.test("compiler emits warning for IsNotSameDate with missing argument", () => {
  const tree = [
    el("input", { id: "d" }),
    On({
      event: "Change",
      children: Publish({
        topic: "debug",
        payload: IsNotSameDate({ children: [FromElement({ id: "d" }) as unknown as JSX.Element] }) as unknown as JSX.Element,
      }) as unknown as JSX.Element,
    }),
  ]
  const doc = compileToAdaptive(tree) as IrDocument
  const evt = doc.children[0] as EventBindingNode
  const cmp = (evt.handler as ActionNode).args[1] as ComparatorNode
  const warnings = ((cmp.meta?.debug as { warnings?: unknown })?.warnings ?? []) as unknown[]
  assert(Array.isArray(warnings))
  assertEquals(warnings.length > 0, true)
})

Deno.test("compiler emits warning for Is.MoreThan with missing argument", () => {
  const tree = [
    el("input", { id: "price" }),
    On({
      event: "Change",
      children: Publish({
        topic: "debug",
        // Intentionally only one child instead of (value, threshold)
        payload: IsMoreThan({ type: "Number", children: [FromElement({ id: "price" }) as unknown as JSX.Element] }) as unknown as JSX.Element,
      }) as unknown as JSX.Element,
    }),
  ]
  const doc = compileToAdaptive(tree) as IrDocument
  const evt = doc.children[0] as EventBindingNode
  const cmp = (evt.handler as ActionNode).args[1] as ComparatorNode
  const warnings = ((cmp.meta?.debug as { warnings?: unknown })?.warnings ?? []) as unknown[]
  assert(Array.isArray(warnings))
  assertEquals(warnings.length > 0, true)
})

Deno.test("compiler emits warning for NotEmpty with wrong arity (0)", () => {
  const tree = [
    el("input", { id: "a" }),
    On({
      event: "Change",
      children: Publish({
        topic: "debug",
        // NotEmpty should receive exactly one argument
        payload: NotEmpty({}) as unknown as JSX.Element,
      }) as unknown as JSX.Element,
    }),
  ]
  const doc = compileToAdaptive(tree) as IrDocument
  const evt = doc.children[0] as EventBindingNode
  const cmp = (evt.handler as ActionNode).args[1] as ComparatorNode
  const warnings = ((cmp.meta?.debug as { warnings?: unknown })?.warnings ?? []) as unknown[]
  assert(Array.isArray(warnings))
  assertEquals(warnings.length > 0, true)
})

Deno.test("compiler emits warning for DoesNotMatch invalid arity", () => {
  const tree = [
    el("input", { id: "val" }),
    On({
      event: "Change",
      children: Publish({
        topic: "debug",
        // Only operand provided
        payload: DoesNotMatch({ children: [FromElement({ id: "val" }) as unknown as JSX.Element] }) as unknown as JSX.Element,
      }) as unknown as JSX.Element,
    }),
  ]
  const doc = compileToAdaptive(tree) as IrDocument
  const evt = doc.children[0] as EventBindingNode
  const cmp = (evt.handler as ActionNode).args[1] as ComparatorNode
  const warnings = ((cmp.meta?.debug as { warnings?: unknown })?.warnings ?? []) as unknown[]
  assert(Array.isArray(warnings))
  assertEquals(warnings.length > 0, true)
})
Deno.test("compiler emits warning for Min with fewer than 1 operand", () => {
  const tree = [
    el("input", { id: "a" }),
    On({
      event: "Change",
      children: Publish({
        topic: "debug",
        payload: Min({ children: [] }) as unknown as JSX.Element,
      }) as unknown as JSX.Element,
    }),
  ]
  const doc = compileToAdaptive(tree) as IrDocument
  const evt = doc.children[0] as EventBindingNode
  const op = (evt.handler as ActionNode).args[1] as OperatorNode
  const warnings = ((op.meta?.debug as { warnings?: unknown })?.warnings ?? []) as unknown[]
  assert(Array.isArray(warnings))
  assertEquals(warnings.length > 0, true)
})

Deno.test("compiler emits warning for Max with fewer than 1 operand", () => {
  const tree = [
    el("input", { id: "a" }),
    On({
      event: "Change",
      children: Publish({
        topic: "debug",
        payload: Max({ children: [] }) as unknown as JSX.Element,
      }) as unknown as JSX.Element,
    }),
  ]
  const doc = compileToAdaptive(tree) as IrDocument
  const evt = doc.children[0] as EventBindingNode
  const op = (evt.handler as ActionNode).args[1] as OperatorNode
  const warnings = ((op.meta?.debug as { warnings?: unknown })?.warnings ?? []) as unknown[]
  assert(Array.isArray(warnings))
  assertEquals(warnings.length > 0, true)
})

Deno.test("compiler emits warning for And with zero operands", () => {
  const tree = [
    el("input", { id: "a" }),
    On({
      event: "Change",
      children: Publish({
        topic: "debug",
        payload: And({ children: [] }) as unknown as JSX.Element,
      }) as unknown as JSX.Element,
    }),
  ]
  const doc = compileToAdaptive(tree) as IrDocument
  const evt = doc.children[0] as EventBindingNode
  const cmp = (evt.handler as ActionNode).args[1] as ComparatorNode
  const warnings = ((cmp.meta?.debug as { warnings?: unknown })?.warnings ?? []) as unknown[]
  assert(Array.isArray(warnings))
  assertEquals(warnings.length > 0, true)
})

Deno.test("compiler emits warning for Or with zero operands", () => {
  const tree = [
    el("input", { id: "a" }),
    On({
      event: "Change",
      children: Publish({
        topic: "debug",
        payload: Or({ children: [] }) as unknown as JSX.Element,
      }) as unknown as JSX.Element,
    }),
  ]
  const doc = compileToAdaptive(tree) as IrDocument
  const evt = doc.children[0] as EventBindingNode
  const cmp = (evt.handler as ActionNode).args[1] as ComparatorNode
  const warnings = ((cmp.meta?.debug as { warnings?: unknown })?.warnings ?? []) as unknown[]
  assert(Array.isArray(warnings))
  assertEquals(warnings.length > 0, true)
})

Deno.test("compiler emits warning for InSet with missing argument", () => {
  const tree = [
    el("input", { id: "a" }),
    On({
      event: "Change",
      children: Publish({
        topic: "debug",
        // Provide only the value, omit the set
        payload: InSet({ children: [FromElement({ id: "a" }) as unknown as JSX.Element] }) as unknown as JSX.Element,
      }) as unknown as JSX.Element,
    }),
  ]
  const doc = compileToAdaptive(tree) as IrDocument
  const evt = doc.children[0] as EventBindingNode
  const cmp = (evt.handler as ActionNode).args[1] as ComparatorNode
  const warnings = ((cmp.meta?.debug as { warnings?: unknown })?.warnings ?? []) as unknown[]
  assert(Array.isArray(warnings))
  assertEquals(warnings.length > 0, true)
})
