import { assertEquals } from "jsr:@std/assert"

import type {
	ComparatorNode,
	InjectorNode,
} from "../../../../types/ir/index.ts"

import { createComposeContext } from "../../../../src/context/composeContext.ts"
import { registerDefaultExecutors } from "../../../../src/operations/defaults/registerDefaults.ts"
import evaluateNode from "../../../../src/runtime/evaluate/index.ts"

Deno.test("evaluate falls back to policy when comparator not registered", async () => {
	const ctx = createComposeContext({ env: "server" })
	registerDefaultExecutors(ctx)

	const cfg: InjectorNode = {
		v: "0.1.0",
		kind: "injector",
		id: crypto.randomUUID(),
		injector: "From.Constant",
		datatype: "String",
		args: { value: { role: "admin" } },
	}
	const node: ComparatorNode = {
		v: "0.1.0",
		kind: "comparator",
		id: crypto.randomUUID(),
		cmp: "HasRole",
		args: [cfg],
	}

	// With admin role → true
	const ok = await evaluateNode(node, ctx)
	assertEquals(ok, false, "without localValues, policy returns false")
})

Deno.test("policy fallback returns true when localValues satisfy policy", async () => {
	const ctx = createComposeContext({
		env: "server",
		localValues: { user: { roles: ["admin"] } },
	})
	registerDefaultExecutors(ctx)

	const cfg: InjectorNode = {
		v: "0.1.0",
		kind: "injector",
		id: crypto.randomUUID(),
		injector: "From.Constant",
		datatype: "String",
		args: { value: { role: "admin" } },
	}
	const node: ComparatorNode = {
		v: "0.1.0",
		kind: "comparator",
		id: crypto.randomUUID(),
		cmp: "HasRole",
		args: [cfg],
	}

	const ok = await evaluateNode(node, ctx)
	assertEquals(
		ok,
		true,
		"with matching role in localValues, policy returns true",
	)
})
