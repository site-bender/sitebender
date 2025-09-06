import type {
	ComparatorNode,
	InjectorNode,
} from "@sitebender/engine-types/ir/index.ts"

import createComposeContext from "@sitebender/engine/context/composeContext.ts"
import registerDefaultExecutors from "@sitebender/engine/operations/defaults/registerDefaults.ts"
import evaluateNode from "@sitebender/engine/runtime/evaluate/index.ts"
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

describe("comparators/invariants/equality", () => {
	it("property: equality is reflexive for strings", () => {
		fc.assert(
			fc.asyncProperty(fc.string(), async (s) => {
				const a = injector(s)
				const node = cmpEq(a, a)
				const res = await evaluateNode(node, ctx)
				assert(res === true)
			}),
			{ verbose: false },
		)
	})

	it("property: equality is reflexive for numbers (excluding NaN)", () => {
		fc.assert(
			fc.asyncProperty(
				fc.double({ noNaN: true, noDefaultInfinity: true }),
				async (n) => {
					const a = injector(n)
					const node = cmpEq(a, a)
					const res = await evaluateNode(node, ctx)
					assert(res === true)
				},
			),
			{ verbose: false },
		)
	})

	it("property: equality is reflexive for booleans", () => {
		fc.assert(
			fc.asyncProperty(fc.boolean(), async (b) => {
				const a = injector(b)
				const node = cmpEq(a, a)
				const res = await evaluateNode(node, ctx)
				assert(res === true)
			}),
			{ verbose: false },
		)
	})
})
