import { assert, assertEquals } from "jsr:@std/assert"
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

// Minimal setup: register defaults before tests
const ctx = createComposeContext({ env: "server" })
registerDefaultExecutors(ctx)

const nodeId = () => crypto.randomUUID()
const injector = (value: unknown): InjectorNode => ({
	v: "0.1.0",
	kind: "injector",
	id: nodeId(),
	injector: "From.Constant",
	datatype: "String",
	args: { value },
})
const opAdd = (args: Array<InjectorNode | OperatorNode>): OperatorNode => ({
	v: "0.1.0",
	kind: "operator",
	id: nodeId(),
	op: "Op.Add",
	datatype: "Float",
	args,
})
const cmpEq = (
	a: InjectorNode | OperatorNode,
	b: InjectorNode | OperatorNode,
): ComparatorNode => ({
	v: "0.1.0",
	kind: "comparator",
	id: nodeId(),
	cmp: "Is.EqualTo",
	args: [a, b],
})

describe("evaluateNode - basics", () => {
	it("adds numbers from constants", async () => {
		const two: InjectorNode = injector(2)
		const three: InjectorNode = injector(3)
		const sum: OperatorNode = opAdd([two, three])

		const result = await evaluateNode(sum, ctx)
		assertEquals(result, 5)
	})

	it("compares equality", async () => {
		const a: InjectorNode = injector("x")
		const b: InjectorNode = injector("x")
		const cmp: ComparatorNode = cmpEq(a, b)

		const result = await evaluateNode(cmp, ctx)
		assertEquals(result, true)
	})

	it("property: addition is commutative for numbers (within tolerance)", () => {
		fc.assert(
			fc.asyncProperty(
				fc.double({
					noDefaultInfinity: true,
					noNaN: true,
					min: -1e9,
					max: 1e9,
				}),
				fc.double({
					noDefaultInfinity: true,
					noNaN: true,
					min: -1e9,
					max: 1e9,
				}),
				async (x, y) => {
					const n = (v: number): InjectorNode => injector(v)
					const sum1: OperatorNode = opAdd([n(x), n(y)])
					const sum2: OperatorNode = opAdd([n(y), n(x)])
					const r1 = await evaluateNode(sum1, ctx) as number
					const r2 = await evaluateNode(sum2, ctx) as number
					assert(Math.abs(r1 - r2) < 1e-9)
				},
			),
			{ verbose: false },
		)
	})
})
