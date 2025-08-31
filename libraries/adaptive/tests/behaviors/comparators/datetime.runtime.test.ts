import { assertEquals } from "jsr:@std/assert"

import type { ComparatorNode, InjectorNode } from "../../../types/ir/index.ts"

import { createComposeContext } from "../../../src/context/composeContext.ts"
import { registerDefaultExecutors } from "../../../src/operations/defaults/registerDefaults.ts"
import evaluateNode from "../../../src/runtime/evaluate/index.ts"

const nodeId = () => crypto.randomUUID()
const constInjector = (value: unknown): InjectorNode => ({
	v: "0.1.0",
	kind: "injector",
	id: nodeId(),
	injector: "From.Constant",
	datatype: "String",
	args: { value },
})

const cmp = (cmp: string, a: unknown, b: unknown): ComparatorNode => ({
	v: "0.1.0",
	kind: "comparator",
	id: nodeId(),
	cmp,
	args: [constInjector(a), constInjector(b)],
})

Deno.test("DateTime comparators runtime IsSame/Not*", async () => {
	const ctx = createComposeContext({ env: "server" })
	registerDefaultExecutors(ctx)

	assertEquals(
		await evaluateNode(
			cmp("IsSameDateTime", "2024-05-01T12:00", "2024-05-01T12:00"),
			ctx,
		),
		true,
	)
	assertEquals(
		await evaluateNode(
			cmp("IsNotAfterDateTime", "2024-05-01T12:00", "2024-05-01T12:00"),
			ctx,
		),
		true,
	)
	assertEquals(
		await evaluateNode(
			cmp("IsNotBeforeDateTime", "2024-05-01T12:00", "2024-05-01T12:00"),
			ctx,
		),
		true,
	)
})
