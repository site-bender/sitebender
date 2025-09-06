import { assertEquals } from "jsr:@std/assert"
import { describe, it } from "jsr:@std/testing/bdd"
import * as fc from "npm:fast-check@3"

import type {
	ComparatorNode,
	InjectorNode,
	OperatorNode,
} from "../../../../types/ir/index.ts"

import createComposeContext from "../../../../src/context/composeContext.ts"
import registerDefaultExecutors from "../../../../src/operations/defaults/registerDefaults.ts"
import evaluateNode from "../../../../src/runtime/evaluate/index.ts"
import createDeterministicIdGenerator from "../../../../src/utilities/nodeId/index.ts"

// Minimal setup: register defaults before tests
const ctx = createComposeContext({ env: "server" })
registerDefaultExecutors(ctx)

const generateId = createDeterministicIdGenerator("ternary-operator-test")
const nodeId = () => generateId()
const injector = (value: unknown): InjectorNode => ({
	v: "0.1.0",
	kind: "injector",
	id: nodeId(),
	injector: "From.Constant",
	datatype: "String",
	args: { value },
})
const opTernary = (
	condition: InjectorNode | ComparatorNode | OperatorNode,
	ifTrue: InjectorNode | OperatorNode,
	ifFalse: InjectorNode | OperatorNode,
): OperatorNode => ({
	v: "0.1.0",
	kind: "operator",
	id: nodeId(),
	op: "Op.Ternary",
	datatype: "String",
	args: [condition, ifTrue, ifFalse],
})

describe("operators/ternary", () => {
	it("chooses ifTrue when condition is truthy, else ifFalse", async () => {
		const t: InjectorNode = injector(true)
		const f: InjectorNode = injector(false)
		const a: InjectorNode = injector("A")
		const b: InjectorNode = injector("B")

		const chooseA: OperatorNode = opTernary(t, a, b)
		const chooseB: OperatorNode = opTernary(f, a, b)

		const r1 = await evaluateNode(chooseA, ctx)
		const r2 = await evaluateNode(chooseB, ctx)

		assertEquals(r1, "A")
		assertEquals(r2, "B")
	})

	it("property: non-empty string condition is truthy; empty is falsy", () => {
		fc.assert(
			fc.asyncProperty(fc.string(), async (s) => {
				const cond = injector(s)
				const t = injector("T")
				const f = injector("F")
				const node = opTernary(cond, t, f)
				const res = await evaluateNode(node, ctx)
				assertEquals(res, s ? "T" : "F")
			}),
			{ verbose: false },
		)
	})
})
