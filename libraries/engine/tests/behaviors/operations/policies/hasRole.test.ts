import { assert } from "jsr:@std/assert"
import { describe, it } from "jsr:@std/testing/bdd"

import hasRole from "../../../../src/operations/policies/hasRole/index.ts"

describe("policies/HasRole", () => {
	it("returns right(true) when user has required role", async () => {
		const op = hasRole({ role: "admin" })
		const res = await op(undefined, { user: { roles: ["admin", "user"] } })
		assert("right" in res && res.right === true)
	})

	it("returns left(errors) when user lacks required role", async () => {
		const op = hasRole({ role: "editor" })
		const res = await op(undefined, { user: { roles: ["viewer"] } })
		assert("left" in res && Array.isArray(res.left) && res.left.length > 0)
	})

	it("supports multiple roles in config (any match)", async () => {
		const op = hasRole({ roles: ["editor", "moderator"] })
		const res = await op(undefined, { user: { roles: ["moderator"] } })
		assert("right" in res && res.right === true)
	})
})
