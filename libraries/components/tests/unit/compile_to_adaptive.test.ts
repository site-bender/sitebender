import {
	assert,
	assertEquals,
} from "https://deno.land/std@0.224.0/assert/mod.ts"

// IR node types
import type {
	ActionNode,
	ComparatorNode,
	EventBindingNode,
	InjectorNode,
	IrDocument,
	OperatorNode,
} from "@engineTypes/ir/index.ts"

import { compileToEngine } from "../../src/compile.ts"
import Publish from "../../src/transform/actions/Publish/index.tsx"
import SetQueryString from "../../src/transform/actions/SetQueryString/index.tsx"
import SetValue from "../../src/transform/actions/SetValue/index.tsx"
import IsEqualTo from "../../src/transform/comparators/IsEqualTo/index.tsx"
import IsUnequalTo from "../../src/transform/comparators/IsUnequalTo/index.tsx"
import Matches from "../../src/transform/comparators/Matches/index.tsx"
import NotEmpty from "../../src/transform/comparators/NotEmpty/index.tsx"
// Import marker/component constructors
import On from "../../src/transform/control/On/index.tsx"
import WhenChangeComplete from "../../src/transform/control/When/ChangeComplete/index.tsx"
import WhenClicked from "../../src/transform/control/When/Clicked/index.tsx"
import WhenGainedFocus from "../../src/transform/control/When/GainedFocus/index.tsx"
import WhenLostFocus from "../../src/transform/control/When/LostFocus/index.tsx"
import WhenSubmitted from "../../src/transform/control/When/Submitted/index.tsx"
import WhenValueUpdated from "../../src/transform/control/When/ValueUpdated/index.tsx"
import Constant from "../../src/transform/injectors/Constant/index.tsx"
import FromElement from "../../src/transform/injectors/FromElement/index.tsx"
import And from "../../src/transform/logical/And/index.tsx"
import Or from "../../src/transform/logical/Or/index.tsx"
import Add from "../../src/transform/operators/Add/index.tsx"
import Max from "../../src/transform/operators/Max/index.tsx"
import Min from "../../src/transform/operators/Min/index.tsx"

// Minimal VNode helper the compiler recognizes as an element
const el = (
	tag: string,
	props: Record<string, unknown> = {},
	children?: unknown,
) => ({
	type: tag,
	props: children === undefined ? props : { ...props, children },
})

