import { assertEquals } from "jsr:@std/assert"

import createComposeContext from "../../../src/context/composeContext/index.ts"
import guardAuthorized from "../../../src/runtime/guard/index.ts"

Deno.test("guardAuthorized allows when policy passes", async () => {
	const ctx = createComposeContext({
		env: "server",
		localValues: { user: { id: 1, roles: ["admin"] } },
	})
	const res = await guardAuthorized(ctx, { tag: "IsAuthenticated" })
	assertEquals(res, { allow: true })
})

Deno.test("guardAuthorized returns redirect when policy fails and redirect provided", async () => {
	const ctx = createComposeContext({ env: "server", localValues: {} })
	const res = await guardAuthorized(ctx, { tag: "IsAuthenticated" }, { redirect: "/login" })
	assertEquals(res, { redirect: "/login" })
})
