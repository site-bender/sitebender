import type {
	ActionNode,
	ComparatorNode,
	EventBindingNode,
	IrDocument,
	OperatorNode,
} from "@engineTypes/ir/index.ts"

import {
	assert,
	assertEquals,
} from "https://deno.land/std@0.224.0/assert/mod.ts"

import { compileToEngine } from "../../src/compile.ts"
import Publish from "../../src/transform/actions/Publish/index.tsx"
import SetValue from "../../src/transform/actions/SetValue/index.tsx"
import IsEqualTo from "../../src/transform/comparators/IsEqualTo/index.tsx"
import Matches from "../../src/transform/comparators/Matches/index.tsx"
import On from "../../src/transform/control/On/index.tsx"
import FromElement from "../../src/transform/injectors/FromElement/index.tsx"
import Add from "../../src/transform/operators/Add/index.tsx"
import Divide from "../../src/transform/operators/Divide/index.tsx"
import Subtract from "../../src/transform/operators/Subtract/index.tsx"

// Minimal VNode helper the compiler recognizes as an element
const el = (
	tag: string,
	props: Record<string, unknown> = {},
	children?: unknown,
) => ({
	type: tag,
	props: children === undefined ? props : { ...props, children },
})

Deno.test("compiler emits warning for Add with fewer than 2 addends", () => {
	const tree = [
		el("input", { id: "a" }),
		el("output", { id: "out" }),
		On({
			event: "Input",
			target: "out",
			children: SetValue({
				selector: "#out",
				value: Add({
					children: [FromElement({ id: "a" }) as unknown as JSX.Element],
				}) as unknown as JSX.Element,
			}) as unknown as JSX.Element,
		}),
	]
	const doc = compileToEngine(tree) as IrDocument
	const evt = doc.children[0] as EventBindingNode
	const op = (evt.handler as ActionNode).args[1] as OperatorNode
	const warnings =
		((op.meta?.debug as { warnings?: unknown })?.warnings ?? []) as unknown[]
	assert(Array.isArray(warnings))
	assertEquals(warnings.length > 0, true)
})

Deno.test("compiler emits warning for Is.EqualTo with missing argument", () => {
	const tree = [
		el("input", { id: "status" }),
		On({
			event: "Change",
			children: Publish({
				topic: "debug",
				// Intentionally pass only one child
				payload: IsEqualTo({
					type: "String",
					children: [
						FromElement({ id: "status" }) as unknown as JSX.Element,
					],
				}) as unknown as JSX.Element,
			}) as unknown as JSX.Element,
		}),
	]
	const doc = compileToEngine(tree) as IrDocument
	const evt = doc.children[0] as EventBindingNode
	const cmp = (evt.handler as ActionNode).args[1] as ComparatorNode
	const warnings =
		((cmp.meta?.debug as { warnings?: unknown })?.warnings ?? []) as unknown[]
	assert(Array.isArray(warnings))
	assertEquals(warnings.length > 0, true)
})

Deno.test("compiler emits warning for Matches invalid arity", () => {
	const tree = [
		el("input", { id: "val" }),
		On({
			event: "Change",
			children: Publish({
				topic: "debug",
				// Only 1 child instead of (operand, pattern[, flags])
				payload: Matches({
					children: [FromElement({ id: "val" }) as unknown as JSX.Element],
				}) as unknown as JSX.Element,
			}) as unknown as JSX.Element,
		}),
	]
	const doc = compileToEngine(tree) as IrDocument
	const evt = doc.children[0] as EventBindingNode
	const cmp = (evt.handler as ActionNode).args[1] as ComparatorNode
	const warnings =
		((cmp.meta?.debug as { warnings?: unknown })?.warnings ?? []) as unknown[]
	assert(Array.isArray(warnings))
	assertEquals(warnings.length > 0, true)
})

Deno.test("compiler emits warning for Subtract arity not equal to 2", () => {
	const tree = [
		el("input", { id: "a" }),
		On({
			event: "Change",
			children: Publish({
				topic: "debug",
				payload: Subtract({
					children: [FromElement({ id: "a" }) as unknown as JSX.Element],
				}) as unknown as JSX.Element,
			}) as unknown as JSX.Element,
		}),
	]
	const doc = compileToEngine(tree) as IrDocument
	const evt = doc.children[0] as EventBindingNode
	const op = (evt.handler as ActionNode).args[1] as OperatorNode
	const warnings =
		((op.meta?.debug as { warnings?: unknown })?.warnings ?? []) as unknown[]
	assert(Array.isArray(warnings))
	assertEquals(warnings.length > 0, true)
})

Deno.test("compiler emits warning for Divide arity not equal to 2", () => {
	const tree = [
		el("input", { id: "a" }),
		On({
			event: "Change",
			children: Publish({
				topic: "debug",
				payload: Divide({
					children: [FromElement({ id: "a" }) as unknown as JSX.Element],
				}) as unknown as JSX.Element,
			}) as unknown as JSX.Element,
		}),
	]
	const doc = compileToEngine(tree) as IrDocument
	const evt = doc.children[0] as EventBindingNode
	const op = (evt.handler as ActionNode).args[1] as OperatorNode
	const warnings =
		((op.meta?.debug as { warnings?: unknown })?.warnings ?? []) as unknown[]
	assert(Array.isArray(warnings))
	assertEquals(warnings.length > 0, true)
})
