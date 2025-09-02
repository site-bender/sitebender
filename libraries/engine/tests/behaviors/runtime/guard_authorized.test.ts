import { assertEquals } from "jsr:@std/assert"

import { createComposeContext } from "../../../src/context/composeContext/index.ts"
import {
	guardAuthorized,
	guardRoute,
} from "../../../src/runtime/guard/index.ts"

Deno.test("guardAuthorized allows when policy passes", async () => {
	const ctx = createComposeContext({
		env: "server",
		localValues: { user: { id: 1, roles: ["admin"] } },
	})
	const res = await guardAuthorized(ctx, { tag: "IsAuthenticated" })
	assertEquals(res, { allow: true })
})

Deno.test("guardRoute returns redirect when policy fails and redirect provided", async () => {
	const ctx = createComposeContext({ env: "server", localValues: {} })
	const res = await guardRoute(ctx, "IsAuthenticated", undefined, {
		redirect: "/login",
	})
	assertEquals(res, { redirect: "/login" })
})