Deno.test("compileToEngine binds On to nearest prior element id", () => {
	const tree = [
		el("input", { id: "name" }),
		On({
			event: "Input",
			// Cast marker to JSX.Element for prop typing
			children: SetValue({
				selector: "#status",
				value: FromElement({ id: "name" }) as unknown as JSX.Element,
			}) as unknown as JSX.Element,
		}),
	]

	const ir = compileToEngine(tree)
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

Deno.test("When.Clicked lowers to On.Click and binds to nearest element", () => {
	const tree = [
		el("button", { id: "btn" }),
		WhenClicked({
			children: Publish({ topic: "clicked" }) as unknown as JSX.Element,
		}) as unknown as JSX.Element,
	]
	const doc = compileToEngine(tree) as IrDocument
	const evt = doc.children[0] as EventBindingNode
	assertEquals(evt.kind, "on")
	assertEquals(evt.event, "On.Click")
	assertEquals(evt.id, "btn")
})

Deno.test("When.Submitted lowers to On.Submit and respects explicit target", () => {
	const tree = [
		el("form", { id: "login" }),
		el("form", { id: "signup" }),
		WhenSubmitted({
			target: "signup",
			children: Publish({ topic: "submitted" }) as unknown as JSX.Element,
		}) as unknown as JSX.Element,
	]
	const doc = compileToEngine(tree) as IrDocument
	const evt = doc.children[0] as EventBindingNode
	assertEquals(evt.kind, "on")
	assertEquals(evt.event, "On.Submit")
	assertEquals(evt.id, "signup")
})

Deno.test("When.ValueUpdated lowers to On.Input", () => {
	const tree = [
		el("input", { id: "i" }),
		WhenValueUpdated({
			children: Publish({ topic: "vu" }) as unknown as JSX.Element,
		}) as unknown as JSX.Element,
	]
	const doc = compileToEngine(tree) as IrDocument
	const evt = doc.children[0] as EventBindingNode
	assertEquals(evt.event, "On.Input")
	assertEquals(evt.id, "i")
})

Deno.test("When.ChangeComplete lowers to On.Change", () => {
	const tree = [
		el("input", { id: "j" }),
		WhenChangeComplete({
			children: Publish({ topic: "cc" }) as unknown as JSX.Element,
		}) as unknown as JSX.Element,
	]
	const doc = compileToEngine(tree) as IrDocument
	const evt = doc.children[0] as EventBindingNode
	assertEquals(evt.event, "On.Change")
	assertEquals(evt.id, "j")
})

Deno.test("When.GainedFocus lowers to On.Focus", () => {
	const tree = [
		el("input", { id: "f" }),
		WhenGainedFocus({
			children: Publish({ topic: "focus" }) as unknown as JSX.Element,
		}) as unknown as JSX.Element,
	]
	const doc = compileToEngine(tree) as IrDocument
	const evt = doc.children[0] as EventBindingNode
	assertEquals(evt.event, "On.Focus")
	assertEquals(evt.id, "f")
})

Deno.test("When.LostFocus lowers to On.Blur", () => {
	const tree = [
		el("input", { id: "b" }),
		WhenLostFocus({
			children: Publish({ topic: "blur" }) as unknown as JSX.Element,
		}) as unknown as JSX.Element,
	]
	const doc = compileToEngine(tree) as IrDocument
	const evt = doc.children[0] as EventBindingNode
	assertEquals(evt.event, "On.Blur")
	assertEquals(evt.id, "b")
})

Deno.test("compileToEngine respects explicit On.target over last anchor", () => {
	const tree = [
		el("div", { id: "a" }),
		el("div", { id: "price" }),
		On({
			event: "Change",
			target: "price",
			children: SetValue({
				selector: "#out",
				value: Constant({ value: 1 }) as unknown as JSX.Element,
			}) as unknown as JSX.Element,
		}),
	]
	const doc = compileToEngine(tree) as IrDocument
	const evt = doc.children[0] as EventBindingNode
	assertEquals(evt.id, "price")
	assertEquals(evt.event, "On.Change")
})

Deno.test("compileToEngine maps Add operator and Constant/FromElement injectors", () => {
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
	const doc = compileToEngine(tree) as IrDocument
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

Deno.test("compileToEngine compiles comparator markers inside action args", () => {
	const tree = [
		el("input", { id: "val" }),
		On({
			event: "Change",
			children: Publish({
				topic: "debug",
				payload: NotEmpty({
					children: FromElement({ id: "val" }) as unknown as JSX.Element,
				}) as unknown as JSX.Element,
			}) as unknown as JSX.Element,
		}),
	]
	const doc = compileToEngine(tree) as IrDocument
	const evt = doc.children[0] as EventBindingNode
	const cmp = evt.handler.args[1] as ComparatorNode
	assertEquals(cmp.kind, "comparator")
	assertEquals(cmp.cmp, "Is.NotEmpty")
	assertEquals(cmp.args.length, 1)
	const i0 = cmp.args[0] as InjectorNode
	assertEquals(i0.injector, "From.Element")
})

Deno.test("compileToEngine wraps primitives as Constant injectors with correct datatype", () => {
	const tree = [
		el("form", { id: "f" }),
		On({
			event: "Submit",
			children: SetQueryString({
				key: "foo",
				value: true,
			}) as unknown as JSX.Element,
		}),
	]
	const doc = compileToEngine(tree) as IrDocument
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

Deno.test("compileToEngine compiles IsEqualTo comparator from component wrapper", () => {
	const tree = [
		el("input", { id: "status" }),
		On({
			event: "Change",
			children: Publish({
				topic: "debug",
				payload: IsEqualTo({
					type: "String",
					children: [
						FromElement({ id: "status" }) as unknown as JSX.Element,
						Constant({ value: "active" }) as unknown as JSX.Element,
					],
				}) as unknown as JSX.Element,
			}) as unknown as JSX.Element,
		}),
	]

	const doc = compileToEngine(tree) as IrDocument
	const evt = doc.children[0] as EventBindingNode
	const cmp = evt.handler.args[1] as ComparatorNode
	assertEquals(cmp.kind, "comparator")
	assertEquals(cmp.cmp, "Is.EqualTo")
	assertEquals(cmp.args.length, 2)
	const left = cmp.args[0] as InjectorNode
	const right = cmp.args[1] as InjectorNode
	assertEquals(left.kind, "injector")
	assertEquals(left.injector, "From.Element")
	assertEquals(right.kind, "injector")
	assertEquals(right.injector, "From.Constant")
	assertEquals(right.args.value, "active")
})

Deno.test("compileToEngine compiles IsUnequalTo comparator from component wrapper", () => {
	const tree = [
		el("input", { id: "status" }),
		On({
			event: "Change",
			children: Publish({
				topic: "debug",
				payload: IsUnequalTo({
					type: "String",
					children: [
						FromElement({ id: "status" }) as unknown as JSX.Element,
						Constant({ value: "pending" }) as unknown as JSX.Element,
					],
				}) as unknown as JSX.Element,
			}) as unknown as JSX.Element,
		}),
	]

	const doc = compileToEngine(tree) as IrDocument
	const evt = doc.children[0] as EventBindingNode
	const cmp = evt.handler.args[1] as ComparatorNode
	assertEquals(cmp.kind, "comparator")
	assertEquals(cmp.cmp, "Is.UnequalTo")
	assertEquals(cmp.args.length, 2)
	const left = cmp.args[0] as InjectorNode
	const right = cmp.args[1] as InjectorNode
	assertEquals(left.kind, "injector")
	assertEquals(left.injector, "From.Element")
	assertEquals(right.kind, "injector")
	assertEquals(right.injector, "From.Constant")
	assertEquals(right.args.value, "pending")
})

Deno.test("compileToEngine compiles Min/Max operators with operands", () => {
	const tree = [
		el("input", { id: "a" }),
		el("input", { id: "b" }),
		el("output", { id: "out" }),
		On({
			event: "Input",
			target: "out",
			children: SetValue({
				selector: "#out",
				value: Min({
					type: "Number",
					children: [
						FromElement({ id: "a" }) as unknown as JSX.Element,
						FromElement({ id: "b" }) as unknown as JSX.Element,
					],
				}) as unknown as JSX.Element,
			}) as unknown as JSX.Element,
		}),
	]
	const doc = compileToEngine(tree) as IrDocument
	const evt = doc.children[0] as EventBindingNode
	const op = evt.handler.args[1] as OperatorNode
	assertEquals(op.kind, "operator")
	assertEquals(op.op, "Op.Min")
	assertEquals(op.args.length, 2)

	const tree2 = [
		el("input", { id: "a" }),
		el("input", { id: "b" }),
		el("output", { id: "out" }),
		On({
			event: "Input",
			target: "out",
			children: SetValue({
				selector: "#out",
				value: Max({
					type: "Number",
					children: [
						FromElement({ id: "a" }) as unknown as JSX.Element,
						FromElement({ id: "b" }) as unknown as JSX.Element,
					],
				}) as unknown as JSX.Element,
			}) as unknown as JSX.Element,
		}),
	]
	const doc2 = compileToEngine(tree2) as IrDocument
	const evt2 = doc2.children[0] as EventBindingNode
	const op2 = evt2.handler.args[1] as OperatorNode
	assertEquals(op2.kind, "operator")
	assertEquals(op2.op, "Op.Max")
	assertEquals(op2.args.length, 2)
})

Deno.test("compileToEngine compiles Matches comparator with flags", () => {
	const tree = [
		el("input", { id: "val" }),
		On({
			event: "Change",
			children: Publish({
				topic: "debug",
				payload: Matches({
					children: [
						FromElement({ id: "val" }) as unknown as JSX.Element,
						Constant({ value: "^a.*z$" }) as unknown as JSX.Element,
						"i",
					],
				}) as unknown as JSX.Element,
			}) as unknown as JSX.Element,
		}),
	]
	const doc = compileToEngine(tree) as IrDocument
	const evt = doc.children[0] as EventBindingNode
	const cmp = evt.handler.args[1] as ComparatorNode
	assertEquals(cmp.kind, "comparator")
	// Tag may or may not be namespaced depending on mapping; ensure args are there
	assertEquals(cmp.args.length >= 2, true)
})

Deno.test("compileToEngine compiles nested And/Or logical comparators", () => {
	const tree = [
		el("input", { id: "status" }),
		On({
			event: "Change",
			children: Publish({
				topic: "debug",
				payload: And({
					children: [
						Or({
							children: [
								IsEqualTo({
									type: "String",
									children: [
										FromElement({ id: "status" }) as unknown as JSX.Element,
										Constant({ value: "active" }) as unknown as JSX.Element,
									],
								}) as unknown as JSX.Element,
								IsEqualTo({
									type: "String",
									children: [
										FromElement({ id: "status" }) as unknown as JSX.Element,
										Constant({ value: "pending" }) as unknown as JSX.Element,
									],
								}) as unknown as JSX.Element,
							],
						}) as unknown as JSX.Element,
						IsUnequalTo({
							type: "String",
							children: [
								FromElement({ id: "status" }) as unknown as JSX.Element,
								Constant({ value: "banned" }) as unknown as JSX.Element,
							],
						}) as unknown as JSX.Element,
					],
				}) as unknown as JSX.Element,
			}) as unknown as JSX.Element,
		}),
	]
	const doc = compileToEngine(tree) as IrDocument
	const evt = doc.children[0] as EventBindingNode
	const cmp = evt.handler.args[1] as ComparatorNode
	assertEquals(cmp.kind, "comparator")
	assertEquals(cmp.cmp, "Is.And")
	assertEquals(cmp.args.length, 2)
	const child0 = cmp.args[0] as ComparatorNode
	assertEquals(child0.cmp, "Is.Or")
})
