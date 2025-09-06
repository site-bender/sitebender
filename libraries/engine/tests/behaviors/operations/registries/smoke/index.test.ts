import { assert, assertEquals } from "jsr:@std/assert"
import { describe, it } from "jsr:@std/testing/bdd"

import type {
	ComparatorNode,
	InjectorNode,
	OperatorNode,
} from "../../../../../types/ir/index.ts"

import createComposeContext from "../../../../../src/context/composeContext/index.ts"
import registerDefaultExecutors from "../../../../../src/operations/defaults/registerDefaults/index.ts"
import actions from "../../../../../src/operations/registries/actions.ts"
import comparators from "../../../../../src/operations/registries/comparators.ts"
import events from "../../../../../src/operations/registries/events.ts"
import injectors from "../../../../../src/operations/registries/injectors.ts"
import operators from "../../../../../src/operations/registries/operators.ts"
import evaluate from "../../../../../src/runtime/evaluate/index.ts"
import createDeterministicIdGenerator from "../../../../../src/utilities/nodeId/index.ts"

const generateId = createDeterministicIdGenerator("registries-smoke-test")
const nodeId = () => generateId()
const constant = (value: unknown): InjectorNode => ({
	v: "0.1.0",
	kind: "injector",
	id: nodeId(),
	injector: "From.Constant",
	datatype: "String",
	args: { value },
})
const add = (args: Array<InjectorNode | OperatorNode>): OperatorNode => ({
	v: "0.1.0",
	kind: "operator",
	id: nodeId(),
	op: "Op.Add",
	datatype: "Float",
	args,
})
const eq = (
	a: InjectorNode | OperatorNode,
	b: InjectorNode | OperatorNode,
): ComparatorNode => ({
	v: "0.1.0",
	kind: "comparator",
	id: nodeId(),
	cmp: "Is.EqualTo",
	args: [a, b],
})

describe("registries - smoke", () => {
	const ctx = createComposeContext({ env: "server" })
	registerDefaultExecutors(ctx)

	it("injector resolves and returns value", async () => {
		const inj = injectors.get("From.Constant")!
		const val = await inj(constant("x"), ctx)
		assertEquals(val, "x")
	})

	it("operator resolves and adds", async () => {
		const op = operators.get("Op.Add")!
		const result = await op(
			add([constant(2), constant(3)]),
			(n: OperatorNode["args"][number]) => evaluate(n, ctx),
			ctx,
		)
		assertEquals(result, 5)
	})

	it("comparator resolves and compares equality", async () => {
		const cmp = comparators.get("Is.EqualTo")!
		const result = await cmp(
			eq(constant("y"), constant("y")),
			(n: ComparatorNode["args"][number]) => evaluate(n, ctx),
			ctx,
		)
		assertEquals(result, true)
	})

	it("event binder registers and fetches", () => {
		events.register("On.Test", () => {})
		const ev = events.get("On.Test")
		assert(!!ev)
	})

	it("actions resolve (SetValue present)", () => {
		const action = actions.get("Act.SetValue")
		assert(!!action)
	})
})
