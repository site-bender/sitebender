import { assertEquals } from "jsr:@std/assert"
import { describe, it } from "jsr:@std/testing/bdd"

import type {
	ComparatorNode,
	ConditionalNode,
	ElementNode,
	InjectorNode,
	ValidatorNode,
} from "../../../../types/ir/index.ts"

import createComposeContext from "../../../../src/context/composeContext.ts"
import registerDefaultExecutors from "../../../../src/operations/defaults/registerDefaults.ts"
import evaluateNode from "../../../../src/runtime/evaluate/index.ts"
import createDeterministicIdGenerator from "../../../../src/utilities/nodeId/index.ts"

// Minimal setup: register defaults before tests
const ctx = createComposeContext({ env: "server" })
registerDefaultExecutors(ctx)

const nodeId = createDeterministicIdGenerator("extended-test")

const injector = (value: unknown): InjectorNode => ({
	v: "0.1.0",
	kind: "injector",
	id: nodeId(),
	injector: "From.Constant",
	datatype: "String",
	args: { value },
})

const cmpEq = (
	a: InjectorNode,
	b: InjectorNode,
): ComparatorNode => ({
	v: "0.1.0",
	kind: "comparator",
	id: nodeId(),
	cmp: "Is.EqualTo",
	args: [a, b],
})

describe("evaluateNode - extended IR support", () => {
	it("evaluates conditional nodes - true branch", async () => {
		const trueCondition: ComparatorNode = cmpEq(
			injector("a"),
			injector("a"),
		)
		const conditional: ConditionalNode = {
			v: "0.1.0",
			kind: "conditional",
			id: nodeId(),
			condition: trueCondition,
			ifTrue: [injector("true-result")],
			ifFalse: [injector("false-result")],
		}

		const result = await evaluateNode(conditional, ctx)
		assertEquals(result, "true-result")
	})

	it("evaluates conditional nodes - false branch", async () => {
		const falseCondition: ComparatorNode = cmpEq(
			injector("a"),
			injector("b"),
		)
		const conditional: ConditionalNode = {
			v: "0.1.0",
			kind: "conditional",
			id: nodeId(),
			condition: falseCondition,
			ifTrue: [injector("true-result")],
			ifFalse: [injector("false-result")],
		}

		const result = await evaluateNode(conditional, ctx)
		assertEquals(result, "false-result")
	})

	it("evaluates validator nodes", async () => {
		const rule: ComparatorNode = cmpEq(injector("test"), injector("test"))
		const validator: ValidatorNode = {
			v: "0.1.0",
			kind: "validator",
			id: nodeId(),
			rule,
			scope: "self",
		}

		const result = await evaluateNode(validator, ctx)
		assertEquals(result, true)
	})

	it("evaluates element nodes", async () => {
		const element: ElementNode = {
			v: "0.1.0",
			kind: "element",
			id: nodeId(),
			tag: "div",
			attrs: { class: "test", id: "element-1" },
			children: [injector("child content")],
		}

		const result = await evaluateNode(element, ctx) as {
			tag: string
			attrs: Record<string, string | number | boolean>
			children: unknown[]
		}

		assertEquals(result.tag, "div")
		assertEquals(result.attrs, { class: "test", id: "element-1" })
		assertEquals(result.children, ["child content"])
	})

	it("evaluates nested element nodes", async () => {
		const childElement: ElementNode = {
			v: "0.1.0",
			kind: "element",
			id: nodeId(),
			tag: "span",
			attrs: {},
			children: [injector("nested content")],
		}

		const parentElement: ElementNode = {
			v: "0.1.0",
			kind: "element",
			id: nodeId(),
			tag: "div",
			attrs: { class: "parent" },
			children: [childElement],
		}

		const result = await evaluateNode(parentElement, ctx) as {
			tag: string
			attrs: Record<string, string | number | boolean>
			children: unknown[]
		}

		assertEquals(result.tag, "div")
		assertEquals(result.attrs, { class: "parent" })
		assertEquals(result.children.length, 1)

		const nestedResult = result.children[0] as {
			tag: string
			attrs: Record<string, string | number | boolean>
			children: unknown[]
		}
		assertEquals(nestedResult.tag, "span")
		assertEquals(nestedResult.children, ["nested content"])
	})
})
