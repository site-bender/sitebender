import type { ComparatorNode, InjectorNode } from "@engineTypes/ir/index.ts"

import createComposeContext from "@engineSrc/context/composeContext.ts"
import registerDefaultExecutors from "@engineSrc/operations/defaults/registerDefaults.ts"
import evaluateNode from "@engineSrc/runtime/evaluate/index.ts"
import { assert } from "jsr:@std/assert"
import { describe, it } from "jsr:@std/testing/bdd"
import * as fc from "npm:fast-check@3"

// Minimal setup
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

const cmp = (tag: string, ...args: InjectorNode[]): ComparatorNode => ({
	v: "0.1.0",
	kind: "comparator",
	id: nodeId(),
	cmp: tag,
	args,
})

describe("comparators/invariants/logical", () => {
	it("property: And(b, true) === b", () => {
		fc.assert(
			fc.asyncProperty(fc.boolean(), async (b) => {
				const res = await evaluateNode(
					cmp("Is.And", injector(b), injector(true)),
					ctx,
				)
				assert(res === b)
			}),
			{ verbose: false },
		)
	})

	it("property: Or(b, false) === b", () => {
		fc.assert(
			fc.asyncProperty(fc.boolean(), async (b) => {
				const res = await evaluateNode(
					cmp("Is.Or", injector(b), injector(false)),
					ctx,
				)
				assert(res === b)
			}),
			{ verbose: false },
		)
	})

	it("property: double negation Not(Not(b)) === b", () => {
		fc.assert(
			fc.asyncProperty(fc.boolean(), async (b) => {
				const notB = cmp("Is.Not", injector(b))
				const notNotB = cmp("Is.Not", (notB as unknown) as InjectorNode)
				const res = await evaluateNode(notNotB, ctx)
				assert(res === b)
			}),
			{ verbose: false },
		)
	})

	it("property: De Morgan ¬(a ∧ b) ≡ (¬a ∨ ¬b)", () => {
		fc.assert(
			fc.asyncProperty(fc.boolean(), fc.boolean(), async (a, b) => {
				const andNode = cmp("Is.And", injector(a), injector(b))
				const lhs = cmp("Is.Not", (andNode as unknown) as InjectorNode)
				const rhs = cmp(
					"Is.Or",
					injector(!a),
					injector(!b),
				)
				const [lv, rv] = await Promise.all([
					evaluateNode(lhs, ctx),
					evaluateNode(rhs, ctx),
				])
				assert(lv === rv)
			}),
			{ verbose: false },
		)
	})

	it("property: De Morgan ¬(a ∨ b) ≡ (¬a ∧ ¬b)", () => {
		fc.assert(
			fc.asyncProperty(fc.boolean(), fc.boolean(), async (a, b) => {
				const orNode = cmp("Is.Or", injector(a), injector(b))
				const lhs = cmp("Is.Not", (orNode as unknown) as InjectorNode)
				const rhs = cmp(
					"Is.And",
					injector(!a),
					injector(!b),
				)
				const [lv, rv] = await Promise.all([
					evaluateNode(lhs, ctx),
					evaluateNode(rhs, ctx),
				])
				assert(lv === rv)
			}),
			{ verbose: false },
		)
	})
})
