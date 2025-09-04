import { assertEquals } from "jsr:@std/assert"

import type { InjectorNode } from "../../../types/ir/index.ts"

import createComposeContext from "../../../src/context/composeContext/index.ts"
import registerDefaultExecutors from "../../../src/operations/defaults/registerDefaults/index.ts"
import evaluate from "../../../src/runtime/evaluate/index.ts"

Deno.test("From.Authenticator reads from ctx.localValues by path", async () => {
	const ctx = createComposeContext({
		env: "server",
		localValues: {
			user: { id: 123, roles: ["admin"] },
			claims: { sub: "u-1" },
		},
	})
	registerDefaultExecutors(ctx)

	const nodeUser: InjectorNode = {
		v: "0.1.0",
		kind: "injector",
		id: crypto.randomUUID(),
		injector: "From.Authenticator",
		datatype: "String",
		args: { path: "user.id" },
	}

	const nodeSub: InjectorNode = {
		v: "0.1.0",
		kind: "injector",
		id: crypto.randomUUID(),
		injector: "From.Authenticator",
		datatype: "String",
		args: { path: "claims.sub" },
	}

	const nodeMissing: InjectorNode = {
		v: "0.1.0",
		kind: "injector",
		id: crypto.randomUUID(),
		injector: "From.Authenticator",
		datatype: "String",
		args: { path: "nope.x" },
	}

	const v1 = await evaluate(nodeUser, ctx)
	const v2 = await evaluate(nodeSub, ctx)
	const v3 = await evaluate(nodeMissing, ctx)

	assertEquals(v1, 123)
	assertEquals(v2, "u-1")
	assertEquals(v3, undefined)
})
